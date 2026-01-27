
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';
import 'react-native-url-polyfill/auto';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
// PICK EITHER supabaseKey OR supabaseAnonKey YOUR CHOISE
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_KEY || '' || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

// ADDING THIS CODE SO THAT THE WEBSITE DOES NOT CRASH
const storage = Platform.OS === 'web'
    ? (typeof window !== 'undefined' ? window.localStorage : undefined)
    : AsyncStorage;

export const supabase = createClient(supabaseUrl,
    supabaseAnonKey,
    {
        auth: {
            storage: storage as any,
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: Platform.OS === 'web',
            // PLEASE RESEARCH ABOUT THIS MOBILE AND WEB LOCK MAYBE THIS IS IMPORTANT
            // lock: processLock || navigatorLock,
        },
    })
