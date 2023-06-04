import { createSlice } from "@reduxjs/toolkit";
import { UserInitialStateType, UserType } from "../interface/interface";

const IsAuthenticated = (): UserType | null => {
  const userdata: any = localStorage.getItem("user");
  const user: UserType | null = JSON.parse(userdata);
  if (user) {
    return user;
  } else {
    return null;
  }
};

const getUserData = IsAuthenticated();
const initialState: UserInitialStateType = {
  user: getUserData,
};

const userSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    loadUser: (state, action) => {
      const userAuthData = action.payload;
      state.user = userAuthData;
      localStorage.setItem("user", JSON.stringify(userAuthData));
    },
    deleteUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { loadUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
