import { createSlice } from "@reduxjs/toolkit";

const taskList: [] = [];
const initialState: { taskList: [] } = { taskList };

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
    deleteTask: (state: any, action) => {
      const data: any = action.payload;
      const newTasks = state.taskList.filter(
        (task: any) => task._id !== data._id
      );
      state.taskList = newTasks;
    },
  },
});

export const { loadTask, addTask, updateTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
