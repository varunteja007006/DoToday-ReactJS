import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  user: object | null;
}

const IsAuthenticated = (): object | null => {
  console.log("run");
  const user: unknown = localStorage.getItem("user");
  if (user) {
    return user;
  } else {
    return null;
  }
};

const getUserData = IsAuthenticated();
const initialState: InitialState = {
  user: getUserData,
};

const userSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    checkUser: (state, action) => {
      state.user = action.payload;
    },
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

export const { loadUser, deleteUser, checkUser } = userSlice.actions;
export default userSlice.reducer;
