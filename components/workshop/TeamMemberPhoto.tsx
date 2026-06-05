import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import { hasSanityImage } from '@/lib/sanity/hasSanityImage'
import { getTeamMemberPhotoSrc } from '@/lib/data/crew'
import type { FounderRecord, TeamMemberRecord } from '@/lib/types/team'

type TeamMemberPhotoProps = {
  member: TeamMemberRecord | FounderRecord
  alt: string
  sizes: string
  className?: string
  priority?: boolean
  /** founder = Crew Page portrait; crew = / The Crew grid; default = operator photo only */
  variant?: 'founder' | 'crew' | 'default'
}

const TeamMemberPhoto = ({
  member,
  alt,
  sizes,
  className = 'object-contain object-top bg-white',
  priority = false,
  variant = 'default',
}: TeamMemberPhotoProps) => {
  const founderPhoto =
    variant === 'founder' && 'founderPhoto' in member ? member.founderPhoto : undefined

  if (variant === 'founder' && hasSanityImage(founderPhoto) && founderPhoto) {
    return (
      <Image
        src={urlFor(founderPhoto).width(900).url()}
        alt={alt}
        fill
        sizes={sizes}
        className={className}
        priority={priority}
      />
    )
  }

  if (variant === 'crew' && hasSanityImage(member.crewPhoto) && member.crewPhoto) {
    return (
      <Image
        src={urlFor(member.crewPhoto).width(800).url()}
        alt={alt}
        fill
        sizes={sizes}
        className={className}
        priority={priority}
      />
    )
  }

  const localPhoto =
    variant === 'founder' || variant === 'crew' ? getTeamMemberPhotoSrc(member) : null

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

  if (hasSanityImage(member.photo) && member.photo) {
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

export default TeamMemberPhoto
