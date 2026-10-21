import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

type Props = {
  eyebrow: string
  title: string
  highlight: string
  description: string
  breadcrumb: string
  children?: React.ReactNode // estatísticas / ações à direita
}

// Topo escuro das páginas internas, com brilho vermelho e marca d'água
export default function PageHero({ eyebrow, title, highlight, description, breadcrumb, children }: Props) {
  return (
    <section className="relative bg-[#0A0A0A] text-white pt-36 pb-28 px-6 overflow-hidden">
      <div className="absolute -top-40 -left-40 w-[36rem] h-[36rem] bg-fem-red/25 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-60 right-0 w-[30rem] h-[30rem] bg-fem-red/10 blur-[120px] rounded-full pointer-events-none" />
      <Image
        src="/logo.png"
        alt=""
        width={520}
        height={520}
        className="absolute -right-24 top-1/2 -translate-y-1/2 opacity-[0.06] pointer-events-none select-none hidden md:block"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-white/40 mb-10">
          <Link href="/" className="hover:text-white transition-colors">Início</Link>
          <ChevronRight size={12} />
          <span className="text-white/80">{breadcrumb}</span>
        </nav>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-[2px] w-10 bg-fem-red" />
              <span className="text-fem-red font-black uppercase tracking-[0.4em] text-[10px]">{eyebrow}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-[0.9] mb-6">
              {title} <span className="text-fem-red">{highlight}</span>
            </h1>
            <p className="text-white/50 text-sm md:text-base font-medium leading-relaxed max-w-xl">{description}</p>
          </div>
          {children && <div className="flex flex-wrap gap-4">{children}</div>}
        </div>
      </div>
    </section>
  )
}

export function HeroStat({ value, label }: { value: React.ReactNode; label: string }) {
  return (
    <div className="min-w-[9rem] px-6 py-5 bg-white/[0.04] border border-white/10 rounded-2xl backdrop-blur">
      <div className="text-3xl font-black italic tracking-tighter leading-none">{value}</div>
      <div className="text-[9px] font-black uppercase tracking-[0.25em] text-white/40 mt-2">{label}</div>
    </div>
  )
}
