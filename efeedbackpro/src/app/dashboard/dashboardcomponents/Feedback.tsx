"use client";
import React, { useState } from "react";
import { FaCaretUp } from "react-icons/fa";
import FeedbackModal from "./FeedbackModal";

const Feedback = () => {
  const [feebackModal, setfeebackModal] = useState(false);

  return (
    <>
      <div
        className="max-w-96 outline outline-slate-200 outline-1 shadow p-5 rounded cursor-pointer "
        onClick={() => setfeebackModal(true)}
      >
        <div className="flex justify-between items-center h-8 mt-4 mb-4    ">
          <p className="font-bold">Feedback Title</p>
          <button className="text-md flex gap-1 justify-center items-center shadow  rounded outline outline-1 outline-slate-400 p-0.5">
            <FaCaretUp className="text-3xl" /> 80
          </button>
        </div>
        <p className="text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
          necessitatibus sed hic libero recusandae! Ipsum deserunt consequuntur
          id inventore praesentium eius, cupiditate voluptates, vitae et sequi
          delectus corporis recusandae optio...
        </p>
      </div>
      {feebackModal && <FeedbackModal setfeebackModal={setfeebackModal} />}
    </>
  );
};

export default Feedback;
