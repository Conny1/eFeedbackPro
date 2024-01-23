import React, { useState, useEffect } from "react";
import { FaWindowClose } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa";

type Props = {
  setfeebackModal: React.Dispatch<React.SetStateAction<boolean>>;
};
const FeedbackModal = ({ setfeebackModal }: Props) => {
  return (
    <div className=" flex justify-center md:items-center absolute top-0 left-0 bg-black   w-full h-full bg-opacity-80 ">
      <div className=" relative rounded p-5  w-11/12 max-w-screen-md bg-white flex flex-col  items-center  ">
        <FaWindowClose
          onClick={() => setfeebackModal(false)}
          className="absolute left-4 text-lg"
        />

        <p className=" w-5/6  text-green-700 italic  ">Private to you </p>

        <p className="font-bold w-5/6 m-5 ">Feedbact Title</p>

        <p className="text-sm w-5/6 ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
          commodi modi laboriosam illum adipisci temporibus eos et quibusdam,
          hic fuga ducimus veniam dolore doloremque. Adipisci, vero. Expedita
          nesciunt sint dolorem!
        </p>

        <div className="w-5/6 p-1 px-5 flex justify-end gap-2 ">
          <button className=" flex text-sm justify-center items-center bg-blue-400 text-white p-1 rounded ">
            <FaCaretUp className="text-lg" /> Upvotes 100
          </button>
          <button className=" flex text-sm justify-center items-center bg-green-400 text-white p-1 rounded ">
            make Public
          </button>
          <button className=" flex text-sm justify-center items-center bg-red-400 text-white p-1 rounded ">
            Delete
          </button>
        </div>

        <hr className="w-full" />
        <p className="w-5/6 mt-4 font-bold ">All comments</p>
        <div className="w-5/6  max-h-72 overflow-y-scroll  "></div>
      </div>
    </div>
  );
};

export default FeedbackModal;
