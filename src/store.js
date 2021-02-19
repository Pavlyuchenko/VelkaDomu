import { writable } from 'svelte/store';

export const isAuthenticated = writable(false);
export const prezdivka = writable(null);
export const cookie = writable(null);