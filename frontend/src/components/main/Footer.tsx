import { useSelector } from "react-redux";
import { RootState } from "../../store";

function Footer() {
  const userAuth = useSelector((state: RootState) => state.userAuth);
  const { user }: any = userAuth;
  return (
    <>
      <footer className="bg-secondary text-center text-black font-semibold">
        <div className="items-center justify-center p-6 lg:justify-between gap-4  flex lg:flex-row flex-col">
          {user && (
            <div className="text-sm">
              <span>
                Logged in as {user.email}. Not you?{" "}
                <a className="" href="/logout">
                  Log out
                </a>
              </span>
            </div>
          )}
          <div className="text-sm">
            <span>Made with 💚Vite + 💙React + 🧡TypeScript</span>
          </div>
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
