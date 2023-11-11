import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../features/userSlice";
import NotifyMessage from "../components/messages/NotifyMessage";
import { RootState } from "../store";
import { deleteMessage, setMessage } from "../features/messageSlice";
import LoginSubmitButton from "../components/main/LoginSubmitButton";
import { LoginDataType } from "../interface/interface";

function Login() {
  const [loginData, setLoginData] = useState<LoginDataType>({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const messenger = useSelector((state: RootState) => state.messenger);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.ChangeEvent<null>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + `/api/user/login`,
        { ...loginData }
      );

      const data = await response.data;

      if (data) {
        const { email, token }: { email: string | null; token: string | null } =
          data;
        dispatch(loadUser({ email, token }));
        dispatch(deleteMessage());
      }
    } catch (err: unknown | AxiosError) {
      if (axios.isAxiosError(err)) {
        dispatch(
          setMessage({
            message: err.message,
            messageType: err.status,
          })
        );
      }
    }

    setLoginData({ email: "", password: "" });
  };

  return (
    <>
      <div>
        <h3 className="text-2xl font-semibold">Login</h3>
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
            onChange={handleInput}
            value={loginData.email}
          ></input>
          <label className="my-2">Password</label>
          <input
            type="password"
            placeholder="Type your password"
            className="p-2 border-2 border-black focus:outline-none focus:ring focus:ring-white"
            required
            name="password"
            onChange={handleInput}
            value={loginData.password}
          ></input>
          <LoginSubmitButton
            buttonText={"Login"}
            customClass={""}
          ></LoginSubmitButton>
        </form>
        <p className=" text-md text-gray-600">
          Create a new account?{" "}
          <a className=" font-semibold text-red-700" href="/signup">
            Sign up here
          </a>
        </p>
        {messenger.message !== null && messenger.messageType && (
          <NotifyMessage
            message={messenger.message}
            messageType={messenger.messageType}
          ></NotifyMessage>
        )}
      </div>
    </>
  );
}

export default Login;
