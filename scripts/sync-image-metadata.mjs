import { existsSync } from 'node:fs'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { DatabaseSync } from 'node:sqlite'
import sharp from 'sharp'

const contentRoot = path.resolve(
  process.env.IMAGE_METADATA_CONTENT_ROOT || 'src/content/blog',
)
const databasePath = path.resolve(
  process.env.IMAGE_METADATA_DATABASE_PATH || 'data/image-metadata.sqlite',
)
const generatedPath = path.resolve(
  process.env.IMAGE_METADATA_GENERATED_PATH ||
    'src/generated/image-metadata.ts',
)
const fixturePath = process.env.IMAGE_METADATA_FIXTURE_PATH
  ? path.resolve(process.env.IMAGE_METADATA_FIXTURE_PATH)
  : null

const defaultHeaders = {
  'user-agent': 'astro-erudite-image-metadata/1.0',
  accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
}
const rangeEnd = Number(process.env.IMAGE_METADATA_RANGE_END || 65535)
const requestTimeoutMs = Number(process.env.IMAGE_METADATA_TIMEOUT_MS || 10000)
const concurrency = Number(process.env.IMAGE_METADATA_CONCURRENCY || 6)
const allowFailures = process.env.IMAGE_METADATA_ALLOW_FAILURES === '1'
const refresh = process.argv.includes('--refresh')

async function listMdxFiles(dir) {
  const entries = await import('node:fs/promises').then((fs) =>
    fs.readdir(dir, { withFileTypes: true }),
  )
  const files = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await listMdxFiles(fullPath)))
      continue
    }
    if (entry.isFile() && entry.name.endsWith('.mdx')) {
      files.push(fullPath)
    }
  }

  return files
}

function stripCodeBlocks(markdown) {
  const lines = markdown.split('\n')
  let inFence = false

  return lines
    .map((line) => {
      if (/^\s*```/.test(line)) {
        inFence = !inFence
        return ''
      }
      if (inFence) {
        return ''
      }
      return line
    })
    .join('\n')
}

function collectImageComponentBlocks(markdown) {
  const blocks = []
  const lines = markdown.split('\n')
  let currentBlock = null

  for (const line of lines) {
    if (/^<(?:Figure|ImageGrid)\b/.test(line)) {
      currentBlock = [line]
      if (/^\s*\/>/.test(line)) {
        blocks.push(currentBlock.join('\n'))
        currentBlock = null
      }
      continue
    }

    if (!currentBlock) continue

    currentBlock.push(line)
    if (/^\s*\/>/.test(line)) {
      blocks.push(currentBlock.join('\n'))
      currentBlock = null
    }
  }

  return blocks
}

function collectImageUrls(markdown) {
  const urls = new Set()
  const searchableMarkdown = stripCodeBlocks(markdown)
  const markdownImagePattern =
    /!\[[^\]]*]\((https?:\/\/[^)\s]+)(?:\s+['"][^'"]*['"])?\)/g
  const componentSrcPattern = /\bsrc\s*[:=]\s*(['"])(https?:\/\/[^'"]+)\1/g

  let markdownImage
  while (
    (markdownImage = markdownImagePattern.exec(searchableMarkdown)) !== null
  ) {
    urls.add(markdownImage[1])
  }

  for (const componentBlock of collectImageComponentBlocks(
    searchableMarkdown,
  )) {
    let componentSrc
    while ((componentSrc = componentSrcPattern.exec(componentBlock)) !== null) {
      urls.add(componentSrc[2])
    }
  }

  return urls
}

async function collectAllImageUrls() {
  const files = await listMdxFiles(contentRoot)
  const urls = new Set()

  for (const file of files) {
    const markdown = await readFile(file, 'utf8')
    for (const url of collectImageUrls(markdown)) {
      urls.add(url)
    }
  }

  return [...urls].sort()
}

async function openDatabase() {
  await mkdir(path.dirname(databasePath), { recursive: true })
  const db = new DatabaseSync(databasePath)
  db.exec(`
    CREATE TABLE IF NOT EXISTS image_metadata (
      url TEXT PRIMARY KEY,
      width INTEGER,
      height INTEGER,
      content_type TEXT,
      etag TEXT,
      last_modified TEXT,
      checked_at TEXT NOT NULL,
      status TEXT NOT NULL,
      error TEXT
    ) STRICT;
  `)
  return db
}

async function readHead(url) {
  try {
    const response = await fetch(url, {
      method: 'HEAD',
      headers: defaultHeaders,
      redirect: 'follow',
      signal: AbortSignal.timeout(requestTimeoutMs),
    })

    if (!response.ok) return {}

    return {
      contentType: response.headers.get('content-type') || undefined,
      etag: response.headers.get('etag') || undefined,
      lastModified: response.headers.get('last-modified') || undefined,
    }
  } catch {
    return {}
  }
}

async function fetchBuffer(url, { range = true } = {}) {
  const headers = {
    ...defaultHeaders,
    ...(range ? { range: `bytes=0-${rangeEnd}` } : {}),
  }
  const response = await fetch(url, {
    headers,
    redirect: 'follow',
    signal: AbortSignal.timeout(requestTimeoutMs),
  })

  if (!response.ok && response.status !== 206) {
    throw new Error(`HTTP ${response.status}`)
  }

  return {
    buffer: Buffer.from(await response.arrayBuffer()),
    contentType: response.headers.get('content-type') || undefined,
    etag: response.headers.get('etag') || undefined,
    lastModified: response.headers.get('last-modified') || undefined,
    partial: response.status === 206,
  }
}

async function mapConcurrent(items, limit, mapper) {
  const results = new Array(items.length)
  let nextIndex = 0

  async function worker() {
    while (nextIndex < items.length) {
      const index = nextIndex
      nextIndex += 1
      results[index] = await mapper(items[index], index)
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, () => worker()),
  )

  return results
}

function parseSvgDimensions(buffer) {
  const text = buffer.toString('utf8', 0, Math.min(buffer.length, 65536))
  const svg = text.match(/<svg\b[^>]*>/i)?.[0]
  if (!svg) return null

  const readNumber = (name) => {
    const match = svg.match(new RegExp(`${name}=["']([0-9.]+)(?:px)?["']`, 'i'))
    return match ? Number(match[1]) : null
  }
  const width = readNumber('width')
  const height = readNumber('height')
  if (width && height) return { width, height }

  const viewBox = svg.match(
    /viewBox=["']\s*[-0-9.]+\s+[-0-9.]+\s+([0-9.]+)\s+([0-9.]+)\s*["']/i,
  )
  if (!viewBox) return null

  return {
    width: Number(viewBox[1]),
    height: Number(viewBox[2]),
  }
}

async function readDimensionsFromBuffer(buffer, contentType) {
  if (contentType?.includes('svg')) {
    const svgDimensions = parseSvgDimensions(buffer)
    if (svgDimensions) return svgDimensions
  }

  const metadata = await sharp(buffer).metadata()
  if (!metadata.width || !metadata.height) {
    throw new Error('missing image dimensions')
  }

  return {
    width: metadata.width,
    height: metadata.height,
  }
}

async function readFixtureMetadata() {
  if (!fixturePath) return new Map()

  const payload = JSON.parse(await readFile(fixturePath, 'utf8'))
  return new Map(Object.entries(payload))
}

async function readRemoteImageMetadata(url, fixtures) {
  const fixture = fixtures.get(url)
  if (fixture) {
    return {
      width: fixture.width,
      height: fixture.height,
      contentType: fixture.contentType,
      etag: fixture.etag,
      lastModified: fixture.lastModified,
    }
  }

  const head = await readHead(url)
  const ranged = await fetchBuffer(url, { range: true })
  const contentType = ranged.contentType || head.contentType

  try {
    const dimensions = await readDimensionsFromBuffer(
      ranged.buffer,
      contentType,
    )
    return {
      ...dimensions,
      contentType,
      etag: ranged.etag || head.etag,
      lastModified: ranged.lastModified || head.lastModified,
    }
  } catch (error) {
    if (!ranged.partial) throw error
  }

  const full = await fetchBuffer(url, { range: false })
  const dimensions = await readDimensionsFromBuffer(
    full.buffer,
    full.contentType || contentType,
  )

  return {
    ...dimensions,
    contentType: full.contentType || contentType,
    etag: full.etag || head.etag,
    lastModified: full.lastModified || head.lastModified,
  }
}

function readCachedMetadata(db, url) {
  const existing = db
    .prepare(
      'SELECT width, height FROM image_metadata WHERE url = ? AND status = ?',
    )
    .get(url, 'ok')

  if (existing?.width && existing?.height && !refresh) {
    return { url, status: 'cached' }
  }

  return null
}

async function fetchImageMetadata(url, fixtures) {
  try {
    const metadata = await readRemoteImageMetadata(url, fixtures)
    return { url, status: 'updated', metadata }
  } catch (error) {
    return { url, status: 'error', error }
  }
}

function saveResult(db, result) {
  if (result.status === 'cached') return

  if (result.status === 'updated') {
    const { url, metadata } = result
    db.prepare(
      `INSERT INTO image_metadata (
        url, width, height, content_type, etag, last_modified, checked_at, status, error
      ) VALUES (?, ?, ?, ?, ?, ?, ?, 'ok', NULL)
      ON CONFLICT(url) DO UPDATE SET
        width = excluded.width,
        height = excluded.height,
        content_type = excluded.content_type,
        etag = excluded.etag,
        last_modified = excluded.last_modified,
        checked_at = excluded.checked_at,
        status = 'ok',
        error = NULL`,
    ).run(
      url,
      metadata.width,
      metadata.height,
      metadata.contentType || null,
      metadata.etag || null,
      metadata.lastModified || null,
      new Date().toISOString(),
    )
    return
  }

  if (result.status === 'error') {
    db.prepare(
      `INSERT INTO image_metadata (
        url, width, height, content_type, etag, last_modified, checked_at, status, error
      ) VALUES (?, NULL, NULL, NULL, NULL, NULL, ?, 'error', ?)
      ON CONFLICT(url) DO UPDATE SET
        checked_at = excluded.checked_at,
        status = 'error',
        error = excluded.error`,
    ).run(result.url, new Date().toISOString(), result.error.message)
  }
}

async function writeManifest(db, urls) {
  const rows = db
    .prepare(
      `SELECT url, width, height, content_type
       FROM image_metadata
       WHERE status = 'ok' AND width IS NOT NULL AND height IS NOT NULL
       ORDER BY url`,
    )
    .all()
    .filter((row) => urls.includes(row.url))

  const entries = rows
    .map((row) => {
      const body = [
        `width: ${row.width}`,
        `height: ${row.height}`,
        row.content_type
          ? `contentType: ${JSON.stringify(row.content_type)}`
          : null,
      ]
        .filter(Boolean)
        .join(', ')
      return `  ${JSON.stringify(row.url)}: { ${body} },`
    })
    .join('\n')

  const source = `type ImageMetadataEntry = {\n  width: number\n  height: number\n  contentType?: string\n}\n\nexport const imageMetadata: Record<string, ImageMetadataEntry> = {\n${entries}\n}\n\nexport type ImageMetadataUrl = keyof typeof imageMetadata\n`
  await mkdir(path.dirname(generatedPath), { recursive: true })
  await writeFile(generatedPath, source)
}

async function main() {
  if (!existsSync(contentRoot)) {
    throw new Error(`Missing content directory: ${contentRoot}`)
  }

  const urls = await collectAllImageUrls()
  const db = await openDatabase()
  const fixtures = await readFixtureMetadata()
  const cachedResults = new Map()
  const urlsToFetch = []

  for (const url of urls) {
    const cached = readCachedMetadata(db, url)
    if (cached) {
      cachedResults.set(url, cached)
      continue
    }
    urlsToFetch.push(url)
  }

  const fetchedResults = await mapConcurrent(urlsToFetch, concurrency, (url) =>
    fetchImageMetadata(url, fixtures),
  )
  const results = urls.map(
    (url) =>
      cachedResults.get(url) ||
      fetchedResults.find((result) => result.url === url),
  )

  for (const result of results) {
    saveResult(db, result)
  }

  await writeManifest(db, urls)

  const summary = results.reduce(
    (acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1
      return acc
    },
    { total: results.length },
  )
  console.log(`Image metadata synced: ${JSON.stringify(summary)}`)

  const failures = results.filter((item) => item.status === 'error')
  for (const failure of failures) {
    console.warn(
      `Image metadata failed: ${failure.url} - ${failure.error.message}`,
    )
  }
  if (failures.length > 0 && !allowFailures) {
    process.exitCode = 1
  }

  db.close()
}

await main()
