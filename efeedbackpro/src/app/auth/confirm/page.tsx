"use client";
import Loading from "@/app/components/Loading";
import { handleconfirmpassworderrors } from "@/helperfunctions/helperfunctions";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const ConfirmMail = () => {
  const [email, setemail] = useState("");
  const [loading, setloading] = useState(false);

  const sendMailconfirm = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!email) {
      return toast.error("Give all provided details");
    }
    setloading(true);
    try {
      const resp = await fetch(`/api/user/resetpassword`, {
        method: "POST",
        headers: {
          Content_Type: "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await resp.json();
      // handle auth errors
      setloading(false);
      const errorMessage = handleconfirmpassworderrors(data.status);
      if (errorMessage) {
        return toast.error(errorMessage);
      }

      if (data.status === 200) {
        toast.success("passwprd reset link has been sent to you email");
        // console.log(data.others);
      }
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };

  return (
    <div className=" mt-7 w-screen  flex flex-col items-center justify-center  ">
      <p>Confirm your email</p>
      <Toaster />
      {loading ? (
        <Loading />
      ) : (
        <form
          onSubmit={sendMailconfirm}
          className="   flex flex-col p-3 h-80 md:w-96 w-11/12 justify-evenly"
        >
          <input
            onChange={(ev) => setemail(ev.target.value)}
            className="p-3 shadow-md"
            type="email"
            placeholder="email"
          />
          <input
            className=" cursor-pointer p-3 w-28 self-center mt-3 bg-gradient-to-r from-cyan-400 to-blue-400 rounded "
            type="submit"
            value="Confirm"
          />
        </form>
      )}
    </div>
  );
};

export default ConfirmMail;
