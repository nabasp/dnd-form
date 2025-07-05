import { DragDropProvider } from "@dnd-kit/react";
import Canvas from "./components/Dropable/canvas";
import ToolBar from "./components/ToolBar";
import BasicGrid from "./components/Dropable/GridLayout";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "./store/store";
import {
  addDroppedItem,
  removeDroppedItem,
  updateDroppedItem,
  type DroppedItem,
} from "./store/slice";
import { useState } from "react";
import { Button } from "./components/ui/button";
import { Edit2Icon, Lock } from "lucide-react";
import { Card } from "./components/ui/card";

function App() {
  const [editMode, setEditMode] = useState<boolean>(true);

  const dispatch = useDispatch();
  const droppedItems = useSelector(
    (state: RootState) => state.canvas.droppedItems
  );

  const onDragEnd = (event: any) => {
    if (event.canceled) return;

    const { source } = event.operation;
    const i = droppedItems.length;
    const h = 2;

    const baseItem = {
      x: (i * 2) % 12,
      y: Math.floor(i / 6) * h,
      i: i.toString(),
    };

    let newItem;

    switch (source?.id) {
      case "draggable-button":
        newItem = { ...baseItem, w: 2, h, type: "button" };
        break;
      case "draggable-input":
        newItem = { ...baseItem, w: 2, h, type: "input" };
        break;
      case "draggable-switch":
        newItem = { ...baseItem, w: 2, h, type: "switch" };
        break;
      case "draggable-label":
        newItem = { ...baseItem, w: 2, h, type: "label" };
        break;
      case "draggable-table":
        newItem = { ...baseItem, w: 4, h: 12, type: "table" };
        break;
      default:
        console.log("Unknown draggable item dropped");
        return;
    }

    dispatch(addDroppedItem(newItem));
  };

  const onUpdate = (id: string, updates: Partial<DroppedItem>) => {
    dispatch(updateDroppedItem({ id, updates }));
  };

  const onRemove = (id: string) => {
    dispatch(removeDroppedItem(id));
  };

  return (
    <DragDropProvider onDragEnd={onDragEnd}>
      <div className="w-full h-full flex flex-col gap-4 p-4">
        <nav className="flex items-center justify-center w-full gap-5 h-20">
          <h1 className="text-2xl font-bold">Drag & Drop Canvas</h1>
          <Button onClick={() => setEditMode(!editMode)}>
            {editMode ? <Lock /> : <Edit2Icon />}
          </Button>
        </nav>
        <main className="w-full h-full flex gap-4 p-4">
          <aside>
            <Card className="sticky top-0 h-[70vh] flex flex-col gap-4 p-4 w-[20rem] items-center overflow-scroll">
              <h4 className="text-2xl font-bold">Component</h4>
              <ToolBar />
            </Card>
          </aside>
          <section className="flex-1 rounded-2xl bg-white overflow-scroll">
            <Canvas id="canvas">
              <BasicGrid
                layout={droppedItems}
                onUpdate={onUpdate}
                onRemove={onRemove}
                editMode={editMode}
              />
            </Canvas>
          </section>
        </main>
      </div>
    </DragDropProvider>
  );
}

export default App;
