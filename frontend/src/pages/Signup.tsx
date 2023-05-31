import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../features/userSlice";
import NotifyMessage from "../components/messages/NotifyMessage";
import { RootState } from "../store";
import { deleteMessage, setMessage } from "../features/messageSlice";
import LoginSubmitButton from "../components/main/LoginSubmitButton";

//Typescript for email and password properties of signupData
type SignupDataType = {
  email?: string;
  password?: string;
};

function Signup() {
  const [signupData, setSignupData] = useState<SignupDataType>({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const messenger = useSelector((state: RootState) => state.messenger);
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.ChangeEvent<null>) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/api/user/signup", { ...signupData })
      .then((response) => {
        const { email, token }: { email: string | null; token: string | null } =
          response.data;
        dispatch(loadUser({ email, token }));
        dispatch(deleteMessage());
        setSignupData({ email: "", password: "" });
      })
      .catch((error) => {
        dispatch(
          setMessage({
            message: error.response.data.errorMessage,
            messageType: error.response.status,
          })
        );
      });
  };

  return (
    <>
      <h3 className="text-2xl">Sign up</h3>
      <form
        className=" flex flex-col w-100 lg:w-1/2 font-semibold"
        onSubmit={handleSubmit}
      >
        <label className="my-2">Email</label>
        <input
          type="text"
          placeholder="Type your email. Eg: test@xyz.com"
          className="p-2 border-2 border-black focus:outline-none focus:ring focus:ring-white"
          required
          name="email"
          id="email"
          onChange={handleInput}
          value={signupData.email}
        ></input>
        <label className="my-2">Password</label>
        <input
          type="password"
          placeholder="Type your password"
          className="p-2 border-2 border-black focus:outline-none focus:ring focus:ring-white"
          required
          name="password"
          id="password"
          onChange={handleInput}
          value={signupData.password}
        ></input>
        <LoginSubmitButton
          buttonText={"Sign up"}
          customClass={""}
        ></LoginSubmitButton>
      </form>
      <p className=" text-md text-gray-600">
        Already have an account?{" "}
        <a className=" font-semibold text-red-700" href="/login">
          Login here
        </a>
      </p>
      {messenger.message !== null && messenger.messageType && (
        <NotifyMessage
          message={messenger.message}
          messageType={messenger.messageType}
        ></NotifyMessage>
      )}
    </>
  );
}

export default Signup;
