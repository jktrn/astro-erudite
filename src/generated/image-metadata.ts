type ImageMetadataEntry = {
  width: number
  height: number
  contentType?: string
}

export const imageMetadata: Record<string, ImageMetadataEntry> = {

}

export type ImageMetadataUrl = keyof typeof imageMetadata
