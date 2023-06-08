import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../store";
import LogoutButton from "./LogoutButton";

function Navbar() {
  const userAuth = useSelector((state: RootState) => state.userAuth);
  const { user } = userAuth;

  return (
    <>
      <nav className="flex justify-between bg-primary py-3 items-center text-white font-semibold">
        <div>
          <Link to="/" className="text-4xl p-2 flex flex-row">
            <div className=" animate-pulseLogo hover:animate-bounce">🔥</div>
            DoToday
          </Link>
        </div>
        <div className="order-last text-black">
          <LogoutButton></LogoutButton>
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
