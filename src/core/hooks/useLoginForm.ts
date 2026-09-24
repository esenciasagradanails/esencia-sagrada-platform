import { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';

// ─── State ────────────────────────────────────────────────────────────────────

interface LoginFormState {
  email: string;
  error: string | null;
  isLoading: boolean;
  password: string;
}

// ─── Actions ─────────────────────────────────────────────────────────────────

type LoginFormAction =
  | { type: 'SET_EMAIL'; value: string }
  | { type: 'SET_PASSWORD'; value: string }
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_SUCCESS' }
  | { error: string; type: 'SUBMIT_ERROR' };

// ─── Reducer ─────────────────────────────────────────────────────────────────

function loginFormReducer(
  state: LoginFormState,
  action: LoginFormAction,
): LoginFormState {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, email: action.value, error: null };
    case 'SET_PASSWORD':
      return { ...state, error: null, password: action.value };
    case 'SUBMIT_START':
      return { ...state, error: null, isLoading: true };
    case 'SUBMIT_SUCCESS':
      return { ...state, isLoading: false };
    case 'SUBMIT_ERROR':
      return { ...state, error: action.error, isLoading: false };
    default:
      return state;
  }
}

const INITIAL_STATE: LoginFormState = {
  email: '',
  error: null,
  isLoading: false,
  password: '',
};

// ─── Public interface ─────────────────────────────────────────────────────────

export interface UseLoginFormReturn {
  email: string;
  error: string | null;
  isLoading: boolean;
  password: string;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  submit: () => Promise<void>;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useLoginForm(): UseLoginFormReturn {
  const [state, dispatch] = useReducer(loginFormReducer, INITIAL_STATE);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const setEmail = (value: string) => dispatch({ type: 'SET_EMAIL', value });
  const setPassword = (value: string) => dispatch({ type: 'SET_PASSWORD', value });

  const submit = async () => {
    if (!state.email.trim() || !state.password.trim()) {
      dispatch({
        error: 'Por favor ingresa tu correo y contraseña.',
        type: 'SUBMIT_ERROR',
      });
      return;
    }

    dispatch({ type: 'SUBMIT_START' });

    await signIn(state.email, state.password);

    // signIn dispatches internally; check the Supabase session to decide navigation.
    // We rely on the auth state listener for session, but we need to know if it
    // succeeded here. signIn throws on network errors; Supabase auth errors are
    // surfaced via useAuth's state. We optimistically navigate — ProtectedRoute
    // will bounce back if the session is still null.
    const { data } = await import('../services/supabaseClient').then(
      ({ supabase }) => supabase.auth.getSession(),
    );

    if (data.session) {
      dispatch({ type: 'SUBMIT_SUCCESS' });
      navigate('/dashboard', { replace: true });
    } else {
      dispatch({
        error: 'Credenciales incorrectas. Verifica tu correo y contraseña.',
        type: 'SUBMIT_ERROR',
      });
    }
  };

  return {
    email: state.email,
    error: state.error,
    isLoading: state.isLoading,
    password: state.password,
    setEmail,
    setPassword,
    submit,
  };
}
