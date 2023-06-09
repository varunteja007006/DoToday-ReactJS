import Navbar from "./components/main/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import Footer from "./components/main/Footer";

function App() {
  const userAuth = useSelector((state: RootState) => state.userAuth);
  const { user } = userAuth;

  return (
    <Router>
      <div className="w-full bg-tertiary min-h-screen overflow-hidden">
        <Navbar></Navbar>
        <div className="px-5 py-3">
          <Routes>
            <Route
              path="/"
              element={user ? <Home></Home> : <Navigate to="/login"></Navigate>}
            ></Route>
            <Route
              path="/login"
              element={!user ? <Login></Login> : <Navigate to="/"></Navigate>}
            ></Route>
            <Route
              path="/signup"
              element={!user ? <Signup></Signup> : <Navigate to="/"></Navigate>}
            ></Route>
          </Routes>
        </div>
      <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;
