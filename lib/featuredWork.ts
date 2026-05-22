export type FeaturedWorkItem = {
  _id: string
  title: string
  slug: string
  missionCodename: string
  tagline?: string
  imageSrc: string
}

export const FEATURED_WORK: FeaturedWorkItem[] = [
  {
    _id: 'featured-work-blaze-bite',
    title: 'Blaze Bite',
    slug: 'blaze-bite',
    missionCodename: 'BB-2401',
    tagline: 'Restaurant branding — interior identity system',
    imageSrc: '/props/2.jpg',
  },
  {
    _id: 'featured-work-seaside-cart',
    title: 'Seaside Cart',
    slug: 'seaside-cart',
    missionCodename: 'SC-2402',
    tagline: 'Mobile kiosk — brand identity and menu design',
    imageSrc: '/props/1.jpg',
  },
]
