import React, { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../services/supabase/client';
import { AuthContext } from './authContextDef';

const LOCAL_ADMIN_SESSION_KEY = 'benedict_portfolio_admin_auth';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ id: string; email: string; role?: string } | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function checkSession() {
      setIsLoading(true);

      if (isSupabaseConfigured) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            // Verify if user is in admin_profiles
            const { data: adminRecord, error } = await supabase
              .from('admin_profiles')
              .select('role')
              .eq('id', session.user.id)
              .maybeSingle();

            if (!error && adminRecord) {
              setUser({ id: session.user.id, email: session.user.email || '', role: adminRecord.role });
              setIsAdmin(true);
            } else {
              setUser(null);
              setIsAdmin(false);
            }
          }
        } catch (err) {
          console.warn('Error verifying Supabase auth session:', err);
        }
      } else {
        // Fallback local development admin session check
        const stored = localStorage.getItem(LOCAL_ADMIN_SESSION_KEY);
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            if (parsed?.isAdmin && parsed?.email) {
              setUser({ id: 'local-admin-1', email: parsed.email, role: 'admin' });
              setIsAdmin(true);
            }
          } catch {
            localStorage.removeItem(LOCAL_ADMIN_SESSION_KEY);
          }
        }
      }

      setIsLoading(false);
    }

    checkSession();

    if (isSupabaseConfigured) {
      const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
        if (session?.user) {
          const { data: adminRecord } = await supabase
            .from('admin_profiles')
            .select('role')
            .eq('id', session.user.id)
            .maybeSingle();

          if (adminRecord) {
            setUser({ id: session.user.id, email: session.user.email || '', role: adminRecord.role });
            setIsAdmin(true);
          } else {
            setUser(null);
            setIsAdmin(false);
          }
        } else {
          setUser(null);
          setIsAdmin(false);
        }
      });

      return () => {
        authListener.subscription.unsubscribe();
      };
    }
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error || !data.user) {
          setIsLoading(false);
          return { success: false, error: error?.message || 'Invalid credentials' };
        }

        // Check admin allowlist
        const { data: adminRecord, error: profileErr } = await supabase
          .from('admin_profiles')
          .select('role')
          .eq('id', data.user.id)
          .maybeSingle();

        if (profileErr || !adminRecord) {
          await supabase.auth.signOut();
          setUser(null);
          setIsAdmin(false);
          setIsLoading(false);
          return {
            success: false,
            error: 'Access denied: Your account is not authorized as an administrator.',
          };
        }

        setUser({ id: data.user.id, email: data.user.email || '', role: adminRecord.role });
        setIsAdmin(true);
        setIsLoading(false);
        return { success: true };
      } catch (err: unknown) {
        setIsLoading(false);
        return { success: false, error: (err as Error)?.message || 'Authentication failed' };
      }
    }

    // Local sandbox dev authentication mode (active ONLY in local dev when Supabase is not configured):
    if (
      !isSupabaseConfigured &&
      import.meta.env.DEV &&
      (email.trim().toLowerCase() === 'admin@benedictcastro.dev' || email.trim().toLowerCase() === 'benedict@example.com') &&
      password === 'AdminSecurePass2026!'
    ) {
      const devAdmin = { id: 'local-admin-1', email: email.trim(), role: 'admin' };
      localStorage.setItem(LOCAL_ADMIN_SESSION_KEY, JSON.stringify({ email: devAdmin.email, isAdmin: true }));
      setUser(devAdmin);
      setIsAdmin(true);
      setIsLoading(false);
      return { success: true };
    }

    setIsLoading(false);
    return {
      success: false,
      error: 'Invalid administrator credentials or unauthorized user.',
    };
  };

  const logout = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem(LOCAL_ADMIN_SESSION_KEY);
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
