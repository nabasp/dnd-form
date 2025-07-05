import { WidthProvider, Responsive } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { TableDemo } from "../DemoTable";
import type { DroppedItem } from "@/store/slice";
import { Trash } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { SwitchDemo } from "../SwitchDemo";

const ReactGridLayout = WidthProvider(Responsive);
const componentWrapperStyle =
  "border border-transparent hover:border-dotted hover:border-gray-500 flex items-center justify-center p-3";

interface BasicGridProps {
  layout: DroppedItem[];
  onUpdate?: (id: string, updates: Partial<DroppedItem>) => void;
  onRemove?: (id: string) => void;
  editMode?: boolean;
}
const BasicGrid = ({
  layout,
  onUpdate,
  onRemove,
  editMode,
}: BasicGridProps) => {
  const cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };
  const rowHeight = 30;

  const handleLayoutChange = (layout: DroppedItem[]) => {
    layout.forEach((updated) => {
      onUpdate?.(updated.i, {
        x: updated.x,
        y: updated.y,
        w: updated.w,
        h: updated.h,
      });
    });
  };

  const ComponentWrapper = ({
    id,
    children,
  }: {
    id: string;
    children: any;
  }) => {
    if (editMode) {
      return children;
    }

    return (
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side="bottom" align="center">
          <Trash
            className="ml-2 cursor-pointer"
            onClick={() => onRemove?.(id)}
          />
        </TooltipContent>
      </Tooltip>
    );
  };

  function renderComponent(item: any) {
    switch (item.type) {
      case "button":
        return (
          <div key={item.i} data-grid={item} className={componentWrapperStyle}>
            <ComponentWrapper id={item.i}>
              <Button>{`Button ${item.i}`}</Button>
            </ComponentWrapper>
          </div>
        );
      case "input":
        return (
          <div key={item.i} data-grid={item} className={componentWrapperStyle}>
            <ComponentWrapper id={item.i}>
              <Input placeholder={`Input ${item.i}`} />
            </ComponentWrapper>
          </div>
        );
      case "switch":
        return (
          <div key={item.i} data-grid={item} className={componentWrapperStyle}>
            <ComponentWrapper id={item.i}>
              <SwitchDemo />
            </ComponentWrapper>
          </div>
        );
      case "label":
        return (
          <div key={item.i} data-grid={item} className={componentWrapperStyle}>
            <ComponentWrapper id={item.i}>
              <Label>{`Label ${item.i}`}</Label>
            </ComponentWrapper>
          </div>
        );
      case "table":
        return (
          <div key={item.i} data-grid={item} className={componentWrapperStyle}>
            <ComponentWrapper id={item.i}>
              <TableDemo />
            </ComponentWrapper>
          </div>
        );
      // Add more cases for different component types as needed
      default:
        return <div>{`Unknown component type: ${item.type}`}</div>;
    }
  }

  return (
    <ReactGridLayout
      isDraggable={editMode}
      isResizable={editMode}
      className="layout"
      layouts={{ lg: layout }}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={cols}
      rowHeight={rowHeight}
      onLayoutChange={handleLayoutChange}
    >
      {layout.map((item: any) => renderComponent(item))}
    </ReactGridLayout>
  );
};

export default BasicGrid;
