import React, { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { handleFeedbackErrors } from "@/helperfunctions/helperfunctions";
import Loading from "./Loading";
import { plans } from "@/state/types";

type Props = {
  setfeebackFormModal: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  plan?: string;
};
const FeedbackForm = ({ setfeebackFormModal, id, plan }: Props) => {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [clientemail, setclientemail] = useState("");
  const [loading, setloading] = useState(false);
  const [images, setimages] = useState<FileList | null>(null);
  const [uploadUrl, setuploadUrl] = useState([]);

  const UploadImage = () => {};

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
        businessid: id,
      };
      setloading(true);

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
        setloading(false);
        setTimeout(() => {
          setfeebackFormModal(false);
        }, 3000);
      } else {
        // console.log(resp);
        setloading(false);
        return toast.error(handleFeedbackErrors(resp.status));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" flex justify-center md:items-center fixed bg-black   w-full h-full bg-opacity-80 ">
      {loading ? (
        <Loading />
      ) : (
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
            Make a sugestion or Give feedback
          </h3>
          <hr className=" w-full" />
          <div className="   w-5/6 flex flex-col justify-evenly min-h-48 ">
            <div className="flex flex-col gap-3">
              <label htmlFor="title">
                Title <span className="text-red-400">*</span>{" "}
              </label>
              <input
                onChange={(ev) => settitle(ev.target.value)}
                className=" p-2 rounded shadow h-9 outline outline-slate-300 outline-1 "
                type="text"
                id="title"
                required
                placeholder="A short descriptive title"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="email">
                Email <span className="text-red-400">*</span>{" "}
              </label>
              <input
                onChange={(ev) => setclientemail(ev.target.value)}
                className=" p-2 rounded shadow h-9 outline outline-slate-300 outline-1 "
                type="Email"
                id="email"
                required
                placeholder="Your Email Address"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="desc">
                Details <span className="text-red-400">*</span>
              </label>
              <textarea
                onChange={(ev) => setdescription(ev.target.value)}
                className=" p-2  rounded shadow min-h-14 outline outline-slate-300 outline-1 "
                name="desc"
                id="desc"
                placeholder="Give more details"
              ></textarea>
            </div>
          </div>

          <div className=" mt-4 w-5/6 flex justify-end flex-col md:flex-row ">
            {plan === plans.free ? (
              ""
            ) : (
              <input
                onChange={(ev) => setimages(ev.target.files)}
                type="file"
                name="uploadfiles"
                accept="image/png, image/jpeg"
              />
            )}

            <button className="bg-blue-400 p-2 text-white rounded ">
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default FeedbackForm;
