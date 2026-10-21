import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Chamado 1x por dia pelo Cron da Vercel (ver vercel.json).
// Uma consulta simples ao banco conta como atividade e impede que o
// projeto gratuito do Supabase seja pausado após 7 dias sem uso.
export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  // A Vercel envia "Authorization: Bearer <CRON_SECRET>" quando a variável existe
  const secret = process.env.CRON_SECRET
  if (secret && request.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }

  const { error } = await supabase.from('atletas_publico').select('registro').limit(1)
  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true, at: new Date().toISOString() })
}
