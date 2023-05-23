import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  email: string | null;
  token: string | null;
}
const initialState: InitialState = { email: "", token: "" };

const userSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
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

export const { loadUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
