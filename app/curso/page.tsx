'use client'
import { Book, CheckCircle2, Video, Star, Trophy, ArrowLeft, Award, ArrowRight, Brain, Users, Zap, Clock } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function PaginaCurso() {
  const containerRef = useRef(null)
  
  return (
    <main ref={containerRef} className="min-h-screen bg-[#050505] text-white pt-12 pb-20 px-6 relative overflow-hidden">
      
      {/* MARCA D'ÁGUA DE FUNDO */}
      <div className="absolute top-40 -left-20 text-[15rem] font-black text-white/[0.01] pointer-events-none select-none uppercase italic tracking-tighter z-0">
        ACADEMIA
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header da Página */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link href="/" className="text-fem-red inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] mb-12 hover:gap-4 transition-all group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Voltar ao Início
          </Link>
        </motion.div>
        
      {/* HERO DA PÁGINA DO CURSO */}
<div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
  >
    <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.85] mb-8">
      Academia de <br /> <span className="text-fem-red text-outline">Oficiais</span>
    </h1>
    <p className="text-gray-400 text-xl leading-relaxed mb-10 max-w-lg italic font-medium">
      O curso de arbitragem da FEM7SOC é o padrão ouro de Minas Gerais. Preparamos você para dominar as 17 regras e controlar o jogo sob pressão.
    </p>
    
    <div className="flex items-center gap-6 p-6 bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-sm shadow-2xl">
      <div className="w-16 h-16 bg-fem-red/20 rounded-2xl flex items-center justify-center text-fem-red">
        <Book size={32} />
      </div>
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-white mb-1">Bônus Exclusivo</p>
        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Livro de Regras Oficial 2026 (Físico + Digital)</p>
      </div>
    </div>
  </motion.div>

  {/* LADO DIREITO: IMAGEM DO CURSO */}
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.4 }}
    className="relative group"
  >
    {/* Efeito de brilho ao fundo da imagem */}
    <div className="absolute inset-0 bg-fem-red/20 blur-[100px] rounded-full opacity-50 group-hover:opacity-80 transition-opacity duration-1000" />
    
    <div className="relative aspect-square md:aspect-[4/5] overflow-hidden border-2 border-white/10 rounded-[3rem] shadow-2xl bg-black">
      <Image 
        src="/curso.png" 
        alt="Curso de Arbitragem FEM7SOC" 
        fill
        className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-105"
        priority
      />
      {/* Overlay de gradiente para dar profundidade */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
    </div>
  </motion.div>
</div>

        {/* GRADE DE APRENDIZADO */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter">O que você vai dominar</h2>
          <div className="h-1 w-20 bg-fem-red mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-32">
          {[
            { 
              title: "Teoria Avançada", 
              icon: <Video size={28} />, 
              desc: "Análise profunda e interpretação detalhada das 17 regras fundamentais do Futebol 7 Society para a temporada 2026." 
            },
            { 
              title: "Gestão de Campo", 
              icon: <Trophy size={28} />, 
              desc: "Domínio do posicionamento estratégico, mecânica de sinais oficiais e timing perfeito para o uso do apito." 
            },
            { 
              title: "Controle Mental", 
              icon: <Brain size={28} />, 
              desc: "Psicologia aplicada: técnicas de mediação de conflitos e manutenção da autoridade sob pressão extrema." 
            }
          ].map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-[#0A0A0A] border border-white/5 p-10 rounded-[2.5rem] hover:border-fem-red/50 transition-all group duration-500 shadow-xl"
            >
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-fem-red mb-8 group-hover:bg-fem-red group-hover:text-white transition-all">
                {item.icon}
              </div>
              <h3 className="text-2xl font-black uppercase italic mb-4 tracking-tighter leading-tight">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-medium italic opacity-80 group-hover:opacity-100 transition-opacity">{item.desc}</p>
            </motion.div>
          ))}
        </div>

      {/* SEÇÃO DE MENTORIA - LUIZ GONZAGA (MASTERCLASS) */}
<motion.section 
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  className="mb-32 relative group px-4 md:px-0"
>
  <div className="absolute inset-0 bg-fem-red/5 rounded-[4rem] -rotate-1 group-hover:rotate-0 transition-transform duration-700" />
  <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center p-8 md:p-16 border border-white/10 rounded-[4rem] bg-[#0A0A0A]/80 backdrop-blur-xl overflow-hidden shadow-2xl">
    
    <div className="relative order-2 lg:order-1">
      <div className="absolute inset-0 bg-fem-red/20 blur-[80px] rounded-full" />
      <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border-2 border-white/10 shadow-2xl">
    {/* IMAGEM DO LUIZ GONZAGA - ENQUADRAMENTO CORRIGIDO */}
<Image 
  src="/gonzaga.png" 
  alt="Luiz Gonzaga - Mentor"
  fill
  // A classe !object-[center_10%] força o foco da imagem a 10% do topo
  className="w-full h-full object-cover !object-[center_50%] grayscale group-hover:grayscale-0 transition-all duration-1000"
  priority
/>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        
        <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
          <div className="flex items-center gap-2 text-fem-red mb-1">
            <Star size={14} fill="currentColor" />
            {/* TÍTULO ATUALIZADO */}
            <span className="text-[10px] font-black uppercase tracking-widest text-white">Ex-Árbitro Profissional</span>
          </div>
          <p className="text-sm font-black uppercase italic text-white">Luiz Gonzaga</p>
        </div>
      </div>
    </div>

    <div className="order-1 lg:order-2 text-white">
      <span className="text-fem-red font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Mentoria de Elite</span>
      <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none mb-8">
        Aprenda com <br /> quem vive a <span className="text-fem-red">Regra</span>
      </h2>
      <p className="text-gray-400 text-lg leading-relaxed italic font-medium mb-8">
        "Mais do que apitar, a arbitragem é sobre gerir emoções e ler o jogo. Vou te entregar o que os livros não ensinam."
      </p>
      <div className="space-y-4 mb-10">
        {["Análise de lances reais", "Postura em cenários críticos", "Networking federado"].map((text, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <CheckCircle2 size={18} className="text-fem-red" />
            <span className="text-xs font-black uppercase tracking-widest">{text}</span>
          </div>
        ))}
      </div>
      <div className="p-6 bg-fem-red/10 border border-fem-red/20 rounded-2xl italic text-xs text-white/80">
        Sessões exclusivas via Meet e acompanhamento presencial em campo.
      </div>
    </div>
  </div>
</motion.section>

        {/* DIFERENCIAIS */}
        <div className="grid md:grid-cols-2 gap-8 mb-32">
          <div className="p-10 bg-white/5 border border-white/10 rounded-[2.5rem] flex items-start gap-6 group hover:bg-white/10 transition-all">
            <Users className="text-fem-red shrink-0" size={32} />
            <div>
              <h4 className="text-xl font-black uppercase italic mb-2 tracking-tighter">Network de Elite</h4>
              <p className="text-gray-500 text-sm italic font-medium">Faça parte de um grupo seleto de oficiais que atuam nas maiores competições de Minas.</p>
            </div>
          </div>
          <div className="p-10 bg-white/5 border border-white/10 rounded-[2.5rem] flex items-start gap-6 group hover:bg-white/10 transition-all">
            <Zap className="text-fem-red shrink-0" size={32} />
            <div>
              <h4 className="text-xl font-black uppercase italic mb-2 tracking-tighter">Acesso Imediato</h4>
              <p className="text-gray-500 text-sm italic font-medium">Inicie seus estudos teóricos assim que sua inscrição for confirmada pela nossa equipe.</p>
            </div>
          </div>
        </div>

        {/* CTA FINAL */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white text-black p-12 md:p-20 rounded-[4rem] text-center relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(179,19,18,0.3)]"
        >
          <div className="relative z-10">
            <span className="text-fem-red font-black uppercase tracking-[0.3em] text-[10px] mb-6 block">Turma 2026 • Vagas Limitadas</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-10 leading-none">
              Pronto para apitar <br /> na elite mineira?
            </h2>
            <button 
  // NÚMERO ATUALIZADO: 31 8821-1021
  onClick={() => window.open('https://wa.me/553188211021?text=Olá! Gostaria de me inscrever no curso de arbitragem da FEM7SOC. Como podemos começar?', '_blank')}
  className="bg-black text-white px-16 py-6 rounded-full font-black uppercase text-xs tracking-[0.2em] hover:bg-fem-red transition-all shadow-2xl group flex items-center gap-4 mx-auto"
>
  Garantir minha vaga 
  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
</button>
          </div>
          <div className="absolute -right-10 -bottom-10 text-black/[0.03] rotate-12">
            <Award size={300} />
          </div>
        </motion.div>

      </div>
    </main>
  )
}