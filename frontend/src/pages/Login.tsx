import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "../features/userSlice";

type LoginDataType = {
  email?: string;
  password?: string;
};

function Login() {
  const [loginData, setLoginData] = useState<LoginDataType>({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.ChangeEvent<null>) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/api/user/login", { ...loginData })
      .then((response) => {
        const { email, token }: { email: string | null; token: string | null } =
          response.data;
        dispatch(loadUser({ email, token }));
        setLoginData({ email: "", password: "" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <h3 className="text-2xl">Login</h3>
      <form className=" flex flex-col w-1/2" onSubmit={handleSubmit}>
        <label className="my-2">Email</label>
        <input
          type="text"
          placeholder="Type your email. Eg: test@xyz.com"
          className="p-2 border-2 border-red-600"
          required
          name="email"
          onChange={handleInput}
          value={loginData.email}
        ></input>
        <label className="my-2">Password</label>
        <input
          type="password"
          placeholder="Type your password"
          className="p-2 border-2 border-red-600"
          required
          name="password"
          onChange={handleInput}
          value={loginData.password}
        ></input>
        <button
          type="submit"
          className="border-2 border-red-600 w-fit p-2 my-5 font-semibold bg-red-200 hover:bg-red-600 hover:text-white"
        >
          Login
        </button>
      </form>
      <p className=" text-md text-gray-600">
        Create a new account?{" "}
        <a className=" font-semibold text-red-700" href="/signup">
          Sign up here
        </a>
      </p>
    </>
  );
}

export default Login;
