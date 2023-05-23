import Navbar from "./components/main/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useSelector } from "react-redux";
import { RootState } from "./store";
type UserAuthType = {
  email?: string | null;
  token?: string | null;
};

function App() {
  const userAuth: UserAuthType = useSelector((state: RootState) => {
    state.userAuth;
    if (state.userAuth.email) {
      return state.userAuth;
    } else {
      return { email: "", token: "" };
    }
  });
  return (
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route
          path="/"
          element={userAuth.email ? <Home></Home> : <Login></Login>}
        ></Route>
        <Route
          path="/login"
          element={!userAuth.email ? <Login></Login> : <Home></Home>}
        ></Route>
        <Route
          path="/signup"
          element={!userAuth.email ? <Signup></Signup> : <Home></Home>}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
