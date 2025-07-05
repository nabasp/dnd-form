import { useDraggable } from "@dnd-kit/react";
import { Label } from "@radix-ui/react-label";

export function DraggableLabel({ id }: { id?: string }) {
  const { ref } = useDraggable({
    id: id || "draggable-label",
  });

  return (
    <div ref={ref} className="p-3 hover:border">
      <Label>label</Label>
    </div>
  );
}
