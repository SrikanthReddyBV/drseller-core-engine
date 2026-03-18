import { createClient } from '@supabase/supabase-js'

// 1. Connection Details (Get these from your Supabase Project Settings > API)
const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 2. Your Power Constants (Platform Control)
export const PLATFORM_CONTROL = {
    version: "1.0.0",
    dev_fee_percent: 10, // Your 10% cut excluding tax
    contract_start: "2026-03-18",
    contract_end: "2027-03-18", // Valid for 1 year
    jurisdiction: "Bangalore Courts", // User's requirement for legal disputes
    is_active: true // Your master kill-switch
};