import { ScrollSmoother } from 'gsap/ScrollSmoother'

export const scrollToTopInstant = () => {
  const smoother = ScrollSmoother.get()
  if (smoother) {
    smoother.scrollTo(0, false)
    return
  }
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
}

export const scrollToTop = () => {
  const smoother = ScrollSmoother.get()
  if (smoother) {
    smoother.scrollTo(0, true)
    return
  }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
