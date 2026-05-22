export type ViewportBand = 'mobile' | 'tablet' | 'medium' | 'large' | 'xl' | '2xl'

export type ViewportBandConfig = {
  label: string
  range: string
  bg: string
  text: string
}

export type CtaRobotLayout = {
  width: string
  right: string
  display: string
}

export const CTA_ROBOT_BY_BAND: Record<ViewportBand, CtaRobotLayout> = {
  mobile: {
    width: '85vw',
    right: '−45%',
    display: '85vw · −45%',
  },
  tablet: {
    width: '90vw',
    right: '−50%',
    display: '90vw · −50%',
  },
  medium: {
    width: '100vw',
    right: '−50%',
    display: '100vw · −50%',
  },
  large: {
    width: '80vw',
    right: '−35%',
    display: '80vw · −35%',
  },
  xl: {
    width: '75vw',
    right: '−35%',
    display: '75vw · −35%',
  },
  '2xl': {
    width: '63vw',
    right: '−27%',
    display: '63vw · −27% (scales down on ultra-wide)',
  },
}

export const getCtaRobotLayout = (band: ViewportBand): CtaRobotLayout =>
  CTA_ROBOT_BY_BAND[band]

export const VIEWPORT_BANDS: Record<ViewportBand, ViewportBandConfig> = {
  mobile: {
    label: 'Mobile',
    range: '< 640px',
    bg: 'bg-red-500',
    text: 'text-white',
  },
  tablet: {
    label: 'Tablet',
    range: '640 – 767px',
    bg: 'bg-orange-500',
    text: 'text-white',
  },
  medium: {
    label: 'Medium',
    range: '768 – 1023px',
    bg: 'bg-amber-400',
    text: 'text-[var(--ink)]',
  },
  large: {
    label: 'Large',
    range: '1024 – 1279px',
    bg: 'bg-lime-500',
    text: 'text-[var(--ink)]',
  },
  xl: {
    label: 'XL',
    range: '1280 – 1535px',
    bg: 'bg-sky-500',
    text: 'text-white',
  },
  '2xl': {
    label: '2XL',
    range: '≥ 1536px',
    bg: 'bg-violet-500',
    text: 'text-white',
  },
}

export const getViewportBand = (width: number): ViewportBand => {
  if (width < 640) return 'mobile'
  if (width < 768) return 'tablet'
  if (width < 1024) return 'medium'
  if (width < 1280) return 'large'
  if (width < 1536) return 'xl'
  return '2xl'
}
