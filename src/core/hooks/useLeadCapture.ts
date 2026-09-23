import { ChangeEvent, FormEvent, useReducer } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { LeadFormErrors, LeadFormValues } from '../types/lead.types';

// ─── State shape ─────────────────────────────────────────────────────────────

interface LeadCaptureState {
  errors: LeadFormErrors;
  formValues: LeadFormValues;
  isLoading: boolean;
  isSuccess: boolean;
}

// ─── Actions ─────────────────────────────────────────────────────────────────

type LeadCaptureAction =
  | { field: keyof LeadFormValues; type: 'SET_FIELD'; value: string | boolean }
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_SUCCESS' }
  | { errors: LeadFormErrors; type: 'SUBMIT_FAILURE' }
  | { type: 'VALIDATE_ERRORS'; errors: LeadFormErrors };

// ─── Initial state ────────────────────────────────────────────────────────────

const INITIAL_FORM_VALUES: LeadFormValues = {
  current_experience: '',
  experience_time: '',
  full_name: '',
  main_objective: '',
  topic_of_interest: '',
  whatsapp_number: '',
  willing_to_invest: '',
  work_modality: '',
  wpp_group_joined: false,
};

const INITIAL_STATE: LeadCaptureState = {
  errors: {},
  formValues: INITIAL_FORM_VALUES,
  isLoading: false,
  isSuccess: false,
};

// ─── Reducer ─────────────────────────────────────────────────────────────────

function leadCaptureReducer(
  state: LeadCaptureState,
  action: LeadCaptureAction,
): LeadCaptureState {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        errors: { ...state.errors, [action.field]: undefined },
        formValues: { ...state.formValues, [action.field]: action.value },
      };
    case 'SUBMIT_START':
      return { ...state, errors: {}, isLoading: true, isSuccess: false };
    case 'SUBMIT_SUCCESS':
      return { ...INITIAL_STATE, isSuccess: true };
    case 'SUBMIT_FAILURE':
      return { ...state, errors: action.errors, isLoading: false };
    case 'VALIDATE_ERRORS':
      return { ...state, errors: action.errors, isLoading: false };
    default:
      return state;
  }
}

// ─── Validation ───────────────────────────────────────────────────────────────

const STRING_REQUIRED_FIELDS: ReadonlyArray<keyof LeadFormValues> = [
  'current_experience',
  'experience_time',
  'full_name',
  'main_objective',
  'topic_of_interest',
  'whatsapp_number',
  'willing_to_invest',
  'work_modality',
];

const PHONE_REGEX = /^[+\d][\d\s\-().]{6,20}$/;

function validate(values: LeadFormValues): LeadFormErrors {
  const errors: LeadFormErrors = {};

  for (const field of STRING_REQUIRED_FIELDS) {
    const val = values[field] as string;
    if (!val || val.trim() === '') {
      errors[field] = 'Este campo es obligatorio.';
    }
  }

  if (values.whatsapp_number && !PHONE_REGEX.test(values.whatsapp_number.trim())) {
    errors.whatsapp_number = 'Ingresa un número de WhatsApp válido.';
  }

  return errors;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

interface UseLeadCaptureReturn {
  errors: LeadFormErrors;
  formState: LeadFormValues;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  isLoading: boolean;
  isSuccess: boolean;
}

export function useLeadCapture(onSuccess?: () => void): UseLeadCaptureReturn {
  const [state, dispatch] = useReducer(leadCaptureReducer, INITIAL_STATE);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const target = e.target;
    const value =
      target instanceof HTMLInputElement && target.type === 'checkbox'
        ? target.checked
        : target.value;

    dispatch({ field: target.name as keyof LeadFormValues, type: 'SET_FIELD', value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validate(state.formValues);
    if (Object.keys(errors).length > 0) {
      dispatch({ errors, type: 'VALIDATE_ERRORS' });
      return;
    }

    dispatch({ type: 'SUBMIT_START' });

    const { error } = await supabase
      .from('masterclass_leads')
      .insert([state.formValues]);

    if (error) {
      dispatch({
        errors: { full_name: `Error al enviar: ${error.message}` },
        type: 'SUBMIT_FAILURE',
      });
      return;
    }

    // If user opted into the WhatsApp group, open the invite link
    if (state.formValues.wpp_group_joined) {
      const wppUrl = import.meta.env.VITE_WPP_GROUP_URL as string;
      if (wppUrl) window.open(wppUrl, '_blank', 'noopener,noreferrer');
    }

    dispatch({ type: 'SUBMIT_SUCCESS' });

    // Close the modal after a short delay so the success message is visible
    if (onSuccess) {
      setTimeout(onSuccess, 2000);
    }
  };

  return {
    errors: state.errors,
    formState: state.formValues,
    handleChange,
    handleSubmit,
    isLoading: state.isLoading,
    isSuccess: state.isSuccess,
  };
}
