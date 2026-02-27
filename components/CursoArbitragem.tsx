import { PlayCircle, GraduationCap, BookOpen, Award } from 'lucide-react'
import Link from 'next/link'

export default function CursoArbitragem() {
  return (
    <section className="py-24 bg-white border-t border-gray-100 relative overflow-hidden">
      
      {/* MARCA D'ÁGUA SUTIL - PADRÃO ELITE */}
      <div className="absolute right-0 bottom-0 text-[10rem] font-black text-black/[0.01] pointer-events-none select-none uppercase italic tracking-tighter z-0">
        FORMAÇÃO
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="text-fem-red font-bold uppercase tracking-[0.3em] text-[10px]">Formação Profissional</span>
            <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mt-2 text-black">
              Curso de <span className="text-fem-red">Arbitragem</span>
            </h2>
          </div>
          <p className="text-gray-500 max-w-sm text-xs font-bold uppercase tracking-widest leading-relaxed">
            Torne-se um árbitro oficial da Federação e atue nas principais ligas de Minas Gerais.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card de Vídeo/Curso - Ajustado para harmonizar com os novos botões */}
          <div className="group relative bg-gray-50 border border-gray-200 rounded-[2rem] overflow-hidden hover:border-fem-red/50 transition-all duration-500 shadow-sm">
            <div className="aspect-video bg-gray-200 relative flex items-center justify-center overflow-hidden">
              <PlayCircle className="text-fem-red opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all z-10" size={64} />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-50 to-transparent z-0" />
            </div>
            <div className="p-8">
              <div className="flex items-center gap-2 text-fem-red mb-4">
                <BookOpen size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">Módulo 01 • Introdução</span>
              </div>
              <h3 className="text-xl font-black uppercase italic mb-6 text-black">Regras e Fundamentos</h3>
              <button className="w-full py-4 border border-black/10 text-black font-black uppercase text-[10px] tracking-widest hover:bg-black hover:text-white transition-all rounded-xl">
                Acessar Aula Grátis
              </button>
            </div>
          </div>

          {/* Card Informativo 01 - Badge Arredondada */}
          <div className="bg-gray-50/50 border border-gray-200 p-10 rounded-[2rem] flex flex-col justify-between shadow-sm transition-all hover:shadow-md">
            <div className="w-14 h-14 bg-fem-red/5 rounded-2xl flex items-center justify-center text-fem-red">
              <GraduationCap size={30} />
            </div>
            <div>
              <h3 className="text-2xl font-black uppercase italic mt-6 mb-2 text-black">Certificação Oficial</h3>
              <p className="text-gray-600 text-sm leading-relaxed font-medium italic">
                Ao concluir os 12 módulos, você recebe o certificado chancelado pela FEM7SOC para apitar competições federadas.
              </p>
            </div>
          </div>

          {/* Card Informativo 02 - FOCO TOTAL EM CONVERSÃO */}
          <div className="relative bg-fem-red p-10 rounded-[2rem] flex flex-col justify-between shadow-[0_20px_40px_rgba(179,19,18,0.2)] overflow-hidden group">
            <Award className="text-white relative z-10" size={40} />
            
            <div className="relative z-10">
              <h3 className="text-2xl font-black uppercase italic mt-6 mb-2 text-white">Formação de Elite</h3>
              <p className="text-white/90 text-sm leading-relaxed mb-8 font-medium italic">
                Torne-se um árbitro federado. Ao se inscrever, você garante o **Livro de Regras Oficial 2026**.
              </p>
              <Link href="/curso">
                <button className="bg-black text-white px-8 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-fem-red transition-all w-full shadow-2xl">
                  Quero me Inscrever
                </button>
              </Link>
            </div>

            {/* Marca d'água interna no card para profundidade */}
            <div className="absolute -bottom-4 -right-4 text-white/[0.05] text-8xl font-black italic select-none">
              MG
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}