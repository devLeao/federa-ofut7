'use client'
import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { formatRegistro } from '@/lib/atletas'
import { Search, UserPlus, AlertTriangle, RotateCcw, Users, ArrowUpDown } from 'lucide-react'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'
import PageHero, { HeroStat } from '@/components/PageHero'

type AtletaPublico = {
  registro: number
  nome: string
  foto_url: string
  created_at: string
}

type Ordem = 'registro' | 'nome' | 'recentes'

const ordens: { value: Ordem; label: string }[] = [
  { value: 'registro', label: 'Nº de registro' },
  { value: 'nome', label: 'Nome (A-Z)' },
  { value: 'recentes', label: 'Mais recentes' },
]

export default function PaginaAtletas() {
  const [atletas, setAtletas] = useState<AtletaPublico[]>([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState('')
  const [busca, setBusca] = useState('')
  const [ordem, setOrdem] = useState<Ordem>('registro')

  const fetchAtletas = useCallback(() => {
    supabase
      .from('atletas_publico')
      .select('registro, nome, foto_url, created_at')
      .order('registro', { ascending: true })
      .then(({ data, error }) => {
        if (error) setErro(error.message)
        else setAtletas(data || [])
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    fetchAtletas()
  }, [fetchAtletas])

  function tentarNovamente() {
    setLoading(true)
    setErro('')
    fetchAtletas()
  }

  const agora = new Date()
  const novosNoMes = atletas.filter((a) => {
    const d = new Date(a.created_at)
    return d.getMonth() === agora.getMonth() && d.getFullYear() === agora.getFullYear()
  }).length

  const termo = busca.trim().toLowerCase().replace(/^#/, '')
  const atletasFiltrados = atletas
    .filter((a) => !termo || a.nome.toLowerCase().includes(termo) || formatRegistro(a.registro).includes(termo))
    .sort((a, b) => {
      if (ordem === 'nome') return a.nome.localeCompare(b.nome, 'pt-BR')
      if (ordem === 'recentes') return b.created_at.localeCompare(a.created_at)
      return a.registro - b.registro
    })

  return (
    <main className="min-h-screen bg-[#F4F4F5] text-black flex flex-col">
      <SiteNav />

      <PageHero
        breadcrumb="Atletas"
        eyebrow="Registro Oficial"
        title="Atletas"
        highlight="Inscritos"
        description="Atletas com registro ativo na Federação Mineira de Futebol 7 Society. Ainda não tem sua carteirinha? Faça o cadastro online."
      >
        <HeroStat value={loading ? '—' : atletas.length} label="Registrados" />
        <HeroStat value={loading ? '—' : `+${novosNoMes}`} label="Neste mês" />
      </PageHero>

      <section className="flex-1 px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          {/* BUSCA + ORDEM + CTA */}
          <div className="-mt-12 relative z-20 bg-white border border-black/5 rounded-3xl shadow-xl shadow-black/5 p-3 md:p-4 flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Buscar por nome ou nº de registro..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="w-full bg-[#F4F4F5] border border-transparent focus:border-fem-red/40 focus:bg-white p-4 pl-14 rounded-2xl outline-none transition-all font-semibold text-sm placeholder:text-gray-400"
              />
            </div>
            <label className="relative flex items-center bg-[#F4F4F5] rounded-2xl px-5">
              <ArrowUpDown className="text-fem-red mr-3 shrink-0" size={16} />
              <select
                value={ordem}
                onChange={(e) => setOrdem(e.target.value as Ordem)}
                className="bg-transparent outline-none py-4 text-sm font-semibold text-gray-700 cursor-pointer pr-2"
              >
                {ordens.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </label>
            <Link
              href="/cadastro-atleta"
              className="flex items-center justify-center gap-3 px-7 py-4 bg-fem-red hover:bg-black text-white rounded-2xl transition-colors shadow-lg shadow-fem-red/20"
            >
              <UserPlus size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">Cadastrar atleta</span>
            </Link>
          </div>

          {!loading && !erro && (
            <p className="mt-10 mb-6 text-[11px] font-black uppercase tracking-[0.25em] text-gray-500">
              {atletasFiltrados.length} {atletasFiltrados.length === 1 ? 'atleta' : 'atletas'}
              {termo && ' encontrados'}
            </p>
          )}

          {/* ERRO */}
          {erro && (
            <div className="mt-10 bg-white border border-red-200 rounded-3xl p-10 text-center">
              <AlertTriangle className="mx-auto text-fem-red mb-4" size={36} />
              <h3 className="text-lg font-black uppercase italic tracking-tight mb-2">Não foi possível carregar os atletas</h3>
              <p className="text-sm text-gray-500 mb-6">{erro}</p>
              <button onClick={tentarNovamente} className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-fem-red transition-colors">
                <RotateCcw size={14} /> Tentar novamente
              </button>
            </div>
          )}

          {/* CARREGANDO */}
          {loading && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-10">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden border border-black/5 animate-pulse">
                  <div className="aspect-[3/4] bg-gray-200" />
                  <div className="p-4 space-y-2">
                    <div className="h-4 w-3/4 bg-gray-200 rounded" />
                    <div className="h-3 w-1/2 bg-gray-200 rounded" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* LISTA */}
          {!loading && !erro && atletasFiltrados.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
              {atletasFiltrados.map((atleta) => (
                <article key={atleta.registro} className="group bg-white rounded-2xl overflow-hidden border border-black/5 shadow-sm hover:shadow-2xl hover:shadow-black/10 hover:-translate-y-1 transition-all duration-500">
                  <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                    <img
                      src={atleta.foto_url}
                      alt={atleta.nome}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute bottom-3 left-3 text-white font-black text-[11px] tracking-[0.2em]">
                      #{formatRegistro(atleta.registro)}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm md:text-base font-black uppercase italic leading-tight tracking-tight line-clamp-2 min-h-[2.5em]">
                      {atleta.nome}
                    </h3>
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-2">
                      Desde {new Date(atleta.created_at).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className="bg-fem-red text-white text-center py-1.5 text-[9px] font-black uppercase tracking-[0.4em]">
                    Atleta
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* VAZIO */}
          {!loading && !erro && atletasFiltrados.length === 0 && (
            <div className="text-center py-24 bg-white border-2 border-dashed border-black/10 rounded-3xl">
              <Users className="mx-auto text-gray-300 mb-4" size={40} />
              <p className="text-sm font-black uppercase tracking-[0.2em] text-gray-400 mb-6">
                {termo ? 'Nenhum atleta encontrado' : 'Nenhum atleta registrado ainda'}
              </p>
              {!termo && (
                <Link href="/cadastro-atleta" className="inline-flex items-center gap-2 px-6 py-3 bg-fem-red text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-colors">
                  <UserPlus size={14} /> Seja o primeiro
                </Link>
              )}
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
