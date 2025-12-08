import { GlowingBorderButton } from '@/components/ui/glowing-border-button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Mail } from 'lucide-react'

export function Newsletter() {
    return (
        <Card className="rounded-xl border bg-card text-card-foreground shadow-none">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-primary" />
                    Newsletter
                </CardTitle>
                <CardDescription>
                    Get the latest posts and updates delivered directly to your inbox.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
                    <Input
                        type="email"
                        placeholder="you@example.com"
                        className="w-full"
                    />
                    <GlowingBorderButton className="w-full font-bold">
                        Subscribe
                    </GlowingBorderButton>
                </form>
            </CardContent>
        </Card>
    )
}
