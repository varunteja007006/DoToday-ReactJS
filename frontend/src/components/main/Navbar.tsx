import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser } from "../../features/userSlice";
import { RootState } from "../../store";

function Navbar() {
  const dispatch = useDispatch();
  const userAuth = useSelector((state: RootState) => state.userAuth);
  const { user }: any = userAuth;
  const handleLogout = () => {
    dispatch(deleteUser());
  };

  return (
    <nav className="bg-red-200 flex flex-row gap-4">
      <Link to="/" className="text-4xl p-2">
        DoToday
      </Link>{" "}
      <div className="text-lg items-center flex flex-row gap-4">
        {" "}
        <Link
          to="/"
          className="bg-red-300 hover:bg-red-400 border-2 border-red-600 p-2 rounded-md font-semibold"
        >
          Home
        </Link>
        {user && (
          <>
            <button
              className="bg-red-300 hover:bg-red-400 border-2 border-red-600 p-2 rounded-md font-semibold"
              onClick={handleLogout}
            >
              Logout
            </button>
            <p className="text-sm hover:cursor-pointer">{user.email}</p>
          </>
        )}
        {!user && (
          <>
            <Link
              to="/login"
              className="bg-red-300 hover:bg-red-400 border-2 border-red-600 p-2 rounded-md font-semibold"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-red-300 hover:bg-red-400 border-2 border-red-600 p-2 rounded-md font-semibold"
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
