'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { AtletaCarteirinha, formatCpf, formatRegistro, isValidCpf, onlyDigits } from '@/lib/atletas'
import Carteirinha, { gerarPdfCarteirinha } from '@/components/Carteirinha'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'
import PageHero from '@/components/PageHero'
import { Camera, CheckCircle2, Download, IdCard, Loader2, RotateCcw, Users, AlertTriangle, Printer } from 'lucide-react'

const MAX_FOTO = 5 * 1024 * 1024
const labelClass = 'text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1'
const inputClass =
  'w-full bg-[#F4F4F5] border border-transparent focus:border-fem-red/40 focus:bg-white p-4 rounded-2xl outline-none transition-all text-sm font-semibold placeholder:text-gray-400 disabled:opacity-60'

const passos = [
  'Preencha nome, RG, CPF e data de nascimento',
  'Envie uma foto de rosto, de frente e com fundo claro',
  'Gere o cadastro e baixe sua carteirinha oficial',
]

export default function CadastroAtleta() {
  const [nome, setNome] = useState('')
  const [rg, setRg] = useState('')
  const [cpf, setCpf] = useState('')
  const [dataNascimento, setDataNascimento] = useState('')
  const [foto, setFoto] = useState<File | null>(null)
  const [fotoPreview, setFotoPreview] = useState<string | null>(null)
  const [registro, setRegistro] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState('')
  const [lado, setLado] = useState<'frente' | 'verso'>('frente')
  const [gerandoPdf, setGerandoPdf] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // yyyy-mm-dd no fuso local
  const hoje = new Date().toLocaleDateString('sv-SE')
  const concluido = registro !== null

  const atleta: AtletaCarteirinha = useMemo(
    () => ({ nome, rg, cpf, dataNascimento, registro }),
    [nome, rg, cpf, dataNascimento, registro],
  )

  // Libera a URL temporária da foto anterior
  useEffect(() => {
    return () => {
      if (fotoPreview) URL.revokeObjectURL(fotoPreview)
    }
  }, [fotoPreview])

  function handleFoto(file: File | undefined) {
    setErro('')
    if (!file) return
    if (!file.type.startsWith('image/')) return setErro('A foto precisa ser uma imagem (JPG, PNG ou WEBP).')
    if (file.size > MAX_FOTO) return setErro('A foto deve ter no máximo 5MB.')
    setFoto(file)
    setFotoPreview(URL.createObjectURL(file))
  }

  function validar() {
    if (nome.trim().split(/\s+/).length < 2) return 'Informe o nome completo do atleta.'
    if (rg.trim().length < 4) return 'Informe um RG válido.'
    if (!isValidCpf(cpf)) return 'CPF inválido. Confira os números.'
    if (!dataNascimento || dataNascimento > hoje) return 'Informe uma data de nascimento válida.'
    if (!foto) return 'A foto do atleta é obrigatória para concluir o cadastro.'
    return ''
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const msg = validar()
    if (msg) return setErro(msg)
    setErro('')
    setLoading(true)

    try {
      const ext = foto!.name.split('.').pop()?.toLowerCase() || 'jpg'
      const fileName = `${onlyDigits(cpf)}-${Date.now()}.${ext}`
      const { error: uploadError } = await supabase.storage
        .from('atletas')
        .upload(fileName, foto!, { contentType: foto!.type })
      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage.from('atletas').getPublicUrl(fileName)

      const { data, error } = await supabase.rpc('cadastrar_atleta', {
        p_nome: nome,
        p_rg: rg,
        p_cpf: onlyDigits(cpf),
        p_data_nascimento: dataNascimento,
        p_foto_url: publicUrl,
      })
      if (error) throw error

      setRegistro(data as number)
    } catch (error) {
      const message = (error as { message?: string })?.message || ''
      setErro(
        message.includes('CPF_JA_CADASTRADO')
          ? 'Este CPF já possui cadastro na federação.'
          : 'Erro ao cadastrar: ' + (message || 'tente novamente.'),
      )
    } finally {
      setLoading(false)
    }
  }

  async function handlePdf() {
    setGerandoPdf(true)
    try {
      await gerarPdfCarteirinha(atleta, fotoPreview)
    } catch (error) {
      setErro('Erro ao gerar o PDF: ' + (error as Error).message)
    } finally {
      setGerandoPdf(false)
    }
  }

  function handleDownload() {
    canvasRef.current?.toBlob((blob) => {
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `carteirinha-fem7soc-${formatRegistro(registro)}.png`
      a.click()
      URL.revokeObjectURL(url)
    }, 'image/png')
  }

  function novoCadastro() {
    setNome(''); setRg(''); setCpf(''); setDataNascimento('')
    setFoto(null); setFotoPreview(null); setRegistro(null); setErro('')
  }

  return (
    <main className="min-h-screen bg-[#F4F4F5] text-black flex flex-col">
      <SiteNav />

      <PageHero
        breadcrumb="Cadastro de Atleta"
        eyebrow="Registro Oficial"
        title="Cadastro de"
        highlight="Atleta"
        description="Faça seu registro na FEM7SOC em poucos minutos. O número de registro é gerado automaticamente e sua carteirinha fica pronta na hora."
      >
        <Link
          href="/atletas"
          className="flex items-center gap-3 px-6 py-4 bg-white/[0.04] border border-white/10 rounded-2xl hover:border-fem-red transition-all text-white/70 hover:text-white"
        >
          <Users size={16} />
          <span className="text-[10px] font-black uppercase tracking-widest">Ver atletas inscritos</span>
        </Link>
      </PageHero>

      <section className="flex-1 px-6 pb-24">
        <div className="max-w-7xl mx-auto -mt-12 relative z-20 grid lg:grid-cols-[1fr_1.1fr] gap-8 items-start">
          {/* FORMULÁRIO */}
          <form onSubmit={handleSubmit} className="bg-white border border-black/5 p-6 md:p-10 rounded-3xl shadow-xl shadow-black/5 space-y-6">
            <div>
              <h2 className="text-2xl font-black uppercase italic tracking-tighter">Dados do atleta</h2>
              <p className="text-xs text-gray-500 mt-1">Todos os campos são obrigatórios.</p>
            </div>

            <div className="flex flex-col gap-2">
              <label className={labelClass}>Nome completo</label>
              <input disabled={concluido} value={nome} onChange={(e) => setNome(e.target.value)} maxLength={60} type="text" placeholder="Ex: Luiz Gonzaga S. Neto" className={inputClass} />
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className={labelClass}>RG</label>
                <input disabled={concluido} value={rg} onChange={(e) => setRg(e.target.value.toUpperCase())} maxLength={20} type="text" placeholder="Ex: M-3.360.102" className={inputClass} />
              </div>
              <div className="flex flex-col gap-2">
                <label className={labelClass}>CPF</label>
                <input disabled={concluido} value={cpf} onChange={(e) => setCpf(formatCpf(e.target.value))} inputMode="numeric" type="text" placeholder="000.000.000-00" className={inputClass} />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className={labelClass}>Data de nascimento</label>
                <input disabled={concluido} value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} max={hoje} type="date" className={inputClass} />
              </div>
              <div className="flex flex-col gap-2">
                <label className={labelClass}>Registro</label>
                <div className="w-full border-2 border-dashed border-black/10 p-[14px] rounded-2xl text-sm font-black tracking-[0.3em] text-gray-400">
                  {concluido ? <span className="text-fem-red">{formatRegistro(registro)}</span> : 'AUTOMÁTICO'}
                </div>
              </div>
            </div>

            {/* FOTO OBRIGATÓRIA */}
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Foto do atleta</label>
              <div className={`relative border-2 border-dashed rounded-2xl p-5 transition-all flex items-center gap-5 ${foto ? 'border-fem-red/40 bg-fem-red/[0.03]' : 'border-black/10 hover:border-fem-red/40 hover:bg-fem-red/[0.02]'}`}>
                <div className="w-20 h-24 shrink-0 rounded-xl overflow-hidden bg-[#F4F4F5] flex items-center justify-center text-fem-red">
                  {fotoPreview ? <img src={fotoPreview} alt="Foto do atleta" className="w-full h-full object-cover" /> : <Camera size={26} />}
                </div>
                <div>
                  <h4 className="text-base font-black uppercase italic">{foto ? 'Foto selecionada' : 'Enviar foto *'}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed mt-1">
                    {foto ? (concluido ? foto.name : 'Clique para trocar a foto') : 'Rosto de frente, fundo claro. JPG, PNG ou WEBP, até 5MB.'}
                  </p>
                </div>
                {!concluido && (
                  <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => handleFoto(e.target.files?.[0])} className="absolute inset-0 opacity-0 cursor-pointer" />
                )}
              </div>
            </div>

            {erro && (
              <p className="flex items-start gap-3 text-sm font-semibold text-red-700 bg-red-50 border border-red-200 rounded-2xl p-4">
                <AlertTriangle size={18} className="shrink-0 mt-0.5" /> {erro}
              </p>
            )}

            {concluido ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-green-700 bg-green-50 border border-green-200 rounded-2xl p-4 text-sm font-bold">
                  <CheckCircle2 size={18} /> Cadastro concluído! Registro nº {formatRegistro(registro)}
                </div>
                <button type="button" onClick={handlePdf} disabled={gerandoPdf} className="w-full py-5 bg-fem-red text-white font-black uppercase tracking-[0.2em] hover:bg-black transition-all rounded-2xl shadow-xl shadow-fem-red/20 text-[11px] flex items-center justify-center gap-3 disabled:opacity-60">
                  {gerandoPdf ? <Loader2 className="animate-spin" size={18} /> : <>Baixar PDF para impressão <Printer size={18} /></>}
                </button>
                <p className="text-[11px] text-gray-500 text-center -mt-1">Frente e verso no tamanho real do cartão (85,6 × 54 mm), pronto para a gráfica.</p>
                <button type="button" onClick={handleDownload} className="w-full py-4 bg-black text-white hover:bg-fem-red font-black uppercase tracking-[0.2em] transition-all rounded-2xl text-[10px] flex items-center justify-center gap-3">
                  <Download size={14} /> Baixar imagem da frente (PNG)
                </button>
                <button type="button" onClick={novoCadastro} className="w-full py-4 bg-[#F4F4F5] text-gray-600 hover:text-black font-black uppercase tracking-[0.2em] transition-all rounded-2xl text-[10px] flex items-center justify-center gap-3">
                  <RotateCcw size={14} /> Novo cadastro
                </button>
              </div>
            ) : (
              <button
                disabled={loading || !foto}
                type="submit"
                className="w-full py-5 bg-fem-red text-white font-black uppercase tracking-[0.2em] hover:bg-black transition-all rounded-2xl shadow-xl shadow-fem-red/20 text-[11px] flex items-center justify-center gap-3 group disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-fem-red"
              >
                {loading ? <Loader2 className="animate-spin" /> : (
                  <>Gerar cadastro oficial <IdCard size={18} className="group-hover:rotate-12 transition-transform" /></>
                )}
              </button>
            )}
          </form>

          {/* PRÉVIA DA CARTEIRINHA */}
          <div className="lg:sticky lg:top-28 space-y-6">
            <div className="bg-[#0A0A0A] rounded-3xl p-6 md:p-8 shadow-xl shadow-black/10">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3 text-white">
                  <IdCard className="text-fem-red" size={20} />
                  <h2 className="text-sm font-black uppercase tracking-[0.2em]">{concluido ? 'Sua carteirinha' : 'Pré-visualização'}</h2>
                </div>
                <div className="flex bg-white/5 border border-white/10 rounded-full p-1">
                  {(['frente', 'verso'] as const).map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => setLado(l)}
                      className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-colors ${lado === l ? 'bg-fem-red text-white' : 'text-white/50 hover:text-white'}`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
              {/* A frente fica sempre montada: o PNG é gerado a partir dela */}
              <div className={lado === 'frente' ? '' : 'hidden'}>
                <Carteirinha atleta={atleta} fotoUrl={fotoPreview} canvasRef={canvasRef} />
              </div>
              {lado === 'verso' && <Carteirinha atleta={atleta} fotoUrl={null} lado="verso" />}
              {!concluido && <p className="text-[9px] font-black uppercase tracking-widest text-white/30 mt-4">Atualiza enquanto você digita</p>}
            </div>

            <ol className="bg-white border border-black/5 rounded-3xl p-6 md:p-8 space-y-4">
              {passos.map((passo, i) => (
                <li key={passo} className="flex items-center gap-4">
                  <span className="w-8 h-8 shrink-0 rounded-full bg-fem-red/10 text-fem-red flex items-center justify-center text-xs font-black">{i + 1}</span>
                  <span className="text-sm font-semibold text-gray-700">{passo}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <SiteFooter />

      <style jsx global>{`
        input[type="date"]::-webkit-calendar-picker-indicator { opacity: 0.4; cursor: pointer; }
      `}</style>
    </main>
  )
}
