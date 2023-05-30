import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./features/taskSlice";
import userReducer from "./features/userSlice";
import messageReducer from "./features/messageSlice";

export const store = configureStore({
  reducer: {
    tasker: taskReducer,
    userAuth: userReducer,
    messenger: messageReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
