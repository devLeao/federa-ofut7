'use client'
import { ArrowLeft, Landmark, Scale, Gavel, History, Award, Instagram, Youtube, Menu, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function PaginaInstitucional() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white text-black overflow-hidden relative">
      
      {/* 1. NAV BAR OFICIAL */}
      <nav className="fixed top-0 w-full z-[100] bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Logo" width={45} height={45} className="object-contain" />
            <div className="flex flex-col leading-none">
              <span className="font-black italic uppercase tracking-tighter text-xl">FEM7SOC</span>
              <span className="text-[7px] uppercase tracking-[0.3em] text-fem-red font-black">Federação Mineira</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10 text-[10px] font-black uppercase tracking-widest text-gray-400">
            <Link href="/" className="hover:text-fem-red transition-colors">Início</Link>
            <Link href="/institucional" className="text-black border-b-2 border-fem-red pb-1">Institucional</Link>
           
          </div>

          <button className="md:hidden text-black" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* 2. HERO INSTITUCIONAL - COM LOGO À DIREITA */}
      <section className="relative pt-40 pb-32 px-6 bg-[#fcfcfc]">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] z-0" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-fem-red font-black uppercase tracking-[0.5em] text-[11px] mb-6 block italic">Entidade Registrada</span>
              <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.85] mb-8 text-black">
                Poder e <br /> <span className="text-gray-300">Governança</span>
              </h1>
              <p className="max-w-lg text-gray-500 text-lg font-medium leading-relaxed italic border-l-4 border-fem-red pl-6">
                Fundada em <span className="text-fem-red font-bold">2008</span>, a Federação Mineira de Futebol 7 Society é a guardiã da modalidade, zelando pela integridade esportiva em todo o estado.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative group">
                 <div className="absolute -inset-10 bg-fem-red/5 blur-[100px] rounded-full group-hover:bg-fem-red/10 transition-colors duration-700" />
                 <Image 
                    src="/logo.png" 
                    alt="Logo FEM7SOC" 
                    width={450} 
                    height={450} 
                    className="relative z-10 object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.1)] group-hover:scale-105 transition-transform duration-700"
                 />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* 3. SEÇÃO: O LEGADO (2008) */}
        <section className="py-32 grid md:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div className="flex items-center gap-4 text-fem-red">
              <History size={24} />
              <h2 className="text-2xl font-black uppercase italic tracking-tight text-black">Histórico Federativo</h2>
            </div>
            <div className="space-y-6 text-gray-700 leading-relaxed font-medium">
              <p>
                Desde sua fundação em <span className="text-fem-red font-bold">2008</span>, a FEM7SOC atua na padronização das regras oficiais e na chancela das competições de maior prestígio em Minas Gerais.
              </p>
              <p>
                O compromisso com a transparência administrativa e o desenvolvimento técnico transformou a Federação em uma referência nacional para a modalidade Society.
              </p>
            </div>
          </div>
          
          <div className="relative aspect-video bg-gray-50 border border-gray-100 rounded-[2.5rem] overflow-hidden group shadow-inner flex items-center justify-center">
              <span className="text-[15rem] font-black text-black/[0.02] absolute pointer-events-none italic">2008</span>
              <div className="text-center p-12 relative z-10">
                <Landmark size={60} className="text-fem-red mx-auto mb-6" />
                <h3 className="text-2xl font-black uppercase italic tracking-tighter text-black">Soberania Técnica</h3>
              </div>
          </div>
        </section>

        {/* 4. SEÇÃO: CORPO DIRETIVO (VIA ATA 2025) */}
        <section className="mb-32 bg-fem-red text-white rounded-[3.5rem] p-12 md:p-20 relative overflow-hidden shadow-2xl">
          <div className="absolute -right-20 -top-20 opacity-[0.05] text-white">
            <Landmark size={500} />
          </div>
          
          <div className="relative z-10">
            <div className="mb-16 border-l-4 border-white/30 pl-8">
              <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-4 text-white">Diretoria Executiva</h2>
              <p className="text-white/70 font-bold uppercase tracking-widest text-[10px]">Administração Oficial • Ata de Assembleia Geral 2025</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 mb-16 border-b border-white/20 pb-16">
              <div>
                <span className="bg-white text-fem-red px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.3em] mb-4 inline-block shadow-lg">Presidente</span>
                <h3 className="text-4xl font-black uppercase italic tracking-tighter mb-4 text-white">Luiz Gonzaga Siqueira Neto</h3>
                <div className="pt-6 border-t border-white/20">
                  <span className="text-[9px] font-black uppercase tracking-widest text-white/60 block mb-1">Vice-Presidente</span>
                  <h4 className="text-xl font-black uppercase italic text-white">Wanderson Lacerda de Deus</h4>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8">
                <div className="border-l-4 border-white/30 pl-6">
                  <h4 className="text-xs font-black uppercase tracking-widest mb-1 text-white/70">Diretoria Administrativa</h4>
                  <p className="text-xl font-black uppercase italic text-white">Roberto Andrade Nunes</p>
                </div>
                <div className="border-l-4 border-white/30 pl-6">
                  <h4 className="text-xs font-black uppercase tracking-widest mb-1 text-white/70">Diretoria Financeira</h4>
                  <p className="text-xl font-black uppercase italic text-white">Vanderci Antonio dos Santos</p>
                </div>
                <div className="border-l-4 border-white/30 pl-6">
                  <h4 className="text-xs font-black uppercase tracking-widest mb-1 text-white/70">Diretoria Técnica</h4>
                  <p className="text-xl font-black uppercase italic text-white">Giuliano Sabadini Saraiva</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-8 opacity-60">
                <p className="text-[9px] font-black uppercase tracking-widest">Conselho Fiscal: Wladiney Silva Junior</p>
                <p className="text-[9px] font-black uppercase tracking-widest">Suplente: Arceli Chaves</p>
                <p className="text-[9px] font-black uppercase tracking-widest">Suplente: Rodrigo Moreira</p>
            </div>
          </div>
        </section>

        {/* 5. VALORES FEDERATIVOS */}
        <div className="grid md:grid-cols-3 gap-8 mb-32">
          {[
            { title: "Transparência", icon: <Scale />, desc: "Zelo absoluto na gestão de ativos e processos eletivos." },
            { title: "Disciplina", icon: <Gavel />, desc: "Manutenção da ordem esportiva conforme os manuais oficiais." },
            { title: "Excelência", icon: <Award />, desc: "Referência técnica para todas as ligas filiadas do estado." }
          ].map((v, i) => (
            <div key={i} className="bg-white border border-gray-100 p-10 rounded-[2rem] hover:shadow-xl transition-all duration-500">
              <div className="text-fem-red mb-6">{v.icon}</div>
              <h4 className="text-xl font-black uppercase italic mb-4 text-black">{v.title}</h4>
              <p className="text-gray-500 text-sm font-medium leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 6. FOOTER CENTRALIZADO */}
      <footer className="bg-fem-red pt-20 pb-10 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center mb-16">
            <Image src="/logo.png" alt="FEM7SOC" width={80} height={80} className="object-contain mb-6" />
            <h4 className="text-white font-black italic uppercase text-3xl tracking-tighter mb-2">FEM7SOC</h4>
            <p className="text-white/60 text-[10px] uppercase font-black tracking-[0.4em]">Federação Mineira de Futebol 7 Society</p>
          </div>

          <div className="flex justify-center gap-6 mb-16">
              <a href="https://www.instagram.com/fem7soc/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-fem-red transition-all">
                <Instagram size={22} />
              </a>
              <a href="#" className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-fem-red transition-all">
                <Youtube size={22} />
              </a>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col items-center gap-8">
            <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.3em] text-center">
              © 2026 Federação Mineira de Futebol 7 Society • Belo Horizonte/MG
            </p>
            
            <a href="https://devleaoagencia.netlify.app/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 opacity-80 hover:opacity-100 transition-all group">
              <span className="text-[8px] font-black uppercase text-white/50 tracking-widest">Desenvolvido por</span>
              <span className="text-[12px] font-black italic uppercase text-white tracking-tighter">Dev Leão</span>
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}