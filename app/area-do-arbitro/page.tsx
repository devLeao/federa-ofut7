'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Shield, Lock, ArrowRight, User, ArrowLeft, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function LoginArbitro() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Autenticação real com o Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        alert("Erro no acesso: " + error.message)
      } else if (data.user) {
        // ALINHAMENTO: Se o árbitro logar, ele vai para o Dashboard enviar súmulas
        router.push('/area-do-arbitro/dashboard')
      }
    } catch (err) {
      alert("Ocorreu um erro inesperado.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center px-6 relative overflow-hidden">
      
      {/* Elementos de fundo para profundidade */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-fem-red/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-fem-red/5 blur-[120px] rounded-full" />
      </div>

      {/* Botão Voltar para a Home */}
      <Link href="/" className="absolute top-10 left-6 md:left-12 text-gray-500 hover:text-white transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-widest group">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Voltar ao Portal
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10"
      >
        {/* Logo e Título */}
        <div className="text-center mb-10">
          <Image 
            src="/logo.png" 
            alt="FEM7SOC" 
            width={80} 
            height={80} 
            className="mx-auto mb-6 drop-shadow-[0_0_20px_rgba(179,19,18,0.2)]"
          />
          <h1 className="text-3xl font-black uppercase italic tracking-tighter">
            Área do <span className="text-fem-red">Árbitro</span>
          </h1>
          <p className="text-gray-500 text-[10px] uppercase tracking-[0.3em] font-bold mt-2">
            Acesso Restrito • Oficiais FEM7SOC
          </p>
        </div>

        {/* Formulário de Login */}
        <div className="bg-[#0A0A0A] border border-white/5 p-8 md:p-10 rounded-3xl shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest ml-1">E-mail de Acesso</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                <input 
                  type="email" 
                  required
                  placeholder="seu@email.com"
                  className="w-full bg-white/[0.03] border border-white/10 p-4 pl-12 rounded-xl focus:border-fem-red outline-none transition-all text-sm font-bold uppercase tracking-wider placeholder:text-gray-700"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest ml-1">Senha de Acesso</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full bg-white/[0.03] border border-white/10 p-4 pl-12 rounded-xl focus:border-fem-red outline-none transition-all text-sm font-bold tracking-widest placeholder:text-gray-700"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black py-4 rounded-xl font-black uppercase text-xs tracking-[0.2em] hover:bg-fem-red hover:text-white transition-all shadow-lg shadow-white/5 flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <>
                  Autenticar Acesso <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <p className="text-gray-600 text-[10px] uppercase tracking-widest">
              Esqueceu sua senha? <br />
              <span className="text-fem-red font-bold cursor-pointer hover:underline">Contate o suporte administrativo</span>
            </p>
          </div>
        </div>

        {/* Selo de Segurança */}
        <div className="mt-10 flex items-center justify-center gap-4 text-gray-600">
          <Shield size={20} className="opacity-20" />
          <span className="text-[9px] uppercase tracking-[0.4em] font-bold">Ambiente Criptografado</span>
        </div>
      </motion.div>
    </main>
  )
}