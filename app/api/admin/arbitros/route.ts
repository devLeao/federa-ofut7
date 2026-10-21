import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Roda só no servidor: a service_role ignora o RLS, por isso NUNCA
// pode ter o prefixo NEXT_PUBLIC_ nem ser importada em página 'use client'.
export const dynamic = 'force-dynamic'

function adminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey) throw new Error('SUPABASE_SERVICE_ROLE_KEY não configurada no servidor.')
  return createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } })
}

export async function POST(request: Request) {
  try {
    const supabaseAdmin = adminClient()

    // Confere se quem está chamando é um admin ativo
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) return NextResponse.json({ error: 'Não autenticado.' }, { status: 401 })

    const { data: { user } } = await supabaseAdmin.auth.getUser(token)
    if (!user) return NextResponse.json({ error: 'Sessão inválida.' }, { status: 401 })

    const { data: perfil } = await supabaseAdmin
      .from('perfis')
      .select('role, ativo')
      .eq('id', user.id)
      .single()
    if (perfil?.role !== 'admin' || !perfil.ativo) {
      return NextResponse.json({ error: 'Apenas administradores podem criar acessos.' }, { status: 403 })
    }

    const { nome, email, password } = await request.json()
    if (!nome?.trim() || !email?.trim() || !password || password.length < 6) {
      return NextResponse.json({ error: 'Preencha nome, e-mail e uma senha de no mínimo 6 caracteres.' }, { status: 400 })
    }

    const { data: created, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email: email.trim().toLowerCase(),
      password,
      email_confirm: true,
      user_metadata: { full_name: nome.trim() },
    })
    if (createError || !created.user) {
      const msg = createError?.message?.includes('already') ? 'Já existe um acesso com este e-mail.' : createError?.message
      return NextResponse.json({ error: msg || 'Erro ao criar usuário.' }, { status: 400 })
    }

    const { error: perfilError } = await supabaseAdmin.from('perfis').insert({
      id: created.user.id,
      nome: nome.trim(),
      email: created.user.email,
      role: 'arbitro',
    })
    if (perfilError) {
      // Desfaz o usuário para não ficar uma conta sem perfil
      await supabaseAdmin.auth.admin.deleteUser(created.user.id)
      return NextResponse.json({ error: perfilError.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}
