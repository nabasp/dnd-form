import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type DroppedItem = {
  x: number;
  y: number;
  w: number;
  h: number;
  i: string; // unique ID
  type: string;
};

interface CanvasState {
  droppedItems: DroppedItem[];
}

const initialState: CanvasState = {
  droppedItems: [],
};

const canvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    addDroppedItem: (state, action: PayloadAction<DroppedItem>) => {
      state.droppedItems.push(action.payload);
    },
    removeDroppedItem: (state, action: PayloadAction<string>) => {
      state.droppedItems = state.droppedItems.filter(
        (item) => item.i !== action.payload
      );
    },
    updateDroppedItem: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<DroppedItem> }>
    ) => {
      const { id, updates } = action.payload;
      const item = state.droppedItems.find((item) => item.i === id);
      if (item) {
        Object.assign(item, updates);
      }
    },
    resetCanvas: () => initialState,
  },
});

export const {
  addDroppedItem,
  removeDroppedItem,
  updateDroppedItem,
  resetCanvas,
} = canvasSlice.actions;

export default canvasSlice.reducer;
