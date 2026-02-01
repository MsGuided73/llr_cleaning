-- Create clients table
create table if not exists llr_clients (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  address text,
  phone text,
  notes text,
  email text
);

-- Create appointments table
create table if not exists llr_appointments (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  client_id uuid references llr_clients(id) not null,
  date date not null,
  time text not null,
  notes text,
  status text default 'scheduled'
);

-- Enable RLS (optional but recommended, keep open for now for simplicity of demo)
alter table llr_clients enable row level security;
alter table llr_appointments enable row level security;

create policy "Enable all access for all users" on llr_clients
for all using (true) with check (true);

create policy "Enable all access for all users" on llr_appointments
for all using (true) with check (true);
