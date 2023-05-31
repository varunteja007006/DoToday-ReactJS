import { useSelector } from "react-redux";
import { RootState } from "../../store";

function Footer() {
  const userAuth = useSelector((state: RootState) => state.userAuth);
  const { user }: any = userAuth;
  return (
    <>
      <footer className="bg-secondary text-center text-black font-semibold lg:text-left">
        <div className="flex items-center justify-center p-6 lg:justify-between">
          {user && (
            <div className="mr-12 hidden lg:block text-sm">
              <span>
                Logged in as {user.email}. Not you?{" "}
                <a className=" font-semibold" href="/logout">
                  Log out
                </a>
              </span>
            </div>
          )}
          <div className="text-sm">
            <span>Follow us on Instagram</span>
          </div>
          <div className="text-sm">
            <span>Follow us on Facebook</span>
          </div>
          <div className="text-sm">
            <span>
              © 2023 copyright:
              https://github.com/varunteja007006/DoToday-ReactJS
            </span>
          </div>
          <div className="text-sm">
            <span>Made with 💚Vite + 💙React + 🧡TypeScript</span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
