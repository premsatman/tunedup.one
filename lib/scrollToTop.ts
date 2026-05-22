import { ScrollSmoother } from 'gsap/ScrollSmoother'

export const scrollToTop = () => {
  const smoother = ScrollSmoother.get()
  if (smoother) {
    smoother.scrollTo(0, true)
    return
  }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
