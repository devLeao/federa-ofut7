'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { UserPlus, ShieldCheck, Mail, Lock, Loader2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function AreaAdmin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nome, setNome] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleCreateUser(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    // O Supabase tem uma função específica para criar usuários sem deslogar o admin
    // Mas para o Plano Gratuito, a forma mais fácil é via Edge Functions ou 
    // um convite por e-mail. Vamos usar a lógica de convite/cadastro:
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: nome,
          role: 'arbitro', // Define que ele é um árbitro
        }
      }
    })

    if (error) {
      alert("Erro ao criar acesso: " + error.message)
    } else {
      alert(`Acesso criado com sucesso para ${nome}!`)
      setEmail(''); setPassword(''); setNome('')
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 px-6">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-gray-500 hover:text-fem-red transition-all flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest mb-12">
          <ArrowLeft size={14} /> Painel Principal
        </Link>

        <div className="bg-[#0A0A0A] border border-white/5 p-10 rounded-[2.5rem] shadow-2xl">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 bg-fem-red/10 rounded-2xl flex items-center justify-center text-fem-red">
              <UserPlus size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-black uppercase italic tracking-tighter">Gestão de Acessos</h1>
              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Cadastrar novo árbitro ou cliente</p>
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password" 
                className="w-full bg-white/[0.03] border border-white/10 p-4 rounded-2xl focus:border-fem-red outline-none transition-all font-bold text-sm"
                placeholder="••••••••"
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
      </div>
    </main>
  )
}