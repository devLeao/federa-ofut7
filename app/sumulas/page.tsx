'use client'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Search, Calendar, X, Download, Maximize2, AlertTriangle, RotateCcw, FileText, Trophy } from 'lucide-react'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'
import PageHero, { HeroStat } from '@/components/PageHero'

type Sumula = {
  id: string
  campeonato: string
  confronto: string
  image_url: string
  created_at: string
}

// yyyy-mm-dd no fuso local (toISOString usaria UTC e trocaria o dia à noite)
const diaLocal = (iso: string) => new Date(iso).toLocaleDateString('sv-SE')
const dataBR = (iso: string) =>
  new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).replace('.', '')

export default function PaginaSumulas() {
  const [sumulas, setSumulas] = useState<Sumula[]>([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState('')
  const [busca, setBusca] = useState('')
  const [dataFiltro, setDataFiltro] = useState('')
  const [campeonato, setCampeonato] = useState('')
  const [aberta, setAberta] = useState<Sumula | null>(null)

  const fetchSumulas = useCallback(() => {
    supabase
      .from('sumulas')
      .select('id, campeonato, confronto, image_url, created_at')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) setErro(error.message)
        else setSumulas(data || [])
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    fetchSumulas()
  }, [fetchSumulas])

  function tentarNovamente() {
    setLoading(true)
    setErro('')
    fetchSumulas()
  }

  // Fecha a visualização com ESC
  useEffect(() => {
    if (!aberta) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setAberta(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [aberta])

  const campeonatos = useMemo(
    () => [...new Set(sumulas.map((s) => s.campeonato.trim().toUpperCase()))].sort(),
    [sumulas],
  )

  const termo = busca.trim().toLowerCase()
  const sumulasFiltradas = sumulas.filter((s) => {
    const correspondeTexto = !termo || s.confronto.toLowerCase().includes(termo) || s.campeonato.toLowerCase().includes(termo)
    const correspondeData = !dataFiltro || diaLocal(s.created_at) === dataFiltro
    const correspondeCampeonato = !campeonato || s.campeonato.trim().toUpperCase() === campeonato
    return correspondeTexto && correspondeData && correspondeCampeonato
  })

  const temFiltro = Boolean(busca || dataFiltro || campeonato)
  const limparFiltros = () => { setBusca(''); setDataFiltro(''); setCampeonato('') }

  return (
    <main className="min-h-screen bg-[#F4F4F5] text-black flex flex-col">
      <SiteNav />

      <PageHero
        breadcrumb="Súmulas"
        eyebrow="Departamento Técnico"
        title="Arquivo de"
        highlight="Súmulas"
        description="Todas as súmulas oficiais enviadas pelos árbitros da FEM7SOC, organizadas por campeonato e data."
      >
        <HeroStat value={loading ? '—' : sumulas.length} label="Súmulas" />
        <HeroStat value={loading ? '—' : campeonatos.length} label="Campeonatos" />
      </PageHero>

      <section className="flex-1 px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          {/* FILTROS */}
          <div className="-mt-12 relative z-20 bg-white border border-black/5 rounded-3xl shadow-xl shadow-black/5 p-3 md:p-4">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Buscar por confronto ou campeonato..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="w-full bg-[#F4F4F5] border border-transparent focus:border-fem-red/40 focus:bg-white p-4 pl-14 rounded-2xl outline-none transition-all font-semibold text-sm placeholder:text-gray-400"
                />
              </div>
              <label className="relative flex items-center bg-[#F4F4F5] border border-transparent focus-within:border-fem-red/40 rounded-2xl px-5 cursor-pointer">
                <Calendar className="text-fem-red mr-3 shrink-0" size={18} />
                <input
                  type="date"
                  value={dataFiltro}
                  onChange={(e) => setDataFiltro(e.target.value)}
                  className="bg-transparent outline-none py-4 text-sm font-semibold text-gray-700 cursor-pointer"
                />
                {dataFiltro && (
                  <button onClick={() => setDataFiltro('')} aria-label="Limpar data" className="ml-2 text-gray-400 hover:text-black">
                    <X size={16} />
                  </button>
                )}
              </label>
            </div>

            {campeonatos.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1" data-lenis-prevent>
                <button
                  onClick={() => setCampeonato('')}
                  className={`shrink-0 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${!campeonato ? 'bg-black text-white' : 'bg-[#F4F4F5] text-gray-500 hover:text-black'}`}
                >
                  Todos
                </button>
                {campeonatos.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCampeonato(c === campeonato ? '' : c)}
                    className={`shrink-0 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${c === campeonato ? 'bg-fem-red text-white' : 'bg-[#F4F4F5] text-gray-500 hover:text-black'}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* CONTADOR */}
          {!loading && !erro && (
            <div className="flex items-center justify-between mt-10 mb-6">
              <p className="text-[11px] font-black uppercase tracking-[0.25em] text-gray-500">
                {sumulasFiltradas.length} {sumulasFiltradas.length === 1 ? 'súmula' : 'súmulas'}
                {temFiltro && ' encontradas'}
              </p>
              {temFiltro && (
                <button onClick={limparFiltros} className="text-[10px] font-black uppercase tracking-widest text-fem-red hover:underline">
                  Limpar filtros
                </button>
              )}
            </div>
          )}

          {/* ERRO */}
          {erro && (
            <div className="mt-10 bg-white border border-red-200 rounded-3xl p-10 text-center">
              <AlertTriangle className="mx-auto text-fem-red mb-4" size={36} />
              <h3 className="text-lg font-black uppercase italic tracking-tight mb-2">Não foi possível carregar as súmulas</h3>
              <p className="text-sm text-gray-500 mb-6">{erro}</p>
              <button onClick={tentarNovamente} className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-fem-red transition-colors">
                <RotateCcw size={14} /> Tentar novamente
              </button>
            </div>
          )}

          {/* CARREGANDO */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-3xl overflow-hidden border border-black/5 animate-pulse">
                  <div className="aspect-[4/3] bg-gray-200" />
                  <div className="p-6 space-y-3">
                    <div className="h-3 w-24 bg-gray-200 rounded" />
                    <div className="h-5 w-3/4 bg-gray-200 rounded" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* LISTA */}
          {!loading && !erro && sumulasFiltradas.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sumulasFiltradas.map((sumula) => (
                <article key={sumula.id} className="group bg-white rounded-3xl overflow-hidden border border-black/5 shadow-sm hover:shadow-2xl hover:shadow-black/10 hover:-translate-y-1 transition-all duration-500">
                  <button onClick={() => setAberta(sumula)} className="relative block w-full aspect-[4/3] overflow-hidden bg-gray-100">
                    <img
                      src={sumula.image_url}
                      alt={`Súmula ${sumula.confronto}`}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 px-5 py-3 bg-white rounded-full text-[10px] font-black uppercase tracking-widest">
                        <Maximize2 size={14} /> Ampliar
                      </span>
                    </div>
                    <span className="absolute top-4 left-4 bg-white/95 text-black px-3 py-1.5 rounded-full font-black text-[9px] uppercase tracking-widest shadow">
                      {dataBR(sumula.created_at)}
                    </span>
                  </button>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-fem-red text-[9px] font-black uppercase tracking-[0.25em] mb-2">
                      <Trophy size={12} /> {sumula.campeonato}
                    </div>
                    <h3 className="text-xl font-black uppercase italic tracking-tighter leading-tight mb-5">{sumula.confronto}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setAberta(sumula)}
                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-black text-white hover:bg-fem-red rounded-xl font-black uppercase text-[10px] tracking-widest transition-colors"
                      >
                        <FileText size={14} /> Ver súmula
                      </button>
                      <a
                        href={`${sumula.image_url}?download=`}
                        aria-label="Baixar súmula"
                        className="w-12 flex items-center justify-center bg-[#F4F4F5] hover:bg-black hover:text-white rounded-xl transition-colors"
                      >
                        <Download size={16} />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* VAZIO */}
          {!loading && !erro && sumulasFiltradas.length === 0 && (
            <div className="text-center py-24 bg-white border-2 border-dashed border-black/10 rounded-3xl">
              <FileText className="mx-auto text-gray-300 mb-4" size={40} />
              <p className="text-sm font-black uppercase tracking-[0.2em] text-gray-400">
                {temFiltro ? 'Nenhuma súmula com esses filtros' : 'Nenhuma súmula publicada ainda'}
              </p>
            </div>
          )}
        </div>
      </section>

      <SiteFooter />

      {/* VISUALIZAÇÃO AMPLIADA */}
      {aberta && (
        <div
          className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex flex-col"
          onClick={() => setAberta(null)}
          data-lenis-prevent
        >
          <div className="flex items-center justify-between gap-4 p-4 md:p-6 text-white" onClick={(e) => e.stopPropagation()}>
            <div className="min-w-0">
              <p className="text-fem-red text-[9px] font-black uppercase tracking-[0.25em]">{aberta.campeonato} · {dataBR(aberta.created_at)}</p>
              <h3 className="text-lg md:text-2xl font-black uppercase italic tracking-tighter truncate">{aberta.confronto}</h3>
            </div>
            <div className="flex gap-2 shrink-0">
              <a href={`${aberta.image_url}?download=`} className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white hover:text-black transition-colors" aria-label="Baixar">
                <Download size={18} />
              </a>
              <button onClick={() => setAberta(null)} className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-fem-red transition-colors" aria-label="Fechar">
                <X size={20} />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-auto flex items-start md:items-center justify-center p-4 pt-0">
            <img
              src={aberta.image_url}
              alt={`Súmula ${aberta.confronto}`}
              onClick={(e) => e.stopPropagation()}
              className="max-w-full md:max-h-[85vh] rounded-xl shadow-2xl"
            />
          </div>
        </div>
      )}

      <style jsx global>{`
        input[type="date"]::-webkit-calendar-picker-indicator { opacity: 0.4; cursor: pointer; }
      `}</style>
    </main>
  )
}
