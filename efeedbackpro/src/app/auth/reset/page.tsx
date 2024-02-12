"use client";
import Loading from "@/app/components/Loading";
import { handleconfirmpassworderrors } from "@/helperfunctions/helperfunctions";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Reset = () => {
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const [showPassword, setshowPassword] = useState(false);
  const route = useRouter();
  const params = useSearchParams();
  const email = params.get("email");
  const showpwrd = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    ev.preventDefault();

    setshowPassword(true);
  };
  const hidepwrd = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    ev.preventDefault();
    setshowPassword(false);
  };

  const resetpasswor = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!password || !email) {
      return toast.error("Give all provided details");
    }
    setloading(true);
    try {
      const resp = await fetch(`/api/user/resetpassword`, {
        method: "PUT",
        headers: {
          Content_Type: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await resp.json();
      // handle auth errors
      setloading(false);
      const errorMessage = handleconfirmpassworderrors(data.status);
      if (errorMessage) {
        return toast.error(errorMessage);
      }

      if (data.status === 200) {
        toast.success("password Changed");
        // console.log(data.others);
        setTimeout(() => {
          route.push("/auth");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };

  return (
    <div className=" mt-7 w-screen  flex flex-col items-center justify-center  ">
      <p>Enter your new Password</p>
      <Toaster />
      {loading ? (
        <Loading />
      ) : (
        <form
          onSubmit={resetpasswor}
          className="   flex flex-col p-3 h-80 md:w-96 w-11/12 justify-evenly"
        >
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
            value="Change Password"
          />
        </form>
      )}
    </div>
  );
};

export default Reset;
