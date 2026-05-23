import { ScrollSmoother } from 'gsap/ScrollSmoother'

/** Keeps the contact wizard anchored in view when the branch changes. */
export const scrollToContactWizard = (element: HTMLElement | null) => {
  if (!element) return

  requestAnimationFrame(() => {
    const smoother = ScrollSmoother.get()
    if (smoother) {
      smoother.scrollTo(element, false, 'top 96px')
    } else {
      const top = element.getBoundingClientRect().top + window.scrollY - 96
      window.scrollTo({ top, behavior: 'auto' })
    }
  })
}
