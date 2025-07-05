import { DraggableButton } from "../Draggable/button";
import { DraggableInput } from "../Draggable/input";
import { DraggableLabel } from "../Draggable/label";
import { DraggableSwitch } from "../Draggable/switch";
import { DraggableTable } from "../Draggable/table";

export default function ToolBar() {
  return (
    <div className="flex flex-col gap-4 items-center">
      <DraggableButton />
      <DraggableInput />
      <DraggableSwitch />
      <DraggableLabel />
      <DraggableTable />
    </div>
  );
}
