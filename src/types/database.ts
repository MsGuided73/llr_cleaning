export type ClientFrequency = 'weekly' | 'bi_weekly' | 'monthly' | 'custom'
export type AppointmentStatus = 'scheduled' | 'completed' | 'cancelled'
export type PaymentMethod = 'cash' | 'venmo' | 'zelle' | 'check'
export type ExpenseCategory = 'supplies' | 'equipment' | 'vehicle' | 'gas' | 'marketing' | 'other'
export type CommunicationType = 'call' | 'text' | 'email' | 'in_person'

export interface Client {
    id: string
    owner_id: string
    name: string
    address?: string
    email?: string
    phone?: string
    frequency: ClientFrequency
    birthday?: string
    notes?: string
    lat?: number
    lng?: number
    created_at: string
}

export interface Appointment {
    id: string
    client_id: string
    start_time: string
    end_time?: string
    status: AppointmentStatus
    service_notes?: string
    created_at: string
}

export interface Payment {
    id: string
    client_id: string
    appointment_id?: string
    amount: number
    method: PaymentMethod
    payment_date: string
    created_at: string
}

export interface Expense {
    id: string
    owner_id: string
    date: string
    vendor?: string
    total_amount: number
    category: ExpenseCategory
    receipt_url?: string
    raw_ocr_text?: any
    created_at: string
}

export interface MileageLog {
    id: string
    owner_id: string
    appointment_id?: string
    date: string
    miles: number
    deduction_value: number
    is_manual: boolean
    notes?: string
    created_at: string
}
