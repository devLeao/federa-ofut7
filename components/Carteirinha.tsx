'use client'
import { useEffect, useRef, type RefObject } from 'react'
import { AtletaCarteirinha, formatCpf, formatData, formatRegistro } from '@/lib/atletas'

// Tamanho real do arquivo gerado (proporção de cartão de crédito ~1.58)
export const CARD_W = 1200
export const CARD_H = 760

const RED = '#C4161C'
const INK = '#1a1a1a'

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.roundRect(x, y, w, h, r)
}

// Desenha a imagem preenchendo a área (igual object-fit: cover)
function drawCover(ctx: CanvasRenderingContext2D, img: HTMLImageElement, x: number, y: number, w: number, h: number) {
  const scale = Math.max(w / img.width, h / img.height)
  const sw = w / scale
  const sh = h / scale
  ctx.drawImage(img, (img.width - sw) / 2, (img.height - sh) / 2, sw, sh, x, y, w, h)
}

// Diminui a fonte até o texto caber na largura disponível
function fitFont(ctx: CanvasRenderingContext2D, text: string, maxWidth: number, size: number, min: number, family: string) {
  let s = size
  ctx.font = `700 ${s}px ${family}`
  while (s > min && ctx.measureText(text).width > maxWidth) {
    s -= 1
    ctx.font = `700 ${s}px ${family}`
  }
}

function drawField(
  ctx: CanvasRenderingContext2D,
  label: string,
  value: string,
  y: number,
  labelX: number,
  lineStart: number,
  lineEnd: number,
  family: string,
) {
  ctx.fillStyle = INK
  ctx.font = `500 30px ${family}`
  ctx.textBaseline = 'alphabetic'
  ctx.fillText(label, labelX, y)

  ctx.strokeStyle = '#555'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(lineStart, y + 8)
  ctx.lineTo(lineEnd, y + 8)
  ctx.stroke()

  if (value) {
    fitFont(ctx, value, lineEnd - lineStart - 20, 42, 24, family)
    ctx.fillText(value, lineStart + 14, y)
  }
}

// Quebra o texto em linhas que caibam na largura
function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const linhas: string[] = []
  let atual = ''
  for (const palavra of text.split(' ')) {
    const teste = atual ? `${atual} ${palavra}` : palavra
    if (ctx.measureText(teste).width > maxWidth && atual) {
      linhas.push(atual)
      atual = palavra
    } else {
      atual = teste
    }
  }
  if (atual) linhas.push(atual)
  return linhas
}

// Fundo do cartão. Cantos arredondados só na tela: para impressão a
// arte vai reta e a gráfica corta o PVC.
function prepararFundo(ctx: CanvasRenderingContext2D, arredondado: boolean) {
  ctx.clearRect(0, 0, CARD_W, CARD_H)
  ctx.save()
  if (arredondado) {
    roundRect(ctx, 0, 0, CARD_W, CARD_H, 44)
    ctx.clip()
  }
  ctx.fillStyle = '#fbfbfb'
  ctx.fillRect(0, 0, CARD_W, CARD_H)
}

export async function drawCarteirinha(
  canvas: HTMLCanvasElement,
  atleta: AtletaCarteirinha,
  fotoUrl: string | null,
  arredondado = true,
) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const family = getComputedStyle(document.body).fontFamily || 'sans-serif'
  const [logo, foto] = await Promise.all([
    loadImage('/logo.png'),
    fotoUrl ? loadImage(fotoUrl).catch(() => null) : Promise.resolve(null),
  ])

  prepararFundo(ctx, arredondado)

  // Marca d'água central
  ctx.globalAlpha = 0.07
  ctx.drawImage(logo, 330, 170, 420, 420)
  ctx.globalAlpha = 1

  // Logo (canto superior esquerdo)
  ctx.drawImage(logo, 36, 30, 240, 240)

  // Título central
  ctx.fillStyle = INK
  ctx.textBaseline = 'alphabetic'
  ctx.font = `800 40px ${family}`
  ctx.fillText('FEDERAÇÃO MINEIRA', 300, 110)
  ctx.fillText('DE FUTEBOL', 300, 165)
  ctx.fillText('SOCIETY', 300, 220)
  ctx.fillStyle = RED
  ctx.font = `900 120px ${family}`
  ctx.fillText('7', 610, 215)

  // Foto (lado direito, grande)
  const fx = 800, fy = 44, fw = 356, fh = 500
  roundRect(ctx, fx, fy, fw, fh, 18)
  ctx.fillStyle = '#e9e9e9'
  ctx.fill()
  if (foto) {
    ctx.save()
    roundRect(ctx, fx, fy, fw, fh, 18)
    ctx.clip()
    drawCover(ctx, foto, fx, fy, fw, fh)
    ctx.restore()
  } else {
    ctx.fillStyle = '#9a9a9a'
    ctx.font = `700 26px ${family}`
    ctx.textAlign = 'center'
    ctx.fillText('FOTO 3x4', fx + fw / 2, fy + fh / 2)
    ctx.textAlign = 'left'
  }
  roundRect(ctx, fx, fy, fw, fh, 18)
  ctx.strokeStyle = RED
  ctx.lineWidth = 4
  ctx.stroke()

  // Dados do atleta
  drawField(ctx, 'Nome:', atleta.nome, 345, 50, 170, 760, family)
  drawField(ctx, 'R.G:', atleta.rg.toUpperCase(), 465, 50, 170, 760, family)
  drawField(ctx, 'CPF:', formatCpf(atleta.cpf), 545, 50, 170, 760, family)
  drawField(ctx, 'Data Nascimento:', formatData(atleta.dataNascimento), 625, 50, 340, 760, family)
  drawField(ctx, 'Registro:', formatRegistro(atleta.registro), 625, 800, 945, 1156, family)

  // Linha extra abaixo do nome (como na carteirinha física)
  ctx.strokeStyle = '#555'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(50, 395)
  ctx.lineTo(760, 395)
  ctx.stroke()

  // Faixa vermelha inferior
  ctx.fillStyle = RED
  ctx.fillRect(0, 668, CARD_W, CARD_H - 668)
  ctx.fillStyle = '#ffffff'
  ctx.font = `800 64px ${family}`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('ATLETA', CARD_W / 2 - 40, 716)
  ctx.textAlign = 'left'

  // Selo pequeno na faixa
  ctx.beginPath()
  ctx.arc(1100, 714, 40, 0, Math.PI * 2)
  ctx.fillStyle = '#ffffff'
  ctx.fill()
  ctx.drawImage(logo, 1066, 680, 68, 68)

  ctx.restore()
}

export async function drawVerso(canvas: HTMLCanvasElement, atleta: AtletaCarteirinha, arredondado = true) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const family = getComputedStyle(document.body).fontFamily || 'sans-serif'
  const logo = await loadImage('/logo.png')

  prepararFundo(ctx, arredondado)

  // Marca d'água
  ctx.globalAlpha = 0.06
  ctx.drawImage(logo, 390, 150, 420, 420)
  ctx.globalAlpha = 1

  // Faixa superior
  ctx.fillStyle = RED
  ctx.fillRect(0, 0, CARD_W, 100)
  ctx.fillStyle = '#ffffff'
  ctx.font = `800 38px ${family}`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('FEDERAÇÃO MINEIRA DE FUTEBOL 7 SOCIETY', CARD_W / 2, 52)

  // Avisos
  ctx.textAlign = 'left'
  ctx.textBaseline = 'alphabetic'
  ctx.fillStyle = INK
  ctx.font = `500 29px ${family}`
  const avisos = [
    'Esta carteira é pessoal e intransferível e identifica o atleta registrado na FEM7SOC.',
    'Deve ser apresentada sempre que solicitada pela arbitragem ou pela organização das competições.',
    'Em caso de perda ou extravio, comunique imediatamente a Federação.',
  ]
  let y = 175
  for (const aviso of avisos) {
    const linhas = wrapText(ctx, aviso, CARD_W - 140)
    ctx.fillStyle = RED
    ctx.fillRect(60, y - 20, 8, 8)
    ctx.fillStyle = INK
    for (const linha of linhas) {
      ctx.fillText(linha, 86, y)
      y += 40
    }
    y += 18
  }

  // Emissão e registro
  const emissao = new Date().toLocaleDateString('pt-BR')
  ctx.font = `500 26px ${family}`
  ctx.fillStyle = '#666'
  ctx.fillText('Registro nº', 60, 560)
  ctx.fillText('Emissão', 60, 625)
  ctx.font = `800 34px ${family}`
  ctx.fillStyle = INK
  ctx.fillText(formatRegistro(atleta.registro), 210, 560)
  ctx.fillText(emissao, 210, 625)

  // Assinatura do presidente
  ctx.strokeStyle = '#555'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(640, 585)
  ctx.lineTo(1140, 585)
  ctx.stroke()
  ctx.textAlign = 'center'
  ctx.font = `700 26px ${family}`
  ctx.fillText('Luiz Gonzaga Siqueira Neto', 890, 620)
  ctx.font = `500 22px ${family}`
  ctx.fillStyle = '#666'
  ctx.fillText('Presidente', 890, 650)

  // Faixa inferior com contato
  ctx.fillStyle = RED
  ctx.fillRect(0, 680, CARD_W, CARD_H - 680)
  ctx.fillStyle = '#ffffff'
  ctx.font = `700 26px ${family}`
  ctx.textBaseline = 'middle'
  ctx.fillText('contato@fem7soc.com.br   •   @fem7soc   •   Belo Horizonte - MG', CARD_W / 2, 720)
  ctx.textAlign = 'left'

  ctx.restore()
}

// PDF no tamanho real do cartão (85,6 x 54 mm): página 1 frente, página 2 verso
export async function montarPdfCarteirinha(atleta: AtletaCarteirinha, fotoUrl: string | null) {
  const { jsPDF } = await import('jspdf')
  const frente = document.createElement('canvas')
  const verso = document.createElement('canvas')
  frente.width = verso.width = CARD_W
  frente.height = verso.height = CARD_H
  await Promise.all([drawCarteirinha(frente, atleta, fotoUrl, false), drawVerso(verso, atleta, false)])

  const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: [85.6, 54] })
  pdf.addImage(frente.toDataURL('image/jpeg', 0.95), 'JPEG', 0, 0, 85.6, 54)
  pdf.addPage([85.6, 54], 'landscape')
  pdf.addImage(verso.toDataURL('image/jpeg', 0.95), 'JPEG', 0, 0, 85.6, 54)
  return pdf
}

export async function gerarPdfCarteirinha(atleta: AtletaCarteirinha, fotoUrl: string | null) {
  const pdf = await montarPdfCarteirinha(atleta, fotoUrl)
  pdf.save(`carteirinha-fem7soc-${formatRegistro(atleta.registro)}.pdf`)
}

type Props = {
  atleta: AtletaCarteirinha
  fotoUrl: string | null
  lado?: 'frente' | 'verso'
  canvasRef?: RefObject<HTMLCanvasElement | null>
}

export default function Carteirinha({ atleta, fotoUrl, lado = 'frente', canvasRef }: Props) {
  const localRef = useRef<HTMLCanvasElement>(null)
  const ref = canvasRef ?? localRef

  useEffect(() => {
    if (!ref.current) return
    if (lado === 'verso') drawVerso(ref.current, atleta)
    else drawCarteirinha(ref.current, atleta, fotoUrl)
  }, [ref, atleta, fotoUrl, lado])

  return (
    <canvas
      ref={ref}
      width={CARD_W}
      height={CARD_H}
      className="w-full h-auto rounded-[1.25rem] shadow-2xl shadow-black/60"
    />
  )
}
