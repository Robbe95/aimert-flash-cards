import { createClient } from '@supabase/supabase-js'

export function useSupabase() {
  const runtimeConfig = useRuntimeConfig()

  const supabaseUrl = runtimeConfig.public.supabaseUrl
  const supabaseKey = runtimeConfig.public.supabaseKey

  const supabase = createClient(supabaseUrl, supabaseKey)

  return supabase
}
