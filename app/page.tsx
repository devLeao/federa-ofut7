'use client'
import { 
  Instagram, 
  Youtube,} from 'lucide-react'
import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { 
  Menu, X, ArrowRight, Activity, CheckCircle2, 
  GraduationCap, Shield, MapPin, Trophy, 
  PlayCircle, BookOpen, Award, Radio 
} from 'lucide-react'
import ThemeToggle from '@/components/ThemeToggle'

function Counter({ value }: { value: number }) {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  
  // Lógica simples para contar quando aparecer na tela
  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      onViewportEnter={() => {
        let start = 0;
        const end = value;
        if (start === end) return;
        let totalDuration = 2000;
        let incrementTime = (totalDuration / end);
        let timer = setInterval(() => {
          start += 1;
          setCount(start);
          if (start === end) clearInterval(timer);
        }, incrementTime);
      }}
    >
      {count}
    </motion.span>
  );
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const containerRef = useRef(null);
const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ["start end", "end start"]
});
const backgroundY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

 return (
    <main className="min-h-screen bg-white text-black pt-24 md:pt-8 transition-colors duration-300">
      
    {/* NAVBAR FIXA - VERMELHA COM LOGO ORIGINAL */}
<nav className="fixed top-0 w-full z-[100] bg-fem-red backdrop-blur-xl border-b border-white/10 px-6 py-4 shadow-lg">
  <div className="max-w-7xl mx-auto flex justify-between items-center">
    
    {/* LOGO - IDENTIDADE PRESERVADA */}
    <Link href="/" className="flex items-center gap-3 group">
      <Image 
        src="/logo.png" 
        alt="FEM7SOC" 
        width={40} 
        height={40} 
        className="object-contain transition-transform group-hover:scale-105" 
      />
      <div className="flex flex-col leading-none">
          <span className="font-black italic uppercase tracking-tighter text-xl text-white">FEM7SOC</span>
          <span className="text-[7px] uppercase tracking-[0.3em] text-white/80 font-bold">Federação Mineira</span>
      </div>
    </Link>
    
    {/* MENU DESKTOP - AGORA APONTANDO PARA A PÁGINA DE LEGADO */}
    <div className="hidden md:flex items-center gap-10 text-[10px] font-bold uppercase tracking-[0.2em] text-white/90">
      <Link href="/" className="hover:text-black transition-colors">Início</Link>
      
      {/* ALTERADO: De <a> para <Link> para navegar entre páginas */}
      <Link href="/institucional" className="hover:text-black transition-colors">
        Institucional
      </Link>
      
      <Link href="/area-do-arbitro" className="hover:text-black transition-colors text-white">Área do Árbitro</Link>
      
      <Link href="/sumulas">
        <button className="bg-white text-fem-red px-6 py-2 hover:bg-black hover:text-white transition-all font-black uppercase tracking-widest text-[10px] rounded-sm shadow-xl">
          Súmulas
        </button>
      </Link>
    </div>

    {/* CONTROLES MOBILE */}
    <div className="flex items-center gap-4 md:hidden">
      <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-white hover:bg-white/10 rounded-full transition-colors">
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  </div>

  {/* MENU MOBILE EXPANDIDO - TAMBÉM ATUALIZADO */}
  <AnimatePresence>
    {isMenuOpen && (
      <motion.div 
        initial={{ opacity: 0, height: 0 }} 
        animate={{ opacity: 1, height: 'auto' }} 
        exit={{ opacity: 0, height: 0 }} 
        className="absolute top-full left-0 w-full bg-fem-red border-b border-white/10 overflow-hidden md:hidden shadow-2xl"
      >
        <div className="flex flex-col p-8 gap-6 text-white">
          <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-2xl font-black uppercase italic hover:text-black transition-colors">Início</Link>
          
          {/* MOBILE: Link para a nova página */}
          <Link href="/institucional" onClick={() => setIsMenuOpen(false)} className="text-2xl font-black uppercase italic hover:text-black transition-colors">
            Institucional
          </Link>
          
          <Link href="/area-do-arbitro" onClick={() => setIsMenuOpen(false)} className="text-2xl font-black uppercase italic hover:text-black transition-colors">Área do Árbitro</Link>
          <Link href="/sumulas" onClick={() => setIsMenuOpen(false)} className="text-2xl font-black uppercase italic text-black underline underline-offset-8">Súmulas</Link>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</nav>

      {/* BACKGROUND DECORATIVO SUAVIZADO */}
<div className="absolute top-0 left-0 w-full h-[100vh] overflow-hidden pointer-events-none z-0">
  <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[50%] bg-fem-red/5 blur-[120px] rounded-full" />
</div>

{/* HERO SECTION - AJUSTE DE PROXIMIDADE NAVBAR MOBILE */}
<section className="relative min-h-[90vh] md:min-h-screen flex items-center px-6 md:px-20 z-10 overflow-hidden bg-white -mt-[80px] pt-[50px] md:mt-0 md:pt-0">
  
  {/* BACKGROUND LOGIC: Banner PC vs Banner Mobile */}
  <div className="absolute inset-0 z-0">
    {/* Versão Desktop */}
    <div className="hidden md:block absolute inset-0">
      <Image 
        src="/banner.png" 
        alt="Banner de fundo" 
        fill 
        className="object-cover object-center"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
    </div>

    {/* Versão Mobile (Sobe para ocupar o espaço da Navbar) */}
    <div className="md:hidden absolute inset-0 overflow-hidden">
      <Image 
        src="/banner-mobile.png" 
        alt="Banner mobile" 
        fill 
        className="object-cover object-center"
        priority
      />
      {/* Overlay para legibilidade */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]" />
    </div>
  </div>

  <div className="grid lg:grid-cols-2 gap-12 items-center w-full max-w-7xl mx-auto relative z-10 pt-10 md:pt-0">
    
    {/* TEXT CONTENT */}
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8 }}
      className="text-left order-2 md:order-1 md:mt-15" 
    >
      <div className="flex items-center gap-2 mb-6">
        <span className="h-[2px] w-8 md:w-12 bg-fem-red"></span>
        <span className="text-fem-red font-black tracking-[0.2em] uppercase text-[10px] md:text-xs">
          Federação Mineira de Futebol 7
        </span>
      </div>
      
      <h1 className="text-5xl md:text-8xl font-black italic uppercase leading-[0.95] md:leading-[0.9] tracking-tighter mb-6 md:mb-8 text-black">
        A Força do <br /> 
        <span className="text-transparent stroke-text-dark">FUT 7</span> em <br /> 
        <span className="text-fem-red drop-shadow-[0_2px_10px_rgba(179,19,18,0.2)]">Minas.</span>
      </h1>

      <p className="text-gray-700 text-base md:text-xl max-w-md leading-relaxed mb-10 border-l-4 border-fem-red pl-6 font-medium italic">
        Excelência técnica e autoridade na arbitragem mais respeitada do país.
      </p>

  {/* BUTTONS SECTION */}
      <div className="flex flex-col gap-6 md:gap-8 items-start">
        
        {/* 1. Consultar Súmulas */}
        <Link href="/sumulas" className="flex items-center gap-4 text-[11px] font-black uppercase tracking-widest text-black hover:text-fem-red transition-all group">
          <div className="w-10 h-10 border-2 border-fem-red/10 bg-white rounded-full flex items-center justify-center group-hover:bg-fem-red group-hover:text-white transition-all shadow-sm">
            <Activity size={18} />
          </div>
          <span className="border-b-2 border-black/5 group-hover:border-fem-red transition-all">
            Consultar Súmulas Oficiais
          </span>
        </Link>

        

      </div> {/* Fecha a BUTTONS SECTION */}
    </motion.div> {/* Fecha o TEXT CONTENT */}

    {/* LOGO DESKTOP */}
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }} 
      animate={{ opacity: 1, scale: 1 }} 
      transition={{ duration: 1, delay: 0.2 }} 
      className="hidden md:flex order-1 md:order-2 relative justify-center lg:justify-end"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-fem-red/5 rounded-full blur-[80px] animate-pulse" />
      <Image 
        src="/logo.png" 
        alt="FEM7SOC" 
        width={500} 
        height={500} 
        className="relative z-10 drop-shadow-2xl" 
      />
    </motion.div>
  </div>

  <style jsx global>{`
    .stroke-text-dark { 
      -webkit-text-stroke: 1.5px #000; 
    }
    @media (min-width: 768px) {
      .stroke-text-dark { 
        -webkit-text-stroke: 2px #000; 
      }
    }
  `}</style>
</section>

{/* SEÇÃO PLACA DE PUBLICIDADE - LINKS ATIVOS E LOGOS ORIGINAIS */}
<section className="w-full bg-black py-4 overflow-hidden border-y-2 border-fem-red/30">
  <div className="max-w-7xl mx-auto px-4">
    
    {/* O "GABINETE" DA PLACA */}
    <div className="relative h-[80px] md:h-[130px] w-full flex items-center bg-black rounded-lg overflow-hidden border border-white/10 shadow-2xl">
      
      {/* 1. LADO ESQUERDO: Patrocinador 1 (DevLeão) */}
      <a 
        href="https://devleaoagencia.netlify.app/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-[25%] h-full flex items-center justify-center bg-white/5 border-r border-white/10 p-2 hover:bg-white/10 transition-all group"
      >
        <Image 
          src="/patrocinador1.png" 
          alt="Patrocinador 1" 
          width={100} 
          height={50} 
          className="object-contain max-h-full group-hover:scale-105 transition-transform"
        />
      </a>

      {/* 2. CENTRO: VÍDEO COM LINK WHATSAPP - AJUSTE PARA NÃO CORTAR NO MOBILE */}
      <a 
        href="https://wa.me/553188211021?text=Olá! Tenho interesse em anunciar na FEM7SOC." 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-[50%] h-full relative bg-black block group cursor-pointer"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          // MUDANÇA AQUI: 'object-contain' garante que o conteúdo do vídeo apareça 100% sem cortes
          className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity"
        >
          <source src="/patrocinadores.mp4" type="video/mp4" />
        </video>
        
        {/* Overlay de LED e indicação de clique */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-10 pointer-events-none bg-[length:100%_2px,3px_100%]" />
      </a>
      
      {/* 3. LADO DIREITO: Patrocinador 2 (ASSPROM) */}
      <a 
        href="https://assprom.org.br/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-[25%] h-full flex items-center justify-center bg-white/5 border-l border-white/10 p-2 hover:bg-white/10 transition-all group"
      >
        <Image 
          src="/patrocinador2.png" 
          alt="Patrocinador 2" 
          width={100} 
          height={50} 
          className="object-contain max-h-full group-hover:scale-105 transition-transform"
        />
      </a>

      {/* Brilho de Vidro Superior */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
    </div>

    {/* Legenda inferior */}
    <div className="flex justify-between mt-2 px-1">
      <p className="text-[7px] md:text-[9px] text-white/30 uppercase font-bold tracking-widest">Painel Digital Oficial</p>
      <p className="text-[7px] md:text-[9px] text-fem-red/50 uppercase font-black italic">Publicidade Ativa</p>
    </div>

  </div>
</section>

   {/* SEÇÃO 1: MANIFESTO - IMERSÃO ELITE */}
<section id="institucional" className="py-32 px-6 bg-white border-y border-gray-100 relative overflow-hidden">
  
  {/* MARCA D'ÁGUA COM PARALLAX SUTIL */}
  <motion.div 
    style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
    className="absolute -right-10 top-1/4 text-[15rem] font-black text-black/[0.02] pointer-events-none select-none uppercase italic tracking-tighter z-0"
  >
    OFICIAL
  </motion.div>

  <div className="max-w-6xl mx-auto relative z-10">
    <div className="flex flex-col md:flex-row gap-16 items-start">
      
      {/* LADO ESQUERDO: TÍTULO COM ANIMAÇÃO */}
      <div className="w-full md:w-1/3">
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-fem-red font-bold uppercase tracking-[0.3em] text-[10px] mb-4"
        >
          Sobre a Federação
        </motion.p>
        <h2 className="text-4xl md:text-5xl font-black leading-tight uppercase tracking-tighter text-black">
          Compromisso com a <br /> 
          <span className="relative inline-block mt-2">
            Integridade.
            <motion.span 
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute -bottom-1 left-0 h-2 bg-fem-red"
            />
          </span>
        </h2>
      </div>

      {/* LADO DIREITO: TEXTO E GRID INTERATIVO */}
      <div className="w-full md:w-2/3">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-gray-700 text-xl md:text-2xl leading-relaxed mb-10 font-medium italic"
        >
          A Federação Mineira de Futebol 7 Society (FEM7SOC) é a entidade máxima que rege a modalidade no estado. <span className="text-black font-black not-italic border-b-2 border-fem-red/20">Nossa atuação vai além das quatro linhas.</span>
        </motion.p>
        
        {/* GRID DE ITENS COM REVEAL EM CASCATA */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {['Regulação Oficial', 'Ética Inegociável', 'Excelência Técnica', 'Filiada aos Órgãos Nacionais'].map((text, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + (i * 0.1) }}
              className="flex items-center gap-4 text-sm font-bold text-gray-800 group cursor-default"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-fem-red group-hover:text-white transition-all duration-300 shadow-sm group-hover:rotate-6">
                <CheckCircle2 size={20} className="text-fem-red group-hover:text-white transition-colors" />
              </div>
              <span className="tracking-tight uppercase group-hover:text-fem-red transition-colors">{text}</span>
            </motion.div>
          ))}
        </div>

     <motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: true }}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="mt-12" // Espaçamento extra para destacar o botão
>
  <Link href="/institucional">
    <button className="flex items-center gap-6 bg-black text-white px-10 py-6 rounded-full font-black uppercase tracking-[0.2em] text-[10px] hover:bg-fem-red transition-all shadow-2xl hover:shadow-fem-red/40 group relative overflow-hidden">
      {/* Efeito de brilho interno no hover */}
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <span className="relative z-10">Conhecer Institucional</span>
      
      <div className="relative z-10 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-fem-red transition-all">
        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
      </div>
    </button>
  </Link>
</motion.div>
      </div>

    </div>
  </div>
</section>

{/* SEÇÃO 2: PILARES - DESIGN POWER RED COM IMERSÃO */}
<section 
  ref={containerRef}
  className="py-32 px-6 bg-fem-red relative overflow-hidden"
>
  {/* IMAGEM DE FUNDO COM EFEITO PARALLAX */}
  <motion.div 
    style={{ y: backgroundY }}
    className="absolute inset-0 z-0 scale-110"
  >
    <Image 
      src="/nossaatua.png" 
      alt="Padrão FEM7SOC" 
      fill 
      className="object-cover object-center opacity-20 mix-blend-overlay"
      priority
    />
    <div className="absolute inset-0 bg-gradient-to-b from-fem-red/90 via-fem-red/70 to-fem-red/90" />
  </motion.div>

  {/* MARCA D'ÁGUA FLUTUANTE */}
  <motion.div 
    initial={{ opacity: 0, x: -100 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 1.5 }}
    className="absolute left-0 bottom-0 text-[12rem] font-black text-white/[0.04] pointer-events-none select-none uppercase italic tracking-tighter z-10"
  >
    TÉCNICO
  </motion.div>

  <div className="max-w-6xl mx-auto relative z-20">
    
    {/* TÍTULO COM ANIMAÇÃO */}
    <div className="text-center mb-24">
      <motion.h2 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-7xl font-black uppercase tracking-tighter italic text-white drop-shadow-2xl"
      >
        Nossa Atuação Técnica
      </motion.h2>
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: '150px' }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="h-2.5 bg-white mx-auto mt-4 shadow-[0_0_20px_rgba(255,255,255,0.4)]"
      />
    </div>

    {/* GRID DE CARDS COM EFEITO DE INTERAÇÃO */}
    <div className="grid md:grid-cols-3 gap-10">
      {[
        { title: "Capacitação", desc: "Promovemos cursos e reciclagens constantes para o quadro de árbitros.", icon: <GraduationCap size={32} /> },
        { title: "Governança", desc: "Gestão transparente, ética e focada no crescimento da modalidade.", icon: <Shield size={32} /> },
        { title: "Expansão", desc: "Presença estratégica nos maiores polos de Futebol 7 do estado.", icon: <MapPin size={32} /> }
      ].map((item, idx) => (
        <motion.div 
          key={idx}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.2, duration: 0.6 }}
          whileHover={{ 
            rotateX: 5, 
            rotateY: -5, 
            scale: 1.05,
            transition: { duration: 0.2 } 
          }}
          className="p-12 bg-white border border-white/20 rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] hover:shadow-white/10 transition-shadow duration-500 group cursor-pointer"
        >
          <div className="w-20 h-20 bg-fem-red/10 rounded-3xl flex items-center justify-center text-fem-red mb-10 group-hover:bg-fem-red group-hover:text-white group-hover:shadow-[0_0_30px_rgba(179,19,18,0.4)] transition-all duration-500">
            {item.icon}
          </div>
          
          <h4 className="text-3xl font-black uppercase mb-6 text-black tracking-tighter group-hover:text-fem-red transition-colors">
            {item.title}
          </h4>
          
          <p className="text-gray-600 text-base leading-relaxed font-bold italic opacity-80 group-hover:opacity-100">
            {item.desc}
          </p>

          <div className="mt-8 h-1 w-0 bg-fem-red group-hover:w-full transition-all duration-700 rounded-full" />
        </motion.div>
      ))}
    </div>
  </div>

  {/* ELEMENTOS DE GLOW */}
  <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 blur-[120px] rounded-full pointer-events-none" />
  <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-black/20 blur-[120px] rounded-full pointer-events-none" />
</section>



 {/* SEÇÃO 3: ESTATÍSTICAS E HISTÓRIA - FINAL COM LOGO (CORRIGIDA) */}
<section className="py-20 md:py-32 px-6 bg-white relative overflow-hidden">
  
  {/* MARCA D'ÁGUA COM PARALLAX SUTIL */}
  <motion.div 
    style={{ y: useTransform(scrollYProgress, [0, 1], [0, 150]) }}
    className="absolute left-0 top-1/2 text-[10rem] md:text-[15rem] font-black text-black/[0.02] pointer-events-none select-none uppercase italic tracking-tighter z-0"
  >
    MINAS
  </motion.div>

  <div className="max-w-7xl mx-auto relative z-10">
    <div className="flex flex-col lg:flex-row items-center gap-16 md:gap-24">
      
      {/* LADO ESQUERDO: CONTEÚDO E NÚMEROS VIVOS */}
      <div className="w-full lg:w-1/2">
        <motion.span 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-fem-red font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block"
        >
          Desde 2003
        </motion.span>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-black uppercase italic leading-[0.85] mb-8 tracking-tighter text-black"
        >
          Muito mais que <br /> 
          <span className="text-fem-red relative inline-block">
            apenas futebol.
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              transition={{ delay: 0.5, duration: 1 }}
              className="absolute -bottom-2 left-0 h-1 bg-fem-red/20"
            />
          </span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 text-lg leading-relaxed mb-12 max-w-xl border-l-4 border-fem-red pl-6 font-medium italic"
        >
          A FEM7SOC nasceu com o propósito de organizar, profissionalizar e elevar o nível da arbitragem em Minas Gerais.
        </motion.p>

        {/* GRID DE NÚMEROS COM ANIMAÇÃO */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 py-10 border-t border-gray-100">
          {[
            { label: 'Árbitros', value: 30, prefix: '+' },
            { label: 'Jogos / Mês', value: 100, prefix: '+' },
            { label: 'Elite', value: 'MG', prefix: '' }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + (i * 0.1) }}
            >
              <h3 className="text-3xl md:text-5xl font-black italic text-black flex items-center">
                {stat.prefix}
                {typeof stat.value === 'number' ? (
                  <Counter value={stat.value} />
                ) : (
                  stat.value
                )}
              </h3>
              <p className="text-gray-400 font-bold uppercase text-[8px] md:text-[9px] tracking-[0.2em] mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

     {/* LADO DIREITO: IMAGEM COM MOLDURA E LOGO DA FEDERAÇÃO */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="w-full lg:w-1/2 relative mt-12 lg:mt-0"
      >
        <div className="relative z-10 overflow-hidden border-r-8 border-b-8 border-fem-red rounded-xl shadow-2xl group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 1.5 }}
            className="relative w-full h-[400px] md:h-[600px]"
          >
            <Image 
              src="/juiz.png" 
              alt="Arbitragem FEM7SOC" 
              fill
              // A mágica está no object-[center_top] ou na porcentagem personalizada abaixo
              className="object-cover object-[center_10%] grayscale group-hover:grayscale-0 transition-all duration-1000" 
              priority
            />
          </motion.div>
        </div>
        
        {/* LOGO DA FEDERAÇÃO */}
        <motion.div 
          whileHover={{ rotate: 5, scale: 1.1 }}
          className="
            absolute z-20 shadow-2xl transform transition-all cursor-pointer border-2 border-white/20 flex items-center justify-center rounded-sm bg-fem-red p-3
            bottom-[-30px] left-1/2 -translate-x-1/2 
            lg:bottom-[-20px] lg:left-[-32px] lg:translate-x-0
          "
        >
          <Image 
            src="/logo.png" 
            alt="Logo FEM7SOC" 
            width={75} 
            height={75} 
            className="object-contain lg:w-[85px] lg:h-[85px]"
          />
        </motion.div>
      </motion.div>
    </div>
  </div>
</section>

    {/* SEÇÃO DE CONTATO - IMERSÃO E ALTA CONVERSÃO */}
<section id="contato" className="py-32 px-6 bg-white relative overflow-hidden">
  
  {/* MARCA D'ÁGUA DINÂMICA */}
  <motion.div 
    style={{ y: useTransform(scrollYProgress, [0, 1], [100, -100]) }}
    className="absolute right-0 top-1/2 text-[12rem] font-black text-black/[0.02] pointer-events-none select-none uppercase italic tracking-tighter z-0"
  >
    CONTATO
  </motion.div>

  <div className="max-w-5xl mx-auto relative z-10">
    {/* CABEÇALHO DA SEÇÃO */}
    <div className="text-center mb-16">
      <motion.span 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-fem-red font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block"
      >
        Atendimento Oficial
      </motion.span>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-6xl font-black uppercase italic text-black tracking-tighter"
      >
        Fale com a <span className="text-fem-red">Federação</span>
      </motion.h2>
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: '80px' }}
        className="h-1.5 bg-fem-red mx-auto mt-6"
      />
    </div>
    
    {/* CARD CENTRALIZADO COM EFEITO PREMIUM */}
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      className="bg-white border border-gray-100 p-8 md:p-14 rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] relative overflow-hidden group"
    >
      <div className="grid md:grid-cols-2 gap-12 text-left relative z-10">
        
       {/* OPÇÕES DE CONTATO VIA WHATSAPP - NÚMERO ATUALIZADO */}
<div className="space-y-4">
  {[
    { id: 'arb', label: 'Contratar Arbitragem', msg: 'Olá! Gostaria de solicitar árbitros para minha competição.' },
    { id: 'cur', label: 'Curso de Árbitros', msg: 'Olá! Tenho interesse em me inscrever no curso de árbitros.' },
    { id: 'sum', label: 'Dúvida sobre Súmulas', msg: 'Olá! Preciso de ajuda com uma dúvida em uma súmula oficial.' }
  ].map((opt, i) => (
    <motion.button 
      key={opt.id} 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: i * 0.1 }}
      whileHover={{ x: 10 }}
      // LINK ATUALIZADO COM O NÚMERO DO LUIZ: 31 8821-1021
      onClick={() => window.open(`https://wa.me/553188211021?text=${encodeURIComponent(opt.msg)}`, '_blank')} 
      className="w-full p-6 bg-gray-50 border border-transparent hover:border-fem-red/30 hover:bg-white transition-all flex items-center justify-between group rounded-2xl shadow-sm hover:shadow-md"
    >
      <span className="font-black uppercase italic tracking-tighter text-black text-sm md:text-base">{opt.label}</span>
      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center group-hover:bg-fem-red group-hover:text-white transition-all shadow-sm">
        <ArrowRight size={18} />
      </div>
    </motion.button>
  ))}
</div>
        
        {/* STATUS DE ATENDIMENTO DIRETO */}
        <div className="bg-gray-50 border border-gray-100 p-10 rounded-[2.5rem] flex flex-col justify-between relative overflow-hidden">
          {/* Decoração de fundo no card de status */}
          <div className="absolute -right-8 -top-8 text-fem-red/[0.03] rotate-12">
            <Shield size={150} />
          </div>

          <div className="relative z-10">
            <div className="w-12 h-12 bg-fem-red/10 rounded-xl flex items-center justify-center text-fem-red mb-6">
              <Shield size={24} />
            </div>
            <h4 className="text-2xl font-black uppercase italic mb-4 text-black tracking-tighter leading-none">Atendimento <br/> Direto</h4>
            <p className="text-gray-500 text-sm leading-relaxed mb-8 font-bold italic">
              Nossa equipe técnica está pronta para suporte imediato dentro do horário comercial.
            </p>
          </div>

          <div className="relative z-10 flex flex-col gap-4">
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Horário: Seg a Sex, 09h - 18h</div>
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fem-red opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-fem-red"></span>
              </span>
              <span className="text-fem-red font-black text-xs uppercase tracking-widest">Online Agora</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
</section>
{/* FOOTER - CORES REAIS E MOBILE CENTERED */}
<footer className="bg-fem-red pt-20 pb-10 px-6 relative overflow-hidden">
  
  {/* MARCA D'ÁGUA SUTIL */}
  <div className="absolute right-0 bottom-0 text-[10rem] font-black text-white/[0.05] pointer-events-none select-none uppercase italic tracking-tighter -mb-10">
    FEM7SOC
  </div>

  <div className="max-w-7xl mx-auto relative z-10">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
      
      {/* COLUNA 1: MARCA E SOBRE - CENTRALIZADO NO MOBILE */}
      <div className="md:col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
        <Link href="/" className="flex items-center gap-3 mb-6 group">
          <Image 
            src="/logo.png" 
            alt="FEM7SOC" 
            width={65} 
            height={65} 
            className="object-contain"
          />
          <div className="flex flex-col leading-none">
              <span className="font-black italic uppercase tracking-tighter text-2xl text-white">FEM7SOC</span>
              <span className="text-[8px] uppercase tracking-[0.4em] text-white/80 font-black">Federação Mineira</span>
          </div>
        </Link>
        <p className="text-white/70 text-xs font-medium leading-relaxed max-w-sm italic">
          A entidade máxima do Futebol 7 Society em Minas Gerais. Desde 2008, promovendo a excelência técnica, ética e o profissionalismo em campo.
        </p>
      </div>

      {/* COLUNA 2: LINKS RÁPIDOS - CENTRALIZADO NO MOBILE */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left">
        <h4 className="text-white font-black uppercase italic tracking-tighter mb-6 text-sm">Navegação</h4>
        <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/60">
          <li><Link href="/" className="hover:text-black transition-colors">Início</Link></li>
          <li><Link href="/institucional" className="hover:text-black transition-colors">Institucional</Link></li>
          <li><Link href="/curso" className="hover:text-black transition-colors">Academia de Oficiais</Link></li>
          <li><Link href="/sumulas" className="hover:text-black transition-colors">Central de Súmulas</Link></li>
        </ul>
      </div>

      {/* COLUNA 3: CONEXÃO SOCIAL - CENTRALIZADO NO MOBILE */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left">
        <h4 className="text-white font-black uppercase italic tracking-tighter mb-6 text-sm">Conexão</h4>
        <div className="flex flex-col items-center md:items-start gap-6">
           <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest leading-relaxed">
             Belo Horizonte - MG<br/>
             contato@fem7soc.com.br
           </p>
           
           <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/fem7soc/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-fem-red transition-all shadow-sm"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://youtube.com/@federa_ofut7" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-fem-red transition-all shadow-sm"
              >
                <Youtube size={20} />
              </a>
           </div>
        </div>
      </div>
    </div>

    {/* LINHA FINAL: COPYRIGHT E ASSINATURA CENTRALIZADOS NO MOBILE */}
    <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
      <p className="text-white/40 text-[9px] font-bold uppercase tracking-[0.3em] text-center md:text-left">
        © 2026 Federação Mineira de Futebol 7 Society • Todos os direitos reservados
      </p>
      
      {/* ASSINATURA DEVLEÃO AGENCY - AJUSTADA PARA O FUNDO VERMELHO */}
      <a 
        href="https://devleaoagencia.netlify.app/" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="flex flex-col md:flex-row items-center gap-2 opacity-80 hover:opacity-100 transition-all group cursor-pointer text-center"
      >
        <span className="text-[8px] font-black uppercase tracking-widest text-white/50">
          Desenvolvido por
        </span>
        <span className="text-[11px] font-black italic uppercase text-white tracking-tighter">
          DevLeão <span className="text-black group-hover:text-white transition-colors">Agency</span>
        </span>
      </a>
    </div>
  </div>
</footer>
    </main>
  )
}