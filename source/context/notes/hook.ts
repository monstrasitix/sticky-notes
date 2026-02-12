import type { StickyNote } from "@/model/sticky-note";
import { createContext, useContext } from "react";

export type Context = {
  list: StickyNote[];
  add(x: number, y: number): void;
  remove(): void;
  toggleEditable(id: string, isEditing: boolean): void;
  move(id: string, x: number, y: number): void;
  resize(id: string, width: number, y: number): void;
  clear(): void;
  update(id: string, payload: Partial<StickyNote>): void;
};

export const NotesContext = createContext<Context>({
  list: [],
  add() {},
  remove() {},
  move() {},
  clear() {},
  resize() {},
  toggleEditable() {},
  update() {},
});

export function useNotes(): Context {
  return useContext(NotesContext);
}

export function useToolbarNotes(): Pick<Context, "clear" | "add"> {
  const ctx = useContext(NotesContext);

  return {
    clear: ctx.clear,
    add: ctx.add,
  };
}
