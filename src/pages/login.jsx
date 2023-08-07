import LoginForm from "../components/LoginForm";
import Logo from "../components/Logo";
import SignUpForm from "../components/SignUpForm";
import React from "react";
import { useState } from "react";

function Login() {
  const [type, setType] = useState("login");
  return (
    <div className="w-screen h-screen bg-black flex flex-col space-y-6 items-center ">
      <div className="flex  space-x-4 p-3 mt-5  items-center">
        <Logo size={70} />
        <h1 className=" text-2xl uppercase font-bold ">
          <span className="text-white">fusion</span>
          <span className="text-blue-800 font-extrabold">ai</span>
        </h1>
      </div>
      <div className="w-[85%] sm:w-[60%] p-2 sm:p-4 glassBg space-y-5">
        <div className="flex space-x-3 text-slate-300 font-semibold text-xl">
          <button
          style={{
            fontSize:"15px"
          }}
           onClick={()=>setType('login')} className="bg-blue-800 rounded-md px-3 py-1">Login</button>
          <button
          style={{
            fontSize:"15px"
          }}
           onClick={()=>setType('signUp')} className="bg-blue-800 rounded-md px-3 py-1">Sign Up</button>
        </div>
        {type === "login" ? <LoginForm /> : <SignUpForm />}
      </div>
    </div>
  );
}

export default Login;
