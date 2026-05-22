import Image from 'next/image'

type PropImageProps = {
  src: string
  alt: string
  className?: string
  imageClassName?: string
  priority?: boolean
}

export default function PropImage({
  src,
  alt,
  className = '',
  imageClassName = '',
  priority = false,
}: PropImageProps) {
  return (
    <div className={`relative h-full w-full ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        unoptimized
        sizes="(max-width: 768px) 80vw, 50vw"
        className={`object-contain ${imageClassName}`.trim()}
      />
    </div>
  )
}
