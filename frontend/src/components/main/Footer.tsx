import { useSelector } from "react-redux";
import { RootState } from "../../store";

function Footer() {
  const userAuth = useSelector((state: RootState) => state.userAuth);
  const { user }: any = userAuth;
  return (
    <>
      <footer className="bg-red-700 text-center text-neutral-200 lg:text-left">
        <div className="flex items-center justify-center border-b-2 border-neutral-200 p-6 dark:border-neutral-500 lg:justify-between">
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
          <div className="mr-12 hidden lg:block text-sm">
            <span>Follow us on Instagram</span>
          </div>{" "}
          <div className="mr-12 hidden lg:block text-sm">
            <span>Follow us on Facebook</span>
          </div>{" "}
          <div className="mr-12 hidden lg:block text-sm">
            <span> © 2023 copyright: www.DoToday.com</span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
