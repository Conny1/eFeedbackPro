import React from "react";
import { FaWindowClose } from "react-icons/fa";

type Props = {
  setfeebackFormModal: React.Dispatch<React.SetStateAction<boolean>>;
};
const FeedbackForm = ({ setfeebackFormModal }: Props) => {
  return (
    <div className=" flex justify-center md:items-center absolute bg-black   w-full h-full bg-opacity-80 ">
      <form className=" relative rounded p-5  w-11/12 max-w-screen-md bg-white flex flex-col  items-center  ">
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
              className=" rounded shadow h-9 outline outline-slate-300 outline-1 "
              type="text"
              id="title"
              required
              placeholder="A short descriptive title"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="desc">Details</label>
            <textarea
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
