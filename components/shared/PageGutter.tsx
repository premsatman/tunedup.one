export default function PageGutter({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`page-gutter w-full ${className}`}>
      {children}
    </div>
  )
}
