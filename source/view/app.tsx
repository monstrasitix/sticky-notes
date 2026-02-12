import { Playground } from "@/component/playground";
import { StickyNote } from "@/component/sticky-note";
import { useNotes } from "@/context/notes/hook";
import {
  closestCenter,
  DndContext,
  MeasuringStrategy,
  type DndContextProps,
} from "@dnd-kit/core";

export default function App() {
  const notes = useNotes();

  const handleNoteResize = (id: string, width: number, height: number) => {
    notes.resize(id, width, height);
  };

  const handleDragEnd: DndContextProps["onDragEnd"] = ({ active, delta }) => {
    notes.move(active.id.toString(), delta.x, delta.y);
  };

  return (
    <Playground>
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
            color={note.color}
            content={note.content}
            height={note.height}
            id={note.id}
            isEditing={note.editing}
            key={note.id}
            width={note.width}
            x={note.x}
            y={note.y}
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
