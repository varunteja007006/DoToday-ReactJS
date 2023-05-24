import Navbar from "./components/main/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useSelector } from "react-redux";
import { RootState } from "./store";

function App() {
  const userAuth = useSelector((state: RootState) => state.userAuth);
  const { user } = userAuth;

  if (!user) {
    console.log("App", userAuth, user);
  }
  return (
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route
          path="/"
          element={user ? <Home></Home> : <Login></Login>}
        ></Route>
        <Route
          path="/login"
          element={!user ? <Login></Login> : <Home></Home>}
        ></Route>
        <Route
          path="/signup"
          element={!user ? <Signup></Signup> : <Home></Home>}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
