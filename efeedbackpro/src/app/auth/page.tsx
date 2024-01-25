"use client";
import React, { useState } from "react";
import Signup from "../components/Signup";
import Login from "../components/Login";

const Auth = () => {
  const [isLogin, setisLogin] = useState(true);

  return (
    <main className="min-h-screen flex md:justify-center items-center flex-col ">
      <div className=" mt-5 shadow-md flex  md:w-96 w-11/12 justify-evenly rounded  ">
        <button
          onClick={() => setisLogin(true)}
          className={` font-bold text-2xl flex-1 h-14  text-sm  ${
            !isLogin ? "bg-gradient-to-r from-cyan-400 to-blue-400" : "bg-white"
          }   rounded `}
        >
          Login
        </button>
        <button
          onClick={() => setisLogin(false)}
          className={` font-bold text-2xl flex-1 h-14  text-sm  ${
            isLogin ? "bg-gradient-to-r from-cyan-400 to-blue-400" : "bg-white"
          }   rounded `}
        >
          Sign up
        </button>
      </div>
      {isLogin ? <Login /> : <Signup />}
    </main>
  );
};

export default Auth;
