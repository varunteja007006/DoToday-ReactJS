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
    updateTask: (state, action) => {
      const data: any = action.payload;
      state.taskList.map((task: any) => {
        if (task._id === data._id) {
          task.status = data.status;
        }
      });
    },
    deleteTask: (state, action) => {
      state.taskList = action.payload;
    },
  },
});

export const { loadTask, addTask, updateTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
