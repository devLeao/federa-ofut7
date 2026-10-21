-- =====================================================================
-- CADASTRO DE ATLETAS - FEM7SOC
-- Rodar uma única vez no Supabase: Dashboard > SQL Editor > New query
-- =====================================================================

-- Numeração do registro (000001, 000002, ...).
-- Se a federação já emitiu carteirinhas físicas, ajuste o START para
-- o próximo número livre (ex: START WITH 250).
create sequence if not exists public.atletas_registro_seq start with 1;

create table if not exists public.atletas (
  id              uuid primary key default gen_random_uuid(),
  registro        integer not null unique default nextval('public.atletas_registro_seq'),
  nome            text not null check (char_length(trim(nome)) >= 3),
  rg              text not null,
  cpf             char(11) not null unique check (cpf ~ '^[0-9]{11}$'),
  data_nascimento date not null,
  foto_url        text not null,
  created_at      timestamptz not null default now()
);

alter sequence public.atletas_registro_seq owned by public.atletas.registro;

-- RLS ligado: o público NÃO lê RG/CPF direto da tabela.
alter table public.atletas enable row level security;

-- Leitura completa (RG/CPF) só para admin: a policy fica no
-- 02_arbitros_sumulas.sql, que cria a tabela de perfis.

-- Lista pública só com dados não sensíveis (sem RG/CPF)
create or replace view public.atletas_publico as
  select registro, nome, foto_url, created_at
  from public.atletas;

grant select on public.atletas_publico to anon, authenticated;

-- Cadastro: função security definer para o visitante conseguir inserir
-- e receber o número de registro gerado, sem poder ler a tabela.
create or replace function public.cadastrar_atleta(
  p_nome text,
  p_rg text,
  p_cpf text,
  p_data_nascimento date,
  p_foto_url text
) returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_registro integer;
begin
  insert into public.atletas (nome, rg, cpf, data_nascimento, foto_url)
  values (trim(p_nome), trim(p_rg), regexp_replace(p_cpf, '\D', '', 'g'), p_data_nascimento, p_foto_url)
  returning registro into v_registro;

  return v_registro;
exception
  when unique_violation then
    raise exception 'CPF_JA_CADASTRADO';
end;
$$;

revoke all on function public.cadastrar_atleta(text, text, text, date, text) from public;
grant execute on function public.cadastrar_atleta(text, text, text, date, text) to anon, authenticated;

-- =====================================================================
-- STORAGE: bucket público para as fotos 3x4
-- =====================================================================
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('atletas', 'atletas', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;

drop policy if exists "atletas_foto_upload" on storage.objects;
create policy "atletas_foto_upload"
  on storage.objects for insert
  to anon, authenticated
  with check (bucket_id = 'atletas');
