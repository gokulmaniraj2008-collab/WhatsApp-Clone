create extension if not exists pgcrypto;
create table if not exists public.profiles (id uuid primary key references auth.users(id) on delete cascade, display_name text not null default 'New user', avatar_url text, about text default 'Hey there! I am using ChatWave.', is_online boolean not null default false, last_seen timestamptz default now(), created_at timestamptz not null default now());
create table if not exists public.conversations (id uuid primary key default gen_random_uuid(), is_group boolean not null default false, name text, avatar_url text, created_at timestamptz not null default now());
create table if not exists public.conversation_members (conversation_id uuid references public.conversations(id) on delete cascade, user_id uuid references public.profiles(id) on delete cascade, role text not null default 'member', joined_at timestamptz not null default now(), primary key(conversation_id,user_id));
create table if not exists public.messages (id uuid primary key default gen_random_uuid(), conversation_id uuid not null references public.conversations(id) on delete cascade, sender_id uuid not null references public.profiles(id) on delete cascade, body text, media_url text, media_type text, created_at timestamptz not null default now(), read_at timestamptz);
create index if not exists messages_conversation_created_idx on public.messages(conversation_id,created_at);
alter table public.profiles enable row level security; alter table public.conversations enable row level security; alter table public.conversation_members enable row level security; alter table public.messages enable row level security;
create policy "profiles readable" on public.profiles for select using (true);
create policy "own profile insert" on public.profiles for insert with check (auth.uid()=id);
create policy "own profile update" on public.profiles for update using (auth.uid()=id);
create policy "members readable" on public.conversation_members for select using (auth.uid()=user_id);
create policy "conversations for members" on public.conversations for select using (exists(select 1 from public.conversation_members cm where cm.conversation_id=id and cm.user_id=auth.uid()));
create policy "messages for members" on public.messages for select using (exists(select 1 from public.conversation_members cm where cm.conversation_id=conversation_id and cm.user_id=auth.uid()));
create policy "send own messages" on public.messages for insert with check (auth.uid()=sender_id and exists(select 1 from public.conversation_members cm where cm.conversation_id=conversation_id and cm.user_id=auth.uid()));
create policy "update own messages" on public.messages for update using (auth.uid()=sender_id);

insert into storage.buckets (id,name,public) values ('chat-media','chat-media',false) on conflict (id) do nothing;
