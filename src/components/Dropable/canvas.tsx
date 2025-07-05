import { useDroppable } from "@dnd-kit/react";

export default function Canvas({ id, children }: any) {
  const { ref } = useDroppable({
    id,
  });

  return (
    <div ref={ref} className="w-full h-full">
      {children}
    </div>
  );
}
