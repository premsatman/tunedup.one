export default function PageGutter({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`w-full px-8 sm:px-12 lg:px-20 xl:px-28 2xl:px-36 ${className}`}>
      {children}
    </div>
  )
}
