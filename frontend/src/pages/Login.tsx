import React from "react";

function Login() {
  return (
    <>
      <form className=" flex flex-col p-2 w-screen">
        <label className="my-2">Email</label>
        <input
          type="text"
          placeholder="Type your email. Eg: test@xyz.com"
          className="p-2 w-1/2 border-2 border-red-600"
          required
        ></input>
        <label className="my-2">Password</label>
        <input
          type="password"
          placeholder="Type your password"
          className="p-2 w-1/2 border-2 border-red-600"
          required
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
