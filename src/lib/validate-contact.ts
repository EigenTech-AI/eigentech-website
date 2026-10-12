export type ContactValues = {
  name: string;
  email: string;
  organisation: string;
  interest: string;
  message: string;
  consent: boolean;
  website: string; // honeypot: must stay empty
};

export type ContactErrors = Partial<Record<'name' | 'email' | 'interest' | 'message' | 'consent', true>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(v: ContactValues): ContactErrors {
  const e: ContactErrors = {};
  if (v.name.trim().length < 2) e.name = true;
  if (!EMAIL.test(v.email.trim())) e.email = true;
  if (!v.interest) e.interest = true;
  if (v.message.trim().length < 20) e.message = true;
  if (!v.consent) e.consent = true;
  return e;
}

export const emptyContact: ContactValues = { name: '', email: '', organisation: '', interest: '', message: '', consent: false, website: '' };
