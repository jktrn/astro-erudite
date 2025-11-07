import { useState, useEffect, type ReactNode } from 'react'
import { Lock } from 'lucide-react'
import { decryptContent } from '@/lib/encryption'

interface PasswordProtectionProps {
  postId: string
  children?: ReactNode
  encryptedContent?: string
  protectionMessage?: string
}

export default function PasswordProtection({
  postId,
  children,
  encryptedContent,
  protectionMessage,
}: PasswordProtectionProps) {
  const [inputPassword, setInputPassword] = useState('')
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [error, setError] = useState(false)
  const [decryptedHtml, setDecryptedHtml] = useState<string>('')
  const storageKey = `post-unlock-${postId}`
  const passwordKey = `post-password-${postId}`

  useEffect(() => {
    // Check if the post was previously unlocked in this session
    const wasUnlocked = sessionStorage.getItem(storageKey) === 'true'
    const storedPassword = sessionStorage.getItem(passwordKey)

    if (wasUnlocked && storedPassword && encryptedContent) {
      // Try to decrypt with stored password
      const decrypted = decryptContent(encryptedContent, storedPassword)
      if (decrypted) {
        setDecryptedHtml(decrypted)
        setIsUnlocked(true)
      } else {
        // Clear invalid session data
        sessionStorage.removeItem(storageKey)
        sessionStorage.removeItem(passwordKey)
      }
    }
  }, [postId, storageKey, passwordKey, encryptedContent])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Try to decrypt with entered password
    if (encryptedContent) {
      const decrypted = decryptContent(encryptedContent, inputPassword)
      if (decrypted) {
        setIsUnlocked(true)
        setError(false)
        setDecryptedHtml(decrypted)
        // Store the password in session for page reloads
        sessionStorage.setItem(storageKey, 'true')
        sessionStorage.setItem(passwordKey, inputPassword)
      } else {
        setError(true)
        setInputPassword('')
      }
    }
  }

  if (isUnlocked) {
    // Render the decrypted HTML
    if (encryptedContent && decryptedHtml) {
      return <div dangerouslySetInnerHTML={{ __html: decryptedHtml }} />
    }
    // Fallback for children (shouldn't happen with encryption)
    return <>{children}</>
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-md rounded-lg border border-border bg-card p-8 shadow-lg">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-primary/10 p-4">
            <Lock className="h-8 w-8 text-primary" />
          </div>
        </div>

        <h2 className="mb-2 text-center text-2xl font-bold">Protected Content</h2>
        <p className="mb-6 text-center text-muted-foreground">
          {protectionMessage || 'This post is password protected. Please enter the password to view the content.'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={inputPassword}
              onChange={(e) => {
                setInputPassword(e.target.value)
                setError(false)
              }}
              placeholder="Enter password"
              className={`w-full rounded-md border px-4 py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${
                error
                  ? 'border-red-500 bg-red-50 dark:bg-red-950/20'
                  : 'border-border bg-background'
              }`}
              autoFocus
            />
            {error && (
              <p className="mt-2 text-sm text-red-500">
                Incorrect password. Please try again.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-primary px-4 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Unlock Post
          </button>
        </form>
      </div>
    </div>
  )
}
