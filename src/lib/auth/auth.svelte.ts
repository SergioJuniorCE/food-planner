import { pb } from '$lib/pocketbase';
import type { AuthModel } from 'pocketbase';
import { getContext, setContext } from 'svelte';

class AuthStore {
  user = $state<AuthModel | null>(null);
  isSynced = $state(false);

  constructor() {
    // runs on mount
    $effect(() => {
      if (pb.authStore.isValid) {
        this.user = pb.authStore.model;
      }
      this.isSynced = true;
    });
  }

  async register({
    email,
    password,
    confirmPassword
  }: {
    email: string;
    password: string;
    confirmPassword: string;
  }) {
    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }

    let record;

    try {
      record = await pb.collection('users').create({
        email: email,
        password: password,
        passwordConfirm: confirmPassword,
        emailVisibility: true
      })
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
      throw new Error('Failed to register');
    }

    this.user = record;
    return this.user;
  }

  async loginWithEmailAndPassword({
    email,
    password
  }: {
    email: string;
    password: string;
  }) {
    this.user = (await pb.collection('users').authWithPassword(email, password)).record;
  }

  async signInWithDiscord() {
    this.user = (await pb.collection('users').authWithOAuth2({ provider: 'discord' })).record;
  }

  async signInWithGithub() {
    this.user = (await pb.collection('users').authWithOAuth2({ provider: 'github' })).record;
  }

  logout() {
    pb.authStore.clear();
    this.user = null;
  }
}

// this is important if u are gonna have any SSR
// https://www.youtube.com/watch?v=EyDV5XLfagg
// https://kit.svelte.dev/docs/state-management

const AUTH_STORE_KEY = 'auth store';

export const setAuthContext = () => {
  const nAuthStore = new AuthStore();
  return setContext(AUTH_STORE_KEY, nAuthStore);
};

export const getAuthContext = () => {
  return getContext<AuthStore>(AUTH_STORE_KEY);
};
