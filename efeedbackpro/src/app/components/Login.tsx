import { handleAuthErrors } from "@/helperfunctions/helperfunctions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [showPassword, setshowPassword] = useState(false);

  const router = useRouter();

  const showpwrd = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    ev.preventDefault();

    setshowPassword(true);
  };
  const hidepwrd = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    ev.preventDefault();
    setshowPassword(false);
  };

  const logintoaccount = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!email || !password) {
      return toast.error("Give all provided details");
    }
    try {
      const resp = await fetch(`../api/user/login`, {
        method: "POST",
        headers: {
          Content_Type: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await resp.json();
      // handle auth errors
      const errorMessage = handleAuthErrors(data.status);
      if (errorMessage) {
        return toast.error(errorMessage);
      }

      if (data.status === 200) {
        toast.success("Login Succesful ");
        // console.log(data.others);

        localStorage.setItem("user", JSON.stringify(data.others));
        setTimeout(() => {
          router.push("/dashboard");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form
        onSubmit={logintoaccount}
        className="  shadow-md flex flex-col p-3 h-80 md:w-96 w-11/12 justify-evenly rounded bg-white "
      >
        <Toaster />
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
          className=" cursor-pointer p-3 w-28 self-center mt-3 bg-gradient-to-r from-cyan-400 to-blue-400 rounded "
          type="submit"
          value="Login"
        />
      </form>
      <Link className="text-sm font-bold text-blue-400" href="/auth/confirm">
        Forgot password ?. Click here.
      </Link>
    </>
  );
};

export default Login;
