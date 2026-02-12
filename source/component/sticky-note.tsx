import { useDraggable } from "@dnd-kit/core";
import { clsx } from "clsx";
import { useState, type PointerEventHandler } from "react";
import { CSS } from "@dnd-kit/utilities";
import { clamp } from "@/helper/number";
import type { StickyNote } from "@/model/sticky-note";

export interface Props {
  color?: string;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  id: string;
  content?: string;
  isEditing?: boolean;
  onResize: (id: string, width: number, height: number) => void;
  updateNode: (id: string, payload: Partial<StickyNote>) => void;
}

export function StickyNote({
  id,
  width = 250,
  height = 200,
  x = 10,
  y = 10,
  color = "neutral",
  onResize,
  content,
  isEditing,
  updateNode,
}: Props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    disabled: isEditing,
  });

  const [isResizing, setIsResizing] = useState(false);

  const handlePointerDown: PointerEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    setIsResizing(true);

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = width;
    const startHeight = height;

    const handlePointerMove = (event: MouseEvent) => {
      const newWidth = startWidth + (event.clientX - startX);
      const newHeight = startHeight + (event.clientY - startY);

      onResize(id, clamp(newWidth, 100, 600), clamp(newHeight, 80, 500));
    };

    const handlePointerUp = () => {
      setIsResizing(false);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
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
