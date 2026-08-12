-- Schema per la tabella delle prevendite.
-- Esegui questo script nel SQL Editor del tuo progetto Supabase.

create extension if not exists "pgcrypto";

create table if not exists public.prevendite (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  email text not null,
  paypal_order_id text not null unique,
  status text not null default 'paid',
  created_at timestamptz not null default now()
);

create index if not exists prevendite_email_idx on public.prevendite (email);

-- L'app scrive e legge SOLO con la service role key (che bypassa la RLS).
-- Abilitare la RLS senza policy blocca ogni accesso con la chiave anon.
alter table public.prevendite enable row level security;
