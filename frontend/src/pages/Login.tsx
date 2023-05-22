import axios from "axios";
import React, { useState } from "react";

function Login() {
  const [loginData, setLoginData] = useState({});

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.ChangeEvent<null>) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/api/user/login", { ...loginData })
      .then((data) => {
        console.log(data);
        setLoginData({});
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <form className=" flex flex-col p-2 w-screen" onSubmit={handleSubmit}>
        <label className="my-2">Email</label>
        <input
          type="text"
          placeholder="Type your email. Eg: test@xyz.com"
          className="p-2 w-1/2 border-2 border-red-600"
          required
          name="email"
          onChange={handleInput}
        ></input>
        <label className="my-2">Password</label>
        <input
          type="password"
          placeholder="Type your password"
          className="p-2 w-1/2 border-2 border-red-600"
          required
          name="password"
          onChange={handleInput}
        ></input>
        <button
          type="submit"
          className="border-2 border-red-600 w-fit p-2 my-5 font-semibold bg-red-200 hover:bg-red-600 hover:text-white"
        >
          Login
        </button>
      </form>
    </>
  );
}

export default Login;
