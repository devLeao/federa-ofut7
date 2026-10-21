-- =====================================================================
-- ACESSO DE ÁRBITROS/ADMIN + SÚMULAS - FEM7SOC
-- Rodar DEPOIS do 01_atletas.sql: Dashboard > SQL Editor > New query
-- =====================================================================

-- Perfis: quem pode usar o sistema e com qual papel.
-- Contas criadas por fora (cadastro público do Supabase) não têm perfil,
-- então não conseguem fazer nada.
create table if not exists public.perfis (
  id         uuid primary key references auth.users(id) on delete cascade,
  nome       text not null,
  email      text not null,
  role       text not null check (role in ('admin', 'arbitro')),
  ativo      boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.perfis enable row level security;

-- Papel do usuário logado (null se não tem perfil ou está desativado)
create or replace function public.meu_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select role from public.perfis where id = auth.uid() and ativo
$$;

revoke all on function public.meu_role() from public;
grant execute on function public.meu_role() to authenticated;

-- Cada um lê o próprio perfil; admin lê todos
drop policy if exists "perfis_select" on public.perfis;
create policy "perfis_select"
  on public.perfis for select
  to authenticated
  using (id = auth.uid() or public.meu_role() = 'admin');

-- Só admin ativa/desativa (a criação é feita pela rota /api/admin/arbitros)
drop policy if exists "perfis_update_admin" on public.perfis;
create policy "perfis_update_admin"
  on public.perfis for update
  to authenticated
  using (public.meu_role() = 'admin')
  with check (public.meu_role() = 'admin');

-- =====================================================================
-- CORREÇÃO: dados completos dos atletas (RG/CPF) só para admin
-- =====================================================================
drop policy if exists "atletas_select_autenticado" on public.atletas;
drop policy if exists "atletas_select_admin" on public.atletas;
create policy "atletas_select_admin"
  on public.atletas for select
  to authenticated
  using (public.meu_role() = 'admin');

-- =====================================================================
-- SÚMULAS
-- =====================================================================
create table if not exists public.sumulas (
  id         uuid primary key default gen_random_uuid(),
  campeonato text not null,
  confronto  text not null,
  image_url  text not null,
  arbitro_id uuid references auth.users(id) on delete set null default auth.uid(),
  created_at timestamptz not null default now()
);

alter table public.sumulas enable row level security;

-- Arquivo de súmulas é público
drop policy if exists "sumulas_select_publico" on public.sumulas;
create policy "sumulas_select_publico"
  on public.sumulas for select
  to anon, authenticated
  using (true);

-- Só árbitro/admin ativo envia, sempre em nome próprio
drop policy if exists "sumulas_insert_arbitro" on public.sumulas;
create policy "sumulas_insert_arbitro"
  on public.sumulas for insert
  to authenticated
  with check (public.meu_role() in ('admin', 'arbitro') and arbitro_id = auth.uid());

-- Só admin apaga
drop policy if exists "sumulas_delete_admin" on public.sumulas;
create policy "sumulas_delete_admin"
  on public.sumulas for delete
  to authenticated
  using (public.meu_role() = 'admin');

-- Bucket das fotos das súmulas (público para leitura)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('sumulas', 'sumulas', true, 10485760, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;

drop policy if exists "sumulas_foto_upload" on storage.objects;
create policy "sumulas_foto_upload"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'sumulas' and public.meu_role() in ('admin', 'arbitro'));

-- =====================================================================
-- PRIMEIRO ADMIN (fazer uma vez, manualmente)
-- 1) Authentication > Users > Add user > Create new user
--    (marque "Auto Confirm User")
-- 2) Troque o e-mail e o nome abaixo e rode só este trecho:
-- =====================================================================
-- insert into public.perfis (id, nome, email, role)
-- select id, 'Nome do Admin', email, 'admin'
-- from auth.users
-- where email = 'admin@exemplo.com';
