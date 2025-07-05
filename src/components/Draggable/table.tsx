import { useDraggable } from "@dnd-kit/react";
import { Table } from "lucide-react";

export function DraggableTable({ id }: { id?: string }) {
  const { ref } = useDraggable({
    id: id || "draggable-table",
  });

  return (
    <div ref={ref} className="p-3 hover:border flex items-center gap-4">
      <Table className="h-4 w-4" /> <span>Table</span>
    </div>
  );
}
