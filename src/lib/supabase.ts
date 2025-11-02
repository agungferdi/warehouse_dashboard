import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type RFIDTag = {
  id: number
  tid: string
  epc: string
  epc_text: string | null
  quantity: number
  created_at: string
  updated_at: string
  scan_date?: string
}
