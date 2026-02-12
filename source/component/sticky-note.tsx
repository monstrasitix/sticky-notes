import { useDraggable } from "@dnd-kit/core";
import { clsx } from "clsx";
import { useState, type PointerEventHandler } from "react";
import { CSS } from "@dnd-kit/utilities";
import { clamp } from "@/helper/number";
import type { StickyNote } from "@/model/sticky-note";
import {
  NOTE_DEFAULT_COLOR,
  NOTE_DEFAULT_HEIGHT,
  NOTE_DEFAULT_WIDTH,
} from "@/constants";

export interface Props {
  color?: string;
  width?: number;
  height?: number;
  x: number;
  y: number;
  id: string;
  content?: string;
  isEditing?: boolean;
  onResize: (id: string, width: number, height: number) => void;
  updateNode: (id: string, payload: Partial<StickyNote>) => void;
}

export function StickyNote({
  id,
  color = NOTE_DEFAULT_COLOR,
  width = NOTE_DEFAULT_WIDTH,
  height = NOTE_DEFAULT_HEIGHT,
  x,
  y,
  onResize,
  content,
  isEditing,
  updateNode,
}: Props) {
  const [isResizing, setIsResizing] = useState(false);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    disabled: isEditing,
  });

  const handlePointerDown: PointerEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    setIsResizing(true);

    const handlePointerMove = (event: MouseEvent) => {
      const newWidth = width + (event.clientX - e.clientX);
      const newHeight = height + (event.clientY - e.clientY);

      onResize(
        //
        id,
        clamp(newWidth, 100, 600),
        clamp(newHeight, 80, 500),
      );
    };

    const handlePointerUp = () => {
      setIsResizing(false);

      removeEventListener("pointermove", handlePointerMove);
      removeEventListener("pointerup", handlePointerUp);
    };

    addEventListener("pointermove", handlePointerMove);
    addEventListener("pointerup", handlePointerUp);
  };

  const [input, setInput] = useState(content);

  return (
    <div
      ref={setNodeRef}
      style={{
        position: "absolute",
        width,
        height,
        top: y,
        left: x,
        transform: CSS.Translate.toString(transform),
      }}
      className={clsx("sticky-note", `-color-${color}`)}
      {...(!isResizing || !isEditing ? listeners : {})}
      {...attributes}
      onDoubleClick={() => {
        updateNode(id, { editing: true });
        setInput(content);
      }}
    >
      {isEditing ? (
        <>
          <textarea
            autoFocus
            onChange={(e) => {
              setInput(e.target.value);
            }}
            className="sticky-note-input"
            value={input}
            style={{
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />

          <div className="sticky-note-form">
            <button
              onClick={() => {
                updateNode(id, { editing: false, content });
              }}
              type="button"
              className="button -primary"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                updateNode(id, { editing: false, content: input });
              }}
              type="button"
              className="button -primary"
            >
              Save
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="sticky-note-content">{content}</div>
          <div
            className="sticky-note-resize"
            onPointerDown={handlePointerDown}
          />
        </>
      )}
    </div>
  );
}
