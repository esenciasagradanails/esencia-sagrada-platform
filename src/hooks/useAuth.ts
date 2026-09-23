import { Session, User } from '@supabase/supabase-js';
import { useEffect, useReducer } from 'react';
import { supabase } from '../lib/supabaseClient';

// ─── State ────────────────────────────────────────────────────────────────────

interface AuthState {
  error: string | null;
  isLoading: boolean;
  session: Session | null;
  user: User | null;
}

// ─── Actions ─────────────────────────────────────────────────────────────────

type AuthAction =
  | { type: 'AUTH_LOADING' }
  | { session: Session | null; type: 'AUTH_SUCCESS' }
  | { error: string; type: 'AUTH_ERROR' }
  | { type: 'AUTH_SIGNED_OUT' };

// ─── Reducer ─────────────────────────────────────────────────────────────────

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'AUTH_LOADING':
      return { ...state, error: null, isLoading: true };
    case 'AUTH_SUCCESS':
      return {
        error: null,
        isLoading: false,
        session: action.session,
        user: action.session?.user ?? null,
      };
    case 'AUTH_ERROR':
      return { ...state, error: action.error, isLoading: false };
    case 'AUTH_SIGNED_OUT':
      return { error: null, isLoading: false, session: null, user: null };
    default:
      return state;
  }
}

const INITIAL_AUTH_STATE: AuthState = {
  error: null,
  isLoading: true,
  session: null,
  user: null,
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

interface UseAuthReturn extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const [state, dispatch] = useReducer(authReducer, INITIAL_AUTH_STATE);

  // Rehydrate session on mount and listen for auth state changes
  useEffect(() => {
    // Get the initial session without chaining setState calls
    supabase.auth.getSession().then(({ data }) => {
      dispatch({ session: data.session, type: 'AUTH_SUCCESS' });
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      dispatch({ session, type: 'AUTH_SUCCESS' });
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    dispatch({ type: 'AUTH_LOADING' });
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      dispatch({ error: error.message, type: 'AUTH_ERROR' });
    }
    // On success, onAuthStateChange fires and updates state automatically
  };

  const signOut = async () => {
    dispatch({ type: 'AUTH_LOADING' });
    await supabase.auth.signOut();
    dispatch({ type: 'AUTH_SIGNED_OUT' });
  };

  return {
    ...state,
    signIn,
    signOut,
  };
}
