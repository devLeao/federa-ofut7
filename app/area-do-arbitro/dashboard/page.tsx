'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Camera, LogOut, Loader2, ArrowLeft, LayoutDashboard, History, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function DashboardArbitro() {
  const [loading, setLoading] = useState(false)
  const [campeonato, setCampeonato] = useState('')
  const [confronto, setConfronto] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const router = useRouter()

  // Função para deslogar
  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/area-do-arbitro')
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault()
    if (!file || !campeonato || !confronto) return alert("Preencha todos os campos!")
    setLoading(true)
    try {
      const fileName = `${Date.now()}-${file.name}`
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('sumulas')
        .upload(fileName, file)
      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage.from('sumulas').getPublicUrl(fileName)

      const { error: dbError } = await supabase
        .from('sumulas')
        .insert([{ campeonato, confronto, image_url: publicUrl }])
      if (dbError) throw dbError

      alert("Súmula enviada com sucesso para a FEM7SOC!")
      setFile(null); setCampeonato(''); setConfronto('')
    } catch (error: any) {
      alert("Erro no processo: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 px-6 pb-20">
      <div className="max-w-6xl mx-auto">
        
        {/* BARRA SUPERIOR DE NAVEGAÇÃO */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="flex flex-col gap-4">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-gray-500 hover:text-fem-red transition-all group"
            >
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-fem-red transition-colors">
                <ArrowLeft size={14} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Voltar ao Início</span>
            </Link>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-fem-red rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(179,19,18,0.3)]">
                <LayoutDashboard size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-black uppercase italic tracking-tighter leading-none">Painel do <span className="text-fem-red">Árbitro</span></h1>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mt-1">Gestão de Súmulas Oficiais</p>
              </div>
            </div>
          </div>

          <button 
            onClick={handleSignOut}
            className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-red-500/10 hover:border-red-500/50 transition-all text-gray-400 hover:text-red-500"
          >
            <span className="text-[10px] font-black uppercase tracking-widest">Encerrar Sessão</span>
            <LogOut size={16} />
          </button>
        </div>

        {/* CONTEÚDO PRINCIPAL */}
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center gap-3">
              <Camera className="text-fem-red" size={20} />
              <h2 className="text-sm font-black uppercase tracking-[0.2em]">Enviar Nova Súmula</h2>
            </div>
            
            <form onSubmit={handleUpload} className="bg-[#0A0A0A] border border-white/5 p-8 md:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1">Campeonato</label>
                  <input 
                    value={campeonato}
                    onChange={(e) => setCampeonato(e.target.value)}
                    type="text" 
                    placeholder="Ex: Copa Norte" 
                    className="w-full bg-white/[0.03] border border-white/10 p-5 rounded-2xl focus:border-fem-red outline-none transition-all text-sm font-bold uppercase tracking-wider" 
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1">Confronto</label>
                  <input 
                    value={confronto}
                    onChange={(e) => setConfronto(e.target.value)}
                    type="text" 
                    placeholder="Time A x Time B" 
                    className="w-full bg-white/[0.03] border border-white/10 p-5 rounded-2xl focus:border-fem-red outline-none transition-all text-sm font-bold uppercase tracking-wider" 
                  />
                </div>
              </div>

              <div className="relative group border-2 border-dashed rounded-3xl p-12 border-white/5 bg-white/[0.01] hover:border-fem-red/30 transition-all flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-fem-red/5 rounded-full flex items-center justify-center text-fem-red mb-6 group-hover:scale-110 transition-transform">
                  <Camera size={32} />
                </div>
                <h4 className="text-xl font-black uppercase italic text-white mb-2">
                  {file ? file.name : "Fotografar Súmula"}
                </h4>
                <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest">JPG, PNG ou PDF (Máx. 5MB)</p>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="absolute inset-0 opacity-0 cursor-pointer" 
                />
              </div>

              <button 
                disabled={loading}
                type="submit"
                className="w-full mt-10 py-6 bg-fem-red text-white font-black uppercase tracking-[0.2em] hover:bg-red-700 transition-all rounded-2xl shadow-xl shadow-fem-red/20 text-[11px] flex items-center justify-center gap-4 group"
              >
                {loading ? <Loader2 className="animate-spin" /> : (
                  <>Confirmar Envio Oficial <CheckCircle2 size={18} className="group-hover:rotate-12 transition-transform" /></>
                )}
              </button>
            </form>
          </div>
          
          {/* BARRA LATERAL (Informativo ou Histórico) */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <History className="text-fem-red" size={20} />
              <h2 className="text-sm font-black uppercase tracking-[0.2em]">Dicas de Envio</h2>
            </div>
            <div className="bg-[#0A0A0A] border border-white/5 p-8 rounded-[2.5rem]">
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-fem-red mt-1 shrink-0" />
                  <p className="text-[11px] text-gray-400 font-medium leading-relaxed uppercase">Certifique-se que a imagem esteja nítida e com boa iluminação.</p>
                </li>
                <li className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-fem-red mt-1 shrink-0" />
                  <p className="text-[11px] text-gray-400 font-medium leading-relaxed uppercase">O nome das equipes deve bater com a tabela oficial.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}