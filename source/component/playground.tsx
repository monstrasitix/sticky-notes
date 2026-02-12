import clsx from "clsx";
import { useState, type PropsWithChildren } from "react";

import { useToolbarNotes } from "@/context/notes/hook";

export function Playground({ children }: PropsWithChildren) {
  const notes = useToolbarNotes();
  const [isAdding, setAdding] = useState(false);

  const handleAddNote = () => {
    setAdding(true);
  };

  const handleClear = () => {
    notes.clear();
  };

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    if (isAdding) {
      notes.add(event.clientX, event.clientY);
      setAdding(false);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={clsx("playground", { "-is-adding": isAdding })}
    >
      <div className="toolbar">
        <button onClick={handleClear} type="button" className="button -primary">
          Clear notes
        </button>

        <button
          onClick={handleAddNote}
          type="button"
          className="button -primary"
        >
          Add note
        </button>
      </div>

      {children}
    </div>
  );
}
