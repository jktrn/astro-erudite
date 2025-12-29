import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date) {
  return Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}

export function calculateWordCountFromHtml(
  html: string | null | undefined,
): number {
  if (!html) return 0
  const textOnly = html.replace(/<[^>]+>/g, '')
  return textOnly.split(/\s+/).filter(Boolean).length
}

export function readingTime(wordCount: number): string {
  const readingTimeMinutes = Math.max(1, Math.round(wordCount / 200))

  if (readingTimeMinutes >= 60) {
    const hours = Math.floor(readingTimeMinutes / 60)
    const minutes = readingTimeMinutes % 60

    if (minutes === 0) {
      return `${hours} hr read`
    }
    return `${hours} hr ${minutes} min read`
  }
  
  return `${readingTimeMinutes} min read`
}

export function getHeadingMargin(depth: number): string {
  const margins: Record<number, string> = {
    3: 'ml-4',
    4: 'ml-8',
    5: 'ml-12',
    6: 'ml-16',
  }
  return margins[depth] || ''
}

// Badge variant type
type BadgeVariant =
  | 'default'
  | 'muted'
  | 'destructive'
  | 'outline'
  | 'destructive-outline'
  | 'default-outline'
  | 'secondary-outline'
  | 'orange-outline'
  | 'yellow-outline'
  | 'green-outline'
  | 'blue-outline'
  | 'violet-outline'
  | 'teal-outline'
  | 'indigo-outline'

// Rating variant mapping
export const ratingVariants: Record<string, BadgeVariant> = {
  'Explicit': 'destructive-outline',
  'Mature': 'orange-outline',
  'Teen And Up Audiences': 'yellow-outline',
  'General Audiences': 'green-outline',
}

// Rating icon mapping
export const ratingIcons: Record<string, string> = {
  'Explicit': 'lucide:circle-alert',
  'Mature': 'lucide:triangle-alert',
  'Teen And Up Audiences': 'lucide:info',
  'General Audiences': 'lucide:circle-check',
}

// Category variant and icon mapping
export const categoryConfig: Record<
  string,
  { variant: BadgeVariant; icon: string }
> = {
  'F/F': { variant: 'destructive-outline', icon: 'lucide:venus' },
  'F/M': { variant: 'violet-outline', icon: 'lucide:venus-and-mars' },
  'M/M': { variant: 'blue-outline', icon: 'lucide:mars' },
  'Multi': { variant: 'indigo-outline', icon: 'lucide:users' },
  'Other': { variant: 'teal-outline', icon: 'lucide:non-binary' },
  'Gen': { variant: 'green-outline', icon: 'lucide:circle-dot' },
}

// Status variant and icon mapping
export const statusConfig: Record<
  string,
  { variant: BadgeVariant; icon: string }
> = {
  'Completed': { variant: 'green-outline', icon: 'lucide:check' },
  'In Progress': { variant: 'yellow-outline', icon: 'lucide:plus' },
  'Abandoned': { variant: 'destructive-outline', icon: 'lucide:x' },
}
