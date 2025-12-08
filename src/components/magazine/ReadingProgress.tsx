import { useEffect, useState } from 'react'

export function ReadingProgress() {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const updateProgress = () => {
            const scrollTop = window.scrollY
            const docHeight = document.documentElement.scrollHeight - window.innerHeight

            if (docHeight > 0) {
                const scrollPercent = (scrollTop / docHeight) * 100
                setProgress(Math.min(100, Math.max(0, scrollPercent)))
            }
        }

        // Initial calculation
        updateProgress()

        // Add scroll listener with passive option for performance
        window.addEventListener('scroll', updateProgress, { passive: true })

        return () => {
            window.removeEventListener('scroll', updateProgress)
        }
    }, [])

    return (
        <div className="absolute bottom-0 left-0 h-[2px] w-full bg-transparent">
            <div
                className="h-full bg-primary transition-all duration-150 ease-out"
                style={{ width: `${progress}%` }}
            />
        </div>
    )
}
