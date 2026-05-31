import Image from 'next/image'
import Link from 'next/link'
import { brandAlt, brandAssets, brandLogoDimensions } from '@/lib/brand'

type BrandLogoProps = {
  variant?: 'full' | 'square'
  theme?: 'dark' | 'light'
  href?: string
  onClick?: () => void
  className?: string
  priority?: boolean
}

const BrandLogo = ({
  variant = 'full',
  theme = 'dark',
  href = '/',
  onClick,
  className = '',
  priority = false,
}: BrandLogoProps) => {
  const src =
    variant === 'square'
      ? theme === 'dark'
        ? brandAssets.squareBlack
        : brandAssets.squareWhite
      : theme === 'dark'
        ? brandAssets.fullBlack
        : brandAssets.fullWhite

  const { width, height } = brandLogoDimensions[variant]

  const imageClassName =
    variant === 'full'
      ? `h-8 w-auto sm:h-9 ${className}`.trim()
      : `h-8 w-8 sm:h-9 sm:w-9 ${className}`.trim()

  const image = (
    <Image
      src={src}
      alt={brandAlt}
      width={width}
      height={height}
      priority={priority}
      className={imageClassName}
    />
  )

  if (!href) {
    return image
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      className="inline-flex shrink-0"
      aria-label={`${brandAlt} home`}
    >
      {image}
    </Link>
  )
}

export default BrandLogo
