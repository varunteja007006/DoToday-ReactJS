import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser } from "../../features/userSlice";
import { RootState } from "../../store";
import { deleteMessage } from "../../features/messageSlice";

function Navbar() {
  const dispatch = useDispatch();
  const userAuth = useSelector((state: RootState) => state.userAuth);
  const { user }: any = userAuth;
  const handleLogout = () => {
    dispatch(deleteUser());
    dispatch(deleteMessage());
  };

  return (
    <>
      <nav className="flex justify-between bg-primary py-3 items-center text-white font-semibold">
        <div>
          <Link to="/" className="text-4xl p-2">
            DoToday
          </Link>
        </div>
        <div className="order-last">
          {user && (
            <>
              <button
                className="mx-3 bg-quaternary hover:bg-yellow-200 text-black p-2 rounded-lg border-2 border-black"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
          {!user && (
            <>
              <Link
                className="mx-3 bg-quaternary hover:bg-yellow-200 text-black p-2 rounded-lg border-2 border-black"
                to="/login"
              >
                Login
              </Link>
              <Link
                className="mx-3 bg-quaternary hover:bg-yellow-200 text-black p-2 rounded-lg border-2 border-black "
                to="/signup"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
