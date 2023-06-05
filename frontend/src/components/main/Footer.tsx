import { useSelector } from "react-redux";
import { RootState } from "../../store";
import LogoutButton from "./LogoutButton";

function Footer() {
  const userAuth = useSelector((state: RootState) => state.userAuth);
  const { user } = userAuth;
  return (
    <>
      <footer className="bg-secondary text-center text-black font-bold py-6">
        <div className="items-center justify-center lg:justify-evenly gap-4  flex lg:flex-row flex-col">
          {user && (
            <div className="text-sm">
              <span>
                Logged in as {user.email}. Not you? <LogoutButton />
              </span>
            </div>
          )}
          <div className="text-sm">
            <span>
              Built with 💚Vite + 💙React JS + 🧡TypeScript + 💛Node JS +
              💜Express JS + 🤍MongoDB
            </span>
          </div>
        </div>
        <div className="items-center justify-center p-6 lg:justify-evenly gap-4  flex lg:flex-row flex-col">
          <div className="text-sm">
            <span>
              © 2023 copyright:
              https://github.com/varunteja007006/DoToday-ReactJS
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
