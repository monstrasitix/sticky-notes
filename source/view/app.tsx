import {
  Playground,
  type Props as PlaygroundProps,
} from "@/component/playground";
import { StickyNote } from "@/component/sticky-note";
import { useNotes } from "@/context/notes/hook";
import {
  closestCenter,
  DndContext,
  MeasuringStrategy,
  type DndContextProps,
} from "@dnd-kit/core";
import { useState } from "react";

export default function App() {
  const [isAdding, setAdding] = useState(false);

  const notes = useNotes();

  const handleClick: PlaygroundProps["onClick"] = (event) => {
    if (isAdding) {
      notes.add(event.clientX, event.clientY);
      setAdding(false);
    }
  };

  const handleAddNote = () => {
    setAdding(true);
  };

  const handleClearNotes = () => {
    notes.clear();
  };

  const handleNoteResize = (id: string, width: number, height: number) => {
    notes.resize(id, width, height);
  };

  const handleDragEnd: DndContextProps["onDragEnd"] = ({ active, delta }) => {
    notes.move(active.id.toString(), delta.x, delta.y);
  };

  return (
    <Playground isAdding={isAdding} onClick={handleClick}>
      <div className="toolbar">
        <button
          onClick={handleClearNotes}
          type="button"
          className="button -primary"
        >
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

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        measuring={{
          droppable: {
            strategy: MeasuringStrategy.Always,
          },
        }}
      >
        {notes.list.map((note) => (
          <StickyNote
            id={note.id}
            key={note.id}
            content={note.content}
            color={note.color}
            x={note.x}
            y={note.y}
            width={note.width}
            isEditing={note.editing}
            height={note.height}
            onResize={handleNoteResize}
            updateNode={(id, payload) => {
              notes.update(id, payload);
            }}
          />
        ))}
      </DndContext>
    </Playground>
  );
}
