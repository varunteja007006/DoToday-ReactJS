import { useDispatch, useSelector } from "react-redux";
import { redirect } from "react-router-dom";
import { deleteUser } from "../../features/userSlice";
import { RootState } from "../../store";
import { deleteMessage } from "../../features/messageSlice";

function LogoutButton() {
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
    </>
  );
}

export default LogoutButton;
