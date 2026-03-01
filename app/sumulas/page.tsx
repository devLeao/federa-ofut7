'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Search, Calendar, ExternalLink, Loader2, ArrowLeft, Filter, X } from 'lucide-react'
import Link from 'next/link'

export default function PaginaSumulas() {
  const [sumulas, setSumulas] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [busca, setBusca] = useState('')
  const [dataFiltro, setDataFiltro] = useState('')

  async function fetchSumulas() {
    try {
      const { data, error } = await supabase
        .from('sumulas')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setSumulas(data || [])
    } catch (error) {
      console.error('Erro:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSumulas()
  }, [])

  // Filtro Duplo: Busca por texto + Filtro por data
  const sumulasFiltradas = sumulas.filter(s => {
    const correspondeTexto = s.confronto.toLowerCase().includes(busca.toLowerCase()) ||
                             s.campeonato.toLowerCase().includes(busca.toLowerCase());
    
    const dataSumula = new Date(s.created_at).toISOString().split('T')[0];
    const correspondeData = dataFiltro ? dataSumula === dataFiltro : true;

    return correspondeTexto && correspondeData;
  })

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-12 pb-20 px-6">
      {/* BOTÃO VOLTAR - ADICIONE LOGO APÓS O <main> */}
<div className="max-w-7xl mx-auto mb-8">
  <Link 
    href="/" 
    className="inline-flex items-center gap-2 text-gray-500 hover:text-fem-red transition-all group"
  >
    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-fem-red transition-colors">
      <ArrowLeft size={14} />
    </div>
    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Voltar ao Início</span>
  </Link>
</div>
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER COM DESIGN DE ELITE */}
        <div className="mb-16 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
            <span className="h-[1px] w-12 bg-fem-red"></span>
            <span className="text-fem-red font-black uppercase tracking-[0.4em] text-[10px]">Departamento Técnico</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-none mb-8">
            Arquivo de <span className="text-transparent stroke-text text-outline">Súmulas</span>
          </h1>
        </div>

        {/* BARRA DE FERRAMENTAS (BUSCA E DATA) */}
        <div className="bg-[#0A0A0A] border border-white/5 p-2 rounded-[2rem] md:rounded-full mb-12 flex flex-col md:flex-row items-center gap-2 shadow-2xl shadow-black">
          
          {/* Input de Busca */}
          <div className="relative w-full flex-1">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input 
              type="text"
              placeholder="Buscar por confronto ou liga..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full bg-transparent border-none p-5 pl-16 rounded-full focus:ring-0 outline-none font-bold uppercase text-[11px] tracking-widest placeholder:text-gray-700"
            />
          </div>

          {/* Filtro de Data Estilizado */}
          <div className="relative w-full md:w-auto flex items-center bg-white/[0.03] border border-white/5 rounded-full px-6 py-3 md:mr-2 group hover:border-fem-red/50 transition-all">
            <Calendar className="text-fem-red mr-3" size={18} />
            <input 
              type="date"
              value={dataFiltro}
              onChange={(e) => setDataFiltro(e.target.value)}
              className="bg-transparent outline-none text-[11px] font-black uppercase tracking-widest text-gray-300 cursor-pointer appearance-none"
            />
            {dataFiltro && (
              <button onClick={() => setDataFiltro('')} className="ml-3 text-gray-500 hover:text-white">
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 className="animate-spin text-fem-red" size={48} />
            <p className="text-gray-600 font-black uppercase text-[10px] tracking-[0.3em]">Sincronizando Banco de Dados...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {sumulasFiltradas.map((sumula) => (
              <div key={sumula.id} className="group relative bg-[#0A0A0A] border border-white/5 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:translate-y-[-8px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                
                {/* Imagem com Overlay */}
                <div className="aspect-[4/5] relative overflow-hidden bg-gray-900">
                  <img 
                    src={sumula.image_url} 
                    alt={sumula.confronto}
                    className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-90" />
                  
                  {/* Selo de Data Flutuante */}
                  <div className="absolute top-6 right-6 bg-fem-red text-white px-4 py-2 rounded-full font-black text-[9px] uppercase tracking-widest shadow-xl">
                    {new Date(sumula.created_at).toLocaleDateString('pt-BR')}
                  </div>
                </div>

                {/* Conteúdo do Card */}
                <div className="absolute bottom-0 left-0 w-full p-8 pt-0">
                  <span className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-md text-fem-red text-[8px] font-black uppercase tracking-[0.2em] mb-4">
                    {sumula.campeonato}
                  </span>
                  <h3 className="text-2xl font-black uppercase italic leading-none mb-8 tracking-tighter">
                    {sumula.confronto}
                  </h3>
                  
                  <a 
                    href={sumula.image_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full p-5 bg-white text-black hover:bg-fem-red hover:text-white transition-all rounded-2xl font-black uppercase text-[10px] tracking-[0.2em]"
                  >
                    Ver Relatório Completo <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Estado Vazio */}
        {!loading && sumulasFiltradas.length === 0 && (
          <div className="text-center py-40 border-2 border-dashed border-white/5 rounded-[3rem]">
            <p className="text-gray-700 font-black uppercase text-xs tracking-[0.4em]">Nenhum registro encontrado</p>
          </div>
        )}
      </div>

      <style jsx global>{`
        .stroke-text { -webkit-text-stroke: 1px rgba(255,255,255,0.15); }
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(1);
          opacity: 0.5;
          cursor: pointer;
        }
      `}</style>
    </main>
  )
}