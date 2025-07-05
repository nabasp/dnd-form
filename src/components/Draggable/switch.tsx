import { useDraggable } from "@dnd-kit/react";
import { Switch } from "../ui/switch";

export function DraggableSwitch({ id }: { id?: string }) {
  const { ref } = useDraggable({
    id: id || "draggable-switch",
  });

  return (
    <div ref={ref} className="p-3 hover:border">
      <Switch disabled />
    </div>
  );
}
