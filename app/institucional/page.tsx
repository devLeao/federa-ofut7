'use client'
import { ArrowLeft, ShieldCheck, Landmark, Scale, Gavel, History, Award, ScrollText } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function PaginaInstitucional() {
  return (
    <main className="min-h-screen bg-white text-black pt-32 pb-20 px-6 relative">
      
      {/* BACKGROUND DE TEXTURA - SUTIL PARA REFINAMENTO */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/white-diamond.png')] z-0" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* NAVEGAÇÃO SUPERIOR */}
        <Link href="/" className="text-fem-red inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] mb-16 hover:opacity-70 transition-all group">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Voltar ao Portal Oficial
        </Link>

        {/* HEADER: CLARO E IMPONENTE */}
        <header className="mb-24 border-l-8 border-fem-red pl-8 md:pl-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-fem-red font-black uppercase tracking-[0.5em] text-[11px] mb-4 block">Entidade Máxima do Estado</span>
            <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-none mb-6 text-black">
              Institucional <br /> <span className="text-gray-200">FEM7SOC</span>
            </h1>
            <p className="max-w-2xl text-gray-600 text-lg md:text-xl font-medium leading-relaxed italic">
              Regulamentando, fiscalizando e fomentando o Futebol 7 Society em território mineiro desde 2003 sob os pilares da ética e da excelência técnica.
            </p>
          </motion.div>
        </header>

        {/* SEÇÃO 1: O LEGADO (2003 - PRESENTE) */}
        <section className="mb-32 grid md:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div className="flex items-center gap-4 text-fem-red">
              <History size={24} />
              <h2 className="text-2xl font-black uppercase italic tracking-tight text-black">Nossa Gênese</h2>
            </div>
            <div className="space-y-6 text-gray-700 leading-relaxed font-medium">
              <p>
                A trajetória da FEM7SOC funde-se com a própria evolução do Society em Minas Gerais. Em <span className="text-fem-red font-bold">2003</span>, identificou-se a necessidade urgente de uma curadoria técnica que trouxesse o rigor do futebol profissional para as quadras sintéticas.
              </p>
              <p>
                Nestes 23 anos, a Federação estabeleceu os manuais de arbitragem e as normas de governança que hoje regem os maiores campeonatos do estado.
              </p>
            </div>
            <div className="inline-flex items-center gap-4 p-6 bg-gray-50 border border-gray-100 rounded-2xl shadow-sm">
              <Award className="text-fem-red" size={32} />
              <p className="text-[10px] font-black uppercase tracking-widest leading-tight text-gray-800">Chancela Oficial reconhecida <br/> pelos órgãos nacionais da modalidade.</p>
            </div>
          </div>
          
          <div className="relative aspect-square bg-gray-50 border border-gray-100 rounded-[3.5rem] overflow-hidden group shadow-xl">
             <div className="absolute inset-0 bg-gradient-to-br from-fem-red/10 to-transparent opacity-60" />
             <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12">
                <span className="text-[10rem] font-black text-black/[0.03] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">2003</span>
                <Landmark size={80} className="text-fem-red mb-8" />
                <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-4 text-black">Jurisdição Mineira</h3>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em]">Soberania técnica em todos os polos do estado</p>
             </div>
          </div>
        </section>

        {/* SEÇÃO 2: ALTA CÚPULA (PRESIDÊNCIA EM DESTAQUE VERMELHO) */}
        <section className="mb-32 bg-fem-red text-white rounded-[4rem] p-12 md:p-20 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-12 opacity-[0.1] text-white">
            <ShieldCheck size={300} />
          </div>
          
          <div className="relative z-10">
            <div className="mb-16">
              <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-4">Corpo Diretivo</h2>
              <p className="text-white/70 font-bold uppercase tracking-widest text-[10px]">Liderança Estratégica e Governança</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 mb-16 border-b border-white/20 pb-16">
              <div>
                <span className="bg-white text-fem-red px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.3em] mb-4 inline-block shadow-lg">Presidente</span>
                <h3 className="text-4xl font-black uppercase italic tracking-tighter mb-4">Luiz Gonzaga</h3>
                <p className="text-white/90 leading-relaxed font-medium mb-6 italic">
                  Ex-Árbitro CBF com histórico em competições nacionais de elite. Sua liderança é pautada pela transposição da disciplina do futebol de campo para o Futebol 7.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6">
                <div className="border-l-4 border-white/30 pl-6 py-2">
                  <h4 className="text-sm font-black uppercase tracking-widest mb-1 text-white">Secretaria Geral</h4>
                  <p className="text-white/60 text-xs font-bold italic uppercase">Administração de ativos e registros oficiais</p>
                </div>
                <div className="border-l-4 border-white/30 pl-6 py-2">
                  <h4 className="text-sm font-black uppercase tracking-widest mb-1 text-white">Diretoria de Arbitragem</h4>
                  <p className="text-white/60 text-xs font-bold italic uppercase">Padronização técnica e escalas</p>
                </div>
                <div className="border-l-4 border-white/30 pl-6 py-2">
                  <h4 className="text-sm font-black uppercase tracking-widest mb-1 text-white">Comitê de Ética</h4>
                  <p className="text-white/60 text-xs font-bold italic uppercase">Compliance e integridade</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO 3: VALORES (CARDS CLAROS COM HOVER VERMELHO) */}
        <div className="grid md:grid-cols-3 gap-8 mb-32">
          {[
            { title: "Transparência", icon: <Scale />, desc: "Prestação de contas e clareza em todos os sorteios e escalas." },
            { title: "Disciplina", icon: <Gavel />, desc: "Rigor absoluto no cumprimento das 17 regras universais." },
            { title: "Profissionalismo", icon: <ScrollText />, desc: "Capacitação contínua e suporte integral aos filiados." }
          ].map((v, i) => (
            <div key={i} className="bg-white border border-gray-100 p-10 rounded-[2.5rem] hover:bg-fem-red group transition-all duration-500 shadow-sm hover:shadow-fem-red/20">
              <div className="text-fem-red group-hover:text-white mb-6 transition-colors">{v.icon}</div>
              <h4 className="text-xl font-black uppercase italic mb-4 group-hover:text-white transition-colors">{v.title}</h4>
              <p className="text-gray-500 group-hover:text-white/80 text-sm font-medium transition-colors leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </main>
  )
}