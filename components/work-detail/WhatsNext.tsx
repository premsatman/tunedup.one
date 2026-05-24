import ContainerSection from '@/components/shared/ContainerSection'
import { Radio } from 'lucide-react'

export default function WhatsNext({ text }: { text?: string }) {
  if (!text) return null

  return (
    <ContainerSection>
      <div className="bg-[var(--accent-soft)] border border-[var(--accent)] rounded-2xl p-6 lg:p-8 max-w-3xl">
        <div className="flex items-center gap-2 mb-3">
          <Radio size={16} className="text-[var(--accent)] animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
            / Signal still active
          </span>
        </div>
        <p className="font-display text-xl md:text-2xl leading-snug">{text}</p>
      </div>
    </ContainerSection>
  )
}
