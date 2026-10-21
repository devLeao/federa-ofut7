'use client'
import { useCallback, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { getPerfilLogado, Perfil } from '@/lib/perfil'
import { UserPlus, Loader2, ArrowLeft, LogOut, Users, Power } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AreaAdmin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nome, setNome] = useState('')
  const [loading, setLoading] = useState(false)
  const [admin, setAdmin] = useState<Perfil | null>(null)
  const [arbitros, setArbitros] = useState<Perfil[]>([])
  const router = useRouter()

  const fetchArbitros = useCallback(async () => {
    const { data } = await supabase
      .from('perfis')
      .select('*')
      .eq('role', 'arbitro')
      .order('nome')
    setArbitros((data as Perfil[]) || [])
  }, [])

  // Só admin ativo entra aqui
  useEffect(() => {
    getPerfilLogado().then((p) => {
      if (!p) return router.replace('/area-do-arbitro')
      if (p.role !== 'admin') return router.replace('/area-do-arbitro/dashboard')
      setAdmin(p)
      fetchArbitros()
    })
  }, [router, fetchArbitros])

  async function handleCreateUser(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    // A criação roda no servidor (/api/admin/arbitros), que confere se
    // quem chama é admin antes de usar a chave service_role.
    const { data: { session } } = await supabase.auth.getSession()
    const res = await fetch('/api/admin/arbitros', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.access_token}`,
      },
      body: JSON.stringify({ nome, email, password }),
    })
    const result = await res.json()

    if (!res.ok) {
      alert("Erro ao criar acesso: " + result.error)
    } else {
      alert(`Acesso criado com sucesso para ${nome}!`)
      setEmail(''); setPassword(''); setNome('')
      fetchArbitros()
    }
    setLoading(false)
  }

  async function toggleAtivo(arbitro: Perfil) {
    const { error } = await supabase
      .from('perfis')
      .update({ ativo: !arbitro.ativo })
      .eq('id', arbitro.id)
    if (error) return alert("Erro ao atualizar: " + error.message)
    fetchArbitros()
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/area-do-arbitro')
  }

  if (!admin) {
    return (
      <main className="min-h-screen bg-[#050505] flex items-center justify-center">
        <Loader2 className="animate-spin text-fem-red" size={40} />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 px-6 pb-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-12">
          <Link href="/area-do-arbitro/dashboard" className="text-gray-500 hover:text-fem-red transition-all flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
            <ArrowLeft size={14} /> Painel de Súmulas
          </Link>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-red-500/10 hover:border-red-500/50 transition-all text-gray-400 hover:text-red-500"
          >
            <span className="text-[10px] font-black uppercase tracking-widest">Encerrar Sessão</span>
            <LogOut size={16} />
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="bg-[#0A0A0A] border border-white/5 p-10 rounded-[2.5rem] shadow-2xl">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 bg-fem-red/10 rounded-2xl flex items-center justify-center text-fem-red">
                <UserPlus size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-black uppercase italic tracking-tighter">Gestão de Acessos</h1>
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Cadastrar novo árbitro</p>
              </div>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Nome Completo</label>
                <input
                  required
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  type="text"
                  className="w-full bg-white/[0.03] border border-white/10 p-4 rounded-2xl focus:border-fem-red outline-none transition-all font-bold text-sm"
                  placeholder="Ex: Ricardo Oliveira"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">E-mail de Acesso</label>
                <input
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="w-full bg-white/[0.03] border border-white/10 p-4 rounded-2xl focus:border-fem-red outline-none transition-all font-bold text-sm"
                  placeholder="juiz@fem7soc.com.br"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Senha Temporária</label>
                <input
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="w-full bg-white/[0.03] border border-white/10 p-4 rounded-2xl focus:border-fem-red outline-none transition-all font-bold text-sm"
                  placeholder="Mínimo 6 caracteres"
                />
              </div>

              <button
                disabled={loading}
                className="w-full py-5 bg-fem-red text-white font-black uppercase tracking-widest hover:bg-red-700 transition-all rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-fem-red/20"
              >
                {loading ? <Loader2 className="animate-spin" /> : "Gerar Acesso Oficial"}
              </button>
            </form>
          </div>

          {/* LISTA DE ÁRBITROS */}
          <div className="bg-[#0A0A0A] border border-white/5 p-10 rounded-[2.5rem] shadow-2xl">
            <div className="flex items-center gap-3 mb-8">
              <Users className="text-fem-red" size={20} />
              <h2 className="text-sm font-black uppercase tracking-[0.2em]">Árbitros Cadastrados ({arbitros.length})</h2>
            </div>

            {arbitros.length === 0 ? (
              <p className="text-gray-700 font-black uppercase text-[10px] tracking-[0.3em] py-10 text-center">Nenhum árbitro cadastrado</p>
            ) : (
              <ul className="space-y-3">
                {arbitros.map((arbitro) => (
                  <li key={arbitro.id} className="flex items-center justify-between gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                    <div className="min-w-0">
                      <p className={`font-black uppercase italic text-sm truncate ${arbitro.ativo ? 'text-white' : 'text-gray-600 line-through'}`}>{arbitro.nome}</p>
                      <p className="text-[10px] text-gray-500 font-bold tracking-wider truncate">{arbitro.email}</p>
                    </div>
                    <button
                      onClick={() => toggleAtivo(arbitro)}
                      title={arbitro.ativo ? 'Desativar acesso' : 'Reativar acesso'}
                      className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all ${
                        arbitro.ativo
                          ? 'border-green-500/30 text-green-400 hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400'
                          : 'border-white/10 text-gray-500 hover:border-green-500/50 hover:text-green-400'
                      }`}
                    >
                      <Power size={12} /> {arbitro.ativo ? 'Ativo' : 'Inativo'}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
