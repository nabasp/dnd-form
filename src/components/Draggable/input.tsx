import { useDraggable } from "@dnd-kit/react";
import { Input } from "../ui/input";

export function DraggableInput({ id }: { id?: string }) {
  const { ref } = useDraggable({
    id: id || "draggable-input",
  });

  return (
    <div ref={ref} className="p-3 hover:border">
      <Input placeholder="Drag me" disabled />
    </div>
  );
}
