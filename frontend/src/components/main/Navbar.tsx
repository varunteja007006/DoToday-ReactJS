import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser } from "../../features/userSlice";
import { RootState } from "../../store";

function Navbar() {
  const dispatch = useDispatch();
  const userAuth = useSelector((state: RootState) => state.userAuth);
  const { user } = userAuth;

  const handleLogout = () => {
    dispatch(deleteUser());
  };

  return (
    <nav className="bg-red-300 flex flex-row gap-4">
      <Link to="/" className="text-4xl p-2">
        DoToday
      </Link>{" "}
      <div className="text-lg items-center flex flex-row gap-4">
        {" "}
        <Link
          to="/"
          className="bg-red-500 hover:bg-red-400 border-2 border-red-600 p-2 rounded-md"
        >
          Home
        </Link>
        {user && (
          <button
            className="bg-red-500 hover:bg-red-400 border-2 border-red-600 p-2 rounded-md"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
        {!user && (
          <>
            <Link
              to="/login"
              className="bg-red-500 hover:bg-red-400 border-2 border-red-600 p-2 rounded-md"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-red-500 hover:bg-red-400 border-2 border-red-600 p-2 rounded-md"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
