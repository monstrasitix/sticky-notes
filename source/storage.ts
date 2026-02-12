import type { StickyNote } from "./model/sticky-note";

const KEY_STICKY_NOTES = "sticky-notes-list";

export function getNotes(): StickyNote[] {
  try {
    return JSON.parse(localStorage.getItem(KEY_STICKY_NOTES) ?? "[]");
  } catch {
    return [];
  }
}

export function setNotes(newNotes: StickyNote[]) {
  localStorage.setItem(KEY_STICKY_NOTES, JSON.stringify(newNotes));
}

export function clearNotes() {
  localStorage.removeItem(KEY_STICKY_NOTES);
}
