import PageGutter from './PageGutter'

export default function ContainerSection({
  children,
  className = '',
  id,
}: {
  children: React.ReactNode
  className?: string
  id?: string
}) {
  return (
    <section id={id} className={`py-20 lg:py-28 ${className}`}>
      <PageGutter>{children}</PageGutter>
    </section>
  )
}
