// Strict TypeScript interfaces for the Lead Capture domain
// No `any` types — all fields explicitly typed

export interface LeadFormValues {
  email: string;
  current_experience: string;
  experience_time: string;
  full_name: string;
  main_objective: string;
  topic_of_interest: string;
  whatsapp_number: string;
  willing_to_invest: string;
  work_modality: string;
  wpp_group_joined: boolean;
}

export type LeadFormErrors = Partial<Record<keyof LeadFormValues, string>>;

// The exact shape we POST to Supabase (matches masterclass_leads table columns)
export type LeadPayload = LeadFormValues;
