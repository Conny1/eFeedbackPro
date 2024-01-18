import { handleAuthErrors } from "@/helperfunctions/helperfunctions";
import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

const Signup = () => {
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [showPassword, setshowPassword] = useState(false);

  const showpwrd = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    ev.preventDefault();

    setshowPassword(true);
  };
  const hidepwrd = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    ev.preventDefault();
    setshowPassword(false);
  };

  const createAccount = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!name || !email || !password) {
      return alert("Give all provided details");
    }
    try {
      const resp = await fetch(`../api/user/signup`, {
        method: "POST",
        headers: {
          Content_Type: "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await resp.json();
      const errorMessage = handleAuthErrors(data.status);
      if (errorMessage) {
        return toast.error(errorMessage);
      }

      if (data.status === 200) {
        alert("Account created succesfully. You can now Log in ");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={createAccount}
      className="  shadow-md flex flex-col p-3 h-80 md:w-96 w-11/12 justify-evenly rounded bg-white "
    >
      <Toaster />
      <input
        onChange={(ev) => setname(ev.target.value)}
        className="p-3 shadow-md"
        type="text"
        placeholder="Name"
      />
      <input
        onChange={(ev) => setemail(ev.target.value)}
        className="p-3 shadow-md"
        type="email"
        placeholder="email"
      />
      <div className="flex">
        <input
          onChange={(ev) => setpassword(ev.target.value)}
          className="p-3 shadow-md flex-1"
          type={!showPassword ? "password" : "text"}
          placeholder="password"
        />
        {!showPassword ? (
          <button
            className="w-fit text-sm p-1  bg-gradient-to-r from-cyan-400 to-blue-400 rounded  "
            onClick={showpwrd}
          >
            show
          </button>
        ) : (
          <button
            className="w-fit text-sm p-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded  "
            onClick={hidepwrd}
          >
            Hide
          </button>
        )}
      </div>
      <input
        onChange={(ev) => setconfirmPassword(ev.target.value)}
        className="p-3 shadow-md"
        type={!showPassword ? "password" : "text"}
        placeholder="confirm password"
      />

      <input
        className=" cursor-pointer p-3 w-28 self-center mt-3 bg-gradient-to-r from-cyan-400 to-blue-400 rounded "
        type="submit"
        value="Signup"
      />
    </form>
  );
};

export default Signup;
