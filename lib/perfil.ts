import { supabase } from '@/lib/supabase'

export type Perfil = {
  id: string
  nome: string
  email: string
  role: 'admin' | 'arbitro'
  ativo: boolean
  created_at: string
}

// Perfil do usuário logado, ou null se não está logado / não tem acesso ativo
export async function getPerfilLogado(): Promise<Perfil | null> {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return null

  const { data } = await supabase
    .from('perfis')
    .select('*')
    .eq('id', session.user.id)
    .maybeSingle()

  return data && data.ativo ? (data as Perfil) : null
}
