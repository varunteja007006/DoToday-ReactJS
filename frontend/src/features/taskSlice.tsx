import { createSlice } from "@reduxjs/toolkit";
import { TaskListInitialStateType } from "../interface/interface";

const initialState: TaskListInitialStateType = { taskList: [] };

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
