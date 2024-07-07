import { superValidate } from 'sveltekit-superforms';
import type { LayoutServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { registerSchema } from '@/auth/schema';

export const load = (async () => {
  const registerForm = await superValidate(zod(registerSchema));

  console.log(registerForm);

  return {
    registerForm,
  };
}) satisfies LayoutServerLoad;