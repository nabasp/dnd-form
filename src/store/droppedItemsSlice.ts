import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DroppedItem {
  x: number;
  y: number;
  w: number;
  h: number;
  i: string;
  type: string;
}

interface DroppedItemsState {
  items: DroppedItem[];
}

const initialState: DroppedItemsState = {
  items: [],
};

const droppedItemsSlice = createSlice({
  name: "droppedItems",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<DroppedItem>) {
      state.items.push(action.payload);
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.i !== action.payload);
    },
  },
});

export const { addItem, removeItem } = droppedItemsSlice.actions;
export default droppedItemsSlice.reducer;
