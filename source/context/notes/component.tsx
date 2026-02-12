import { useState, type PropsWithChildren } from "react";

import { NotesContext } from "@/context/notes/hook";
import type { StickyNote } from "@/model/sticky-note";
import * as storage from "@/storage";

export interface Props extends PropsWithChildren {}

export function NotesProvider({ children }: Props) {
  const [notes, setNotes] = useState<StickyNote[]>(storage.getNotes);

  const addNote = (x: number, y: number) => {
    setNotes((state) => {
      const newNotes = [
        ...state,
        {
          id: Date.now().toString(),
          x: x - 100,
          y: y - 50,
          color: "blue",
          width: 200,
          height: 200,
          content: "Content",
        },
      ];

      storage.setNotes(newNotes);

      return newNotes;
    });
  };

  const removeNote = () => {};

  const moveNote = (id: string, x: number, y: number) => {
    setNotes((state) => {
      const newNotes = state.map((note) => {
        if (note.id === id) {
          return { ...note, x: note.x + x, y: note.y + y };
        }

        return note;
      });
      storage.setNotes(newNotes);
      return newNotes;
    });
  };

  const clearNotes = () => {
    setNotes([]);
    storage.clearNotes();
  };

  const resizeNote = (id: string, width: number, height: number) => {
    setNotes((state) => {
      const newNotes = state.map((note) => {
        if (note.id === id) {
          return { ...note, width, height };
        }

        return note;
      });
      storage.setNotes(newNotes);
      return newNotes;
    });
  };

  const toggleEditable = (id: string, isEditing: boolean) => {
    setNotes((state) => {
      const newNotes = state.map((note) => {
        return {
          ...note,
          editing: note.id === id ? isEditing : false,
        };
      });
      storage.setNotes(newNotes);
      return newNotes;
    });
  };

  const update = (id: string, payload: Partial<StickyNote>) => {
    setNotes((state) => {
      const newNotes = state.map((note) => {
        if (note.id === id) {
          return { ...note, ...payload };
        }

        return note;
      });
      storage.setNotes(newNotes);
      return newNotes;
    });
  };

  return (
    <NotesContext.Provider
      children={children}
      value={{
        list: notes,
        add: addNote,
        remove: removeNote,
        clear: clearNotes,
        move: moveNote,
        resize: resizeNote,
        toggleEditable,
        update,
      }}
    />
  );
}
