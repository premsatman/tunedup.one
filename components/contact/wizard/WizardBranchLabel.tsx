type WizardBranchLabelProps = {
  children: string
}

export default function WizardBranchLabel({ children }: WizardBranchLabelProps) {
  return (
    <p className="-mt-2 mb-4 block w-full text-center font-mono text-xs uppercase tracking-widest text-[var(--ink-soft)] md:-mt-3">
      {children}
    </p>
  )
}
