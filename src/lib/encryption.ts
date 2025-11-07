import CryptoJS from 'crypto-js'

/**
 * Encrypts content using AES encryption
 * @param content - The content to encrypt
 * @param password - The password to use for encryption
 * @returns The encrypted content as a string
 */
export function encryptContent(content: string, password: string): string {
  return CryptoJS.AES.encrypt(content, password).toString()
}

/**
 * Decrypts content using AES decryption
 * @param encryptedContent - The encrypted content
 * @param password - The password to use for decryption
 * @returns The decrypted content as a string, or null if decryption fails
 */
export function decryptContent(encryptedContent: string, password: string): string | null {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedContent, password)
    const decrypted = bytes.toString(CryptoJS.enc.Utf8)

    // If decryption fails, it returns an empty string
    if (!decrypted) {
      return null
    }

    return decrypted
  } catch (error) {
    console.error('Decryption error:', error)
    return null
  }
}
