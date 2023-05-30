import { createSlice } from "@reduxjs/toolkit";

const initialState = { message: null, messageType: null };

const messageSlice = createSlice({
  name: "messenger",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload.message;
      state.messageType = action.payload.messageType;
    },
    deleteMessage: (state) => {
      state.message = null;
      state.messageType = null;
    },
  },
});

export const { setMessage, deleteMessage } = messageSlice.actions;
export default messageSlice.reducer;
