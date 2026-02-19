import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Mock object to prevent crashes during build when keys are missing
const mockSupabase = {
    auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
        signInWithPassword: async () => ({ data: {}, error: null }),
        signOut: async () => ({ error: null }),
    },
    from: () => ({
        select: () => ({
            order: () => ({
                order: () => ({
                    eq: () => Promise.resolve({ data: [], error: null })
                }),
                eq: () => Promise.resolve({ data: [], error: null })
            }),
            eq: () => Promise.resolve({ data: [], error: null })
        }),
        insert: () => Promise.resolve({ data: null, error: null }),
        update: () => ({ eq: () => Promise.resolve({ data: null, error: null }) }),
        delete: () => ({ eq: () => Promise.resolve({ data: null, error: null }) }),
    }),
};

export const supabase = (() => {
    if (supabaseUrl && supabaseUrl.startsWith('http') && supabaseAnonKey) {
        try {
            return createClient(supabaseUrl, supabaseAnonKey);
        } catch (e) {
            console.error("Supabase initialization failed, using mock.");
        }
    }
    return mockSupabase as any;
})();
