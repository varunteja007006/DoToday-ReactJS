import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface InitialState {
  taskList: [];
}

const initialState: InitialState = { taskList: [] };

const taskSlice = createSlice({
  name: "tasker",
  initialState,
  reducers: {
    loadTask: (state, action) => {
      state.taskList = action.payload;
    },
    addTask: (state, action) => {
      state.taskList = action.payload;
    },
    deleteTask: (state, action) => {
      state.taskList = action.payload;
    },
  },
});

export const { loadTask, addTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
