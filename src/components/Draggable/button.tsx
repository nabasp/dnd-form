import { useDraggable } from "@dnd-kit/react";
import { Button } from "../ui/button";

export function DraggableButton({ id, ...restProps }: any) {
  const { ref } = useDraggable({
    id: id || "draggable-button",
  });

  return (
    <div ref={ref} className="p-3 hover:border">
      <Button disabled {...restProps}>
        Drag Me
      </Button>
    </div>
  );
}
