import React, { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { handleFeedbackErrors } from "@/helperfunctions/helperfunctions";

type Props = {
  setfeebackFormModal: React.Dispatch<React.SetStateAction<boolean>>;
};
const FeedbackForm = ({ setfeebackFormModal }: Props) => {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [clientemail, setclientemail] = useState("");

  const createPost = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!title || !description! || !clientemail) {
      return toast("Provide the rquired details");
    }
    try {
      const data = {
        title,
        description,
        email: clientemail,
        businessid: "65a795adda605819ef4243fc",
      };

      const respData = await fetch(`./api/feedback`, {
        method: "POST",
        headers: {
          Content_Type: "application/json",
        },
        body: JSON.stringify(data),
      });

      const resp = await respData.json();
      if (resp.status === 200) {
        toast.success(" Thanks your response has been recorded");
        setTimeout(() => {
          setfeebackFormModal(false);
        }, 3000);
      } else {
        toast.error(handleFeedbackErrors(resp.status));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" flex justify-center md:items-center absolute bg-black   w-full h-full bg-opacity-80 ">
      <form
        onSubmit={createPost}
        className=" relative rounded p-5  w-11/12 max-w-screen-md bg-white flex flex-col  items-center  "
      >
        <Toaster />
        <FaWindowClose
          onClick={() => setfeebackFormModal(false)}
          className="absolute left-4 text-lg"
        />
        <h3 className="w-5/6 font-bold h-8  flex items-center justify-center  ">
          Make a sugestion
        </h3>
        <hr className=" w-full" />
        <div className="   w-5/6 flex flex-col justify-evenly min-h-48 ">
          <div className="flex flex-col gap-3">
            <label htmlFor="title">Title</label>
            <input
              onChange={(ev) => settitle(ev.target.value)}
              className=" rounded shadow h-9 outline outline-slate-300 outline-1 "
              type="text"
              id="title"
              required
              placeholder="A short descriptive title"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="email">Email</label>
            <input
              onChange={(ev) => setclientemail(ev.target.value)}
              className=" rounded shadow h-9 outline outline-slate-300 outline-1 "
              type="Email"
              id="email"
              required
              placeholder="Your Email Address"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="desc">Details</label>
            <textarea
              onChange={(ev) => setdescription(ev.target.value)}
              className=" rounded shadow min-h-14 outline outline-slate-300 outline-1 "
              name="desc"
              id="desc"
            ></textarea>
          </div>
        </div>
        <div className=" mt-4 w-5/6 flex justify-end flex-col md:flex-row ">
          <input type="file" name="uploadfiles" />
          <button className="bg-blue-400 p-1 text-white rounded ">
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;
