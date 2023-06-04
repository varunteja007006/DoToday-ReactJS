import { createSlice } from "@reduxjs/toolkit";
import { MessageType } from "../interface/interface";

const initialState: MessageType = { message: null, messageType: null };

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
