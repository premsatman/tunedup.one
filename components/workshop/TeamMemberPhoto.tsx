import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import { getTeamMemberPhotoSrc } from '@/lib/data/crew'
import type { TeamMemberRecord } from '@/lib/types/team'

type TeamMemberPhotoProps = {
  member: TeamMemberRecord
  alt: string
  sizes: string
  className?: string
  priority?: boolean
}

export default function TeamMemberPhoto({
  member,
  alt,
  sizes,
  className = 'object-contain object-top bg-white',
  priority = false,
}: TeamMemberPhotoProps) {
  const localPhoto = getTeamMemberPhotoSrc(member)

  if (localPhoto) {
    return (
      <Image
        src={localPhoto}
        alt={alt}
        fill
        sizes={sizes}
        className={className}
        priority={priority}
      />
    )
  }

  if (member.photo) {
    return (
      <Image
        src={urlFor(member.photo).width(800).url()}
        alt={alt}
        fill
        sizes={sizes}
        className={className || 'object-cover'}
        priority={priority}
      />
    )
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[var(--ink-soft)] font-display text-6xl font-bold text-[var(--canvas)]">
      {member.name?.[0]}
    </div>
  )
}
