import { imageMetadata } from '@/generated/image-metadata'

const fallbackImageSize = {
  width: 1600,
  height: 1000,
}

export function getImageSize(src: string, width?: number, height?: number) {
  if (width && height) {
    return { width, height }
  }

  const metadata = imageMetadata[src as keyof typeof imageMetadata]
  if (metadata?.width && metadata.height) {
    return {
      width: metadata.width,
      height: metadata.height,
    }
  }

  return fallbackImageSize
}
