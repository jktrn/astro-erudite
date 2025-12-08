import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface GlowingBorderButtonProps extends React.ComponentProps<typeof Button> { }

export const GlowingBorderButton = React.forwardRef<HTMLButtonElement, GlowingBorderButtonProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <Button
                ref={ref}
                className={cn(
                    "group relative inline-flex items-center justify-center rounded-xl border-2 border-transparent bg-transparent font-medium text-foreground transition-colors disabled:pointer-events-none disabled:opacity-50",
                    "animate-rainbow bg-[length:200%] [background-clip:padding-box,border-box,border-box] [background-origin:border-box]",
                    "bg-[linear-gradient(var(--background),var(--background)),linear-gradient(90deg,#ff4242,#a1ff42,#42a1ff,#42d0ff,#a142ff)]",
                    "before:absolute before:bottom-[-20%] before:left-0 before:-z-10 before:h-1/5 before:w-full before:animate-rainbow before:bg-[linear-gradient(90deg,#ff4242,#a1ff42,#42a1ff,#42d0ff,#a142ff)] before:[filter:blur(calc(0.625*1rem))] before:bg-[length:200%]",
                    "hover:brightness-110",
                    className
                )}
                {...props}
            >
                {children}
            </Button>
        )
    }
)
GlowingBorderButton.displayName = "GlowingBorderButton"
