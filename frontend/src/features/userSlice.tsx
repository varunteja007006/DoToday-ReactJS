import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  email: string | null;
  token: string | null;
}
type UserType = {
  email?: string;
  token?: string;
};

const initialState: InitialState = { email: "", token: "" };

const userSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    checkUser: (state, action) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    loadUser: (state, action) => {
      const userAuthData = action.payload;
      state.email = userAuthData.email;
      state.token = userAuthData.token;
      localStorage.setItem("user", JSON.stringify(userAuthData));
    },
    deleteUser: (state) => {
      state.email = "";
      state.token = "";
      localStorage.removeItem("user");
    },
  },
});

export const { loadUser, deleteUser, checkUser } = userSlice.actions;
export default userSlice.reducer;
