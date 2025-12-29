import * as React from 'react'
import { Slot as SlotPrimitive } from 'radix-ui'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
        muted:
          'border-transparent bg-muted text-foreground [a&]:hover:bg-muted/90',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/70',
        outline:
          'text-muted-foreground [a&]:hover:bg-muted [a&]:hover:text-foreground',
        'destructive-outline':
          'bg-destructive/10 [a&]:hover:bg-destructive/5 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 text-destructive border-none focus-visible:outline-none',
        'default-outline':
          'bg-primary/10 [a&]:hover:bg-primary/20 focus-visible:ring-ring text-primary border-none focus-visible:outline-none',
        'secondary-outline':
          'bg-rose-900/10 [a&]:hover:bg-rose-900/20 focus-visible:ring-ring text-rose-900 border-none focus-visible:outline-none dark:bg-rose-300/10 dark:[a&]:hover:bg-rose-300/20 dark:text-rose-300',
        'orange-outline':
          'bg-orange-500/10 [a&]:hover:bg-orange-500/20 text-orange-600 dark:text-orange-400 border-none focus-visible:outline-none',
        'yellow-outline':
          'bg-yellow-500/10 [a&]:hover:bg-yellow-500/20 text-yellow-700 dark:text-yellow-500 border-none focus-visible:outline-none',
        'green-outline':
          'bg-green-500/10 [a&]:hover:bg-green-500/20 text-green-700 dark:text-green-500 border-none focus-visible:outline-none',
        'blue-outline':
          'bg-blue-500/10 [a&]:hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 border-none focus-visible:outline-none',
        'violet-outline':
          'bg-violet-500/10 [a&]:hover:bg-violet-500/20 text-violet-600 dark:text-violet-400 border-none focus-visible:outline-none',
        'teal-outline':
          'bg-teal-500/10 [a&]:hover:bg-teal-500/20 text-teal-600 dark:text-teal-400 border-none focus-visible:outline-none',
        'indigo-outline':
          'bg-indigo-500/10 [a&]:hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border-none focus-visible:outline-none'
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? SlotPrimitive.Root : 'span'

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
