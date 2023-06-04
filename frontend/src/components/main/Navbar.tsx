import { useDispatch, useSelector } from "react-redux";
import { Link, redirect } from "react-router-dom";
import { deleteUser } from "../../features/userSlice";
import { RootState } from "../../store";
import { deleteMessage } from "../../features/messageSlice";

function Navbar() {
  const dispatch = useDispatch();
  const userAuth = useSelector((state: RootState) => state.userAuth);
  const { user } = userAuth;
  const handleLogout = () => {
    dispatch(deleteUser());
    dispatch(deleteMessage());
    redirect("/login");
  };

  return (
    <>
      <nav className="flex justify-between bg-primary py-3 items-center text-white font-semibold">
        <div>
          <Link to="/" className="text-4xl p-2">
            🔥DoToday
          </Link>
        </div>
        <div className="order-last text-black">
          {user && (
            <>
              <button
                className=" rounded-lg w-fit p-2 my-3 bg-quaternary border-2 border-black transition ease-in-out delay-150 hover:translate-y-1 hover:scale-95 duration-300 mx-3"
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
