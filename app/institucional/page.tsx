'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Landmark, Scale, Gavel, History, Award, ShieldCheck, ArrowRight, IdCard, FileText } from 'lucide-react'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'
import PageHero, { HeroStat } from '@/components/PageHero'

const ANO_FUNDACAO = 2008

const diretores = [
  { cargo: 'Diretoria Administrativa', nome: 'Roberto Andrade Nunes' },
  { cargo: 'Diretoria Financeira', nome: 'Vanderci Antonio dos Santos' },
  { cargo: 'Diretoria Técnica', nome: 'Giuliano Sabadini Saraiva' },
]

const conselhoFiscal = [
  'Wladiney Cerbino Ferreira',
  'Rodrigo Moreira Abrantes',
  'Elias Cassia Cassiano da Silva Junior',
]

const suplentes = [
  'Arceli Chaves',
  'Raphael Vasconcelos Bandeira Gonçalves',
  'Thompson Azevedo Moreira',
]

const valores = [
  { title: 'Transparência', icon: Scale, desc: 'Zelo absoluto na gestão de ativos e processos eletivos.' },
  { title: 'Disciplina', icon: Gavel, desc: 'Manutenção da ordem esportiva conforme os manuais oficiais.' },
  { title: 'Excelência', icon: Award, desc: 'Referência técnica para todas as ligas filiadas do estado.' },
]

export default function PaginaInstitucional() {
  return (
    <main className="min-h-screen bg-[#F4F4F5] text-black flex flex-col">
      <SiteNav />

      <PageHero
        breadcrumb="Institucional"
        eyebrow="Entidade Registrada"
        title="Poder e"
        highlight="Governança"
        description={`Fundada em ${ANO_FUNDACAO}, a Federação Mineira de Futebol 7 Society é a guardiã da modalidade, zelando pela integridade esportiva em todo o estado.`}
      >
        <HeroStat value={ANO_FUNDACAO} label="Fundação" />
        <HeroStat value={`${new Date().getFullYear() - ANO_FUNDACAO}+`} label="Anos de história" />
      </PageHero>

      <div className="flex-1 px-6 pb-24">
        <div className="max-w-7xl mx-auto -mt-12 relative z-20 space-y-8">

          {/* HISTÓRICO */}
          <section className="grid lg:grid-cols-[1.3fr_1fr] gap-8">
            <div className="bg-white border border-black/5 rounded-3xl shadow-xl shadow-black/5 p-8 md:p-12">
              <div className="flex items-center gap-3 text-fem-red mb-6">
                <History size={22} />
                <span className="font-black uppercase tracking-[0.3em] text-[10px]">Histórico Federativo</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter leading-none mb-6">
                Referência do Society <span className="text-fem-red">em Minas</span>
              </h2>
              <div className="space-y-5 text-gray-600 leading-relaxed">
                <p>
                  Desde sua fundação em <strong className="text-fem-red">{ANO_FUNDACAO}</strong>, a FEM7SOC atua na padronização das regras oficiais e na chancela das competições de maior prestígio em Minas Gerais.
                </p>
                <p>
                  O compromisso com a transparência administrativa e o desenvolvimento técnico transformou a Federação em uma referência nacional para a modalidade Society.
                </p>
              </div>
            </div>

            <div className="relative bg-[#0A0A0A] text-white rounded-3xl p-8 md:p-12 overflow-hidden flex flex-col justify-end min-h-[18rem]">
              <div className="absolute -top-24 -right-24 w-72 h-72 bg-fem-red/30 blur-[100px] rounded-full" />
              <span className="absolute -top-6 -left-2 text-[9rem] md:text-[11rem] font-black italic text-white/[0.04] leading-none select-none">{ANO_FUNDACAO}</span>
              <Landmark size={44} className="text-fem-red mb-6 relative" />
              <h3 className="text-3xl font-black uppercase italic tracking-tighter leading-none relative">Soberania Técnica</h3>
              <p className="text-white/50 text-sm mt-3 relative">Regras, arbitragem e competições sob um mesmo padrão oficial.</p>
            </div>
          </section>

          {/* DIRETORIA EXECUTIVA */}
          <section className="relative bg-fem-red text-white rounded-3xl p-8 md:p-14 overflow-hidden shadow-2xl shadow-fem-red/20">
            <Landmark size={420} className="absolute -right-24 -top-24 text-white/[0.05] pointer-events-none" />

            <div className="relative">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
                <div>
                  <span className="font-black uppercase tracking-[0.3em] text-[10px] text-white/60">Administração Oficial</span>
                  <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none mt-2">Diretoria Executiva</h2>
                </div>
                <span className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2 bg-black/20 rounded-full text-[10px] font-black uppercase tracking-widest">
                  <ShieldCheck size={14} /> Ata de Assembleia Geral 2025
                </span>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* PRESIDÊNCIA */}
                <div className="bg-white text-black rounded-2xl overflow-hidden flex flex-col sm:flex-row">
                  <div className="relative sm:w-48 aspect-[4/3] sm:aspect-auto shrink-0 bg-gray-100">
                    <Image src="/gonzaga.png" alt="Luiz Gonzaga Siqueira Neto" fill sizes="(max-width: 640px) 100vw, 192px" className="object-cover object-top" />
                  </div>
                  <div className="p-6 md:p-8 flex flex-col justify-center">
                    <span className="self-start bg-fem-red text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.3em] mb-3">Presidente</span>
                    <h3 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter leading-none">Luiz Gonzaga Siqueira Neto</h3>
                    <div className="mt-6 pt-5 border-t border-black/10">
                      <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 block mb-1">Vice-Presidente</span>
                      <p className="text-lg font-black uppercase italic tracking-tight">Wanderson Lacerda de Deus</p>
                    </div>
                  </div>
                </div>

                {/* DIRETORIAS */}
                <div className="grid gap-3">
                  {diretores.map((d) => (
                    <div key={d.cargo} className="bg-white/10 hover:bg-white/15 border border-white/15 rounded-2xl px-6 py-5 transition-colors">
                      <span className="text-[9px] font-black uppercase tracking-widest text-white/60">{d.cargo}</span>
                      <p className="text-lg md:text-xl font-black uppercase italic tracking-tight mt-1">{d.nome}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CONSELHO FISCAL */}
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                {[
                  { titulo: 'Conselho Fiscal', nomes: conselhoFiscal },
                  { titulo: 'Suplentes', nomes: suplentes },
                ].map((grupo) => (
                  <div key={grupo.titulo} className="bg-black/20 rounded-2xl p-6">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60 mb-4">{grupo.titulo}</h4>
                    <ul className="space-y-3">
                      {grupo.nomes.map((nome) => (
                        <li key={nome} className="flex items-center gap-3 text-sm font-bold uppercase tracking-wide">
                          <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" /> {nome}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* VALORES */}
          <section>
            <div className="flex items-center gap-3 mt-16 mb-8">
              <span className="h-[2px] w-10 bg-fem-red" />
              <span className="text-fem-red font-black uppercase tracking-[0.4em] text-[10px]">Valores Federativos</span>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {valores.map(({ title, icon: Icon, desc }) => (
                <div key={title} className="group bg-white border border-black/5 p-8 md:p-10 rounded-3xl hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/10 transition-all duration-500">
                  <div className="w-14 h-14 rounded-2xl bg-fem-red/10 text-fem-red flex items-center justify-center mb-6 group-hover:bg-fem-red group-hover:text-white transition-colors">
                    <Icon size={24} />
                  </div>
                  <h4 className="text-xl font-black uppercase italic tracking-tight mb-3">{title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CHAMADA */}
          <section className="relative bg-[#0A0A0A] text-white rounded-3xl p-8 md:p-14 overflow-hidden mt-16">
            <div className="absolute -bottom-32 -left-20 w-96 h-96 bg-fem-red/25 blur-[120px] rounded-full" />
            <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div>
                <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter leading-none">
                  Faça parte da <span className="text-fem-red">Federação</span>
                </h2>
                <p className="text-white/50 mt-4 max-w-lg">Registre-se como atleta oficial ou consulte as súmulas das competições chanceladas pela FEM7SOC.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/cadastro-atleta" className="group flex items-center justify-center gap-3 px-7 py-4 bg-fem-red hover:bg-white hover:text-black rounded-2xl transition-colors text-[10px] font-black uppercase tracking-widest">
                  <IdCard size={16} /> Cadastrar atleta <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/sumulas" className="flex items-center justify-center gap-3 px-7 py-4 bg-white/5 border border-white/15 hover:border-white rounded-2xl transition-colors text-[10px] font-black uppercase tracking-widest">
                  <FileText size={16} /> Ver súmulas
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>

      <SiteFooter />
    </main>
  )
}
