// Tiny local store backed by AsyncStorage (no accounts, no network).
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSyncExternalStore } from "react";
import type { SessionKind } from "./types";

export type LogEntry = { id: string; kind: SessionKind; minutes: number; day: string; xp: number };

const KEY = "sipa.log.v1";
let entries: LogEntry[] = [];
let loaded = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

export async function loadLog() {
  if (loaded) return;
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (raw) entries = JSON.parse(raw) as LogEntry[];
  } catch {
    entries = [];
  }
  loaded = true;
  emit();
}

export function localDay(d = new Date()) {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

export async function addEntry(kind: SessionKind, seconds: number) {
  await loadLog();
  const minutes = Math.max(1, Math.round(seconds / 60));
  const xp = Math.max(10, minutes * 2) + (kind === "full" ? 10 : 0);
  const entry: LogEntry = { id: String(Date.now()), kind, minutes, day: localDay(), xp };
  entries = [entry, ...entries];
  emit();
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(entries));
  } catch {
    // keep in memory if storage fails
  }
  return entry;
}

export async function clearLog() {
  entries = [];
  emit();
  try {
    await AsyncStorage.removeItem(KEY);
  } catch {}
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

export function useLog(): LogEntry[] {
  return useSyncExternalStore(subscribe, () => entries, () => entries);
}

// Generic persisted JSON setting.
export async function getSetting<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(`sipa.setting.${key}`);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
export async function setSetting<T>(key: string, value: T) {
  try {
    await AsyncStorage.setItem(`sipa.setting.${key}`, JSON.stringify(value));
  } catch {}
}
