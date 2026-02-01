-- Add financial columns to appointments
alter table llr_appointments 
add column if not exists price numeric default 0,
add column if not exists payment_status text default 'pending', -- 'pending', 'paid'
add column if not exists payment_method text; -- 'cash', 'venmo', 'check'

-- Create expenses table
create table if not exists llr_expenses (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  date date default CURRENT_DATE,
  merchant text not null,
  total_amount numeric not null,
  category text, -- 'supplies', 'fuel', 'equipment'
  items jsonb -- Store the parsed line items from the receipt
);

-- Enable RLS for expenses
alter table llr_expenses enable row level security;

create policy "Enable all access for all users" on llr_expenses
for all using (true) with check (true);
