"use client";
import React, { useState } from "react";
import { FaCaretUp } from "react-icons/fa";
import FeedbackItemModal from "./FeedbackItemModal";

const Feedbackitem = () => {
  const [feebackItemModal, setfeebackItemModal] = useState(false);

  return (
    <div onClick={() => setfeebackItemModal(true)}>
      <div className="flex justify-between items-center h-8 mt-4  ">
        <p className="font-bold">Please Post more videos</p>
        <button className="text-md flex gap-1 justify-center items-center shadow  rounded outline outline-1 outline-slate-400 p-0.5">
          <FaCaretUp className="text-3xl" /> 80
        </button>
      </div>
      <p className="text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique ipsa,
        nisi placeat ea nostrum sequi molestiae beatae omnis, harum corrupti,
        non nihil deserunt sed? Rem esse delectus vero blanditiis laborum?
      </p>

      {feebackItemModal && (
        <FeedbackItemModal
          feebackItemModal={feebackItemModal}
          setfeebackItemModal={setfeebackItemModal}
        />
      )}
    </div>
  );
};

export default Feedbackitem;
