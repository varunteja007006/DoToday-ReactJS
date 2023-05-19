import { Link } from "react-router-dom";

function Navbar() {
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
        <button className="bg-red-500 hover:bg-red-400 border-2 border-red-600 p-2 rounded-md">
          Logout
        </button>
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
      </div>
    </nav>
  );
}

export default Navbar;
