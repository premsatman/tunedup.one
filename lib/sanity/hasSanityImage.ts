import type { SanityImage } from '@/lib/types/mission'

export const hasSanityImage = (image?: SanityImage | null): boolean => {
  if (!image || typeof image !== 'object') return false

  const asset = 'asset' in image ? image.asset : null
  if (!asset || typeof asset !== 'object') return false

  if ('_ref' in asset && asset._ref) return true
  if ('_id' in asset && asset._id) return true
  if ('url' in asset && typeof asset.url === 'string' && asset.url.length > 0) return true

  return false
}
