import { useSyncExternalStore } from 'react';
import type { MyNoodlesEntry, MyNoodlesState } from '../types/myNoodles';

/* Personal library store — module-level pub-sub + useSyncExternalStore, versioned localStorage
   payload. Reuses Ramen's strongest pattern in the family, including its documented gotcha:
   getSnapshot must return a referentially stable value or React throws "Maximum update depth
   exceeded" — so we keep an in-memory cache and only replace it on writes, never re-parsing
   JSON on every read. */

const STORAGE_KEY = 'let-them-eat-noodles:my-noodles:v1';

type Listener = () => void;
const listeners = new Set<Listener>();

function loadFromStorage(): MyNoodlesEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

let cache: MyNoodlesEntry[] = loadFromStorage();

function persist() {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
  listeners.forEach((l) => l());
}

function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return cache;
}

function getServerSnapshot() {
  return [] as MyNoodlesEntry[];
}

export function toggleState(dishId: string, state: MyNoodlesState) {
  const existing = cache.find((e) => e.dishId === dishId);
  if (existing) {
    const hasState = existing.states.includes(state);
    const nextStates = hasState ? existing.states.filter((s) => s !== state) : [...existing.states, state];
    cache = cache
      .map((e) => (e.dishId === dishId ? { ...e, states: nextStates } : e))
      .filter((e) => e.states.length > 0 || e.note);
  } else {
    cache = [...cache, { dishId, states: [state], savedAt: new Date().toISOString() }];
  }
  persist();
}

export function setNote(dishId: string, note: string) {
  const existing = cache.find((e) => e.dishId === dishId);
  if (existing) {
    cache = cache.map((e) => (e.dishId === dishId ? { ...e, note } : e));
  } else {
    cache = [...cache, { dishId, states: [], note, savedAt: new Date().toISOString() }];
  }
  persist();
}

export function useMyNoodles() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function useMyNoodlesEntry(dishId: string): MyNoodlesEntry | undefined {
  const entries = useMyNoodles();
  return entries.find((e) => e.dishId === dishId);
}
