"use client";
import React, { useState } from "react";
import { FaCaretUp } from "react-icons/fa";
import FeedbackItemModal from "./FeedbackItemModal";

type Props = {
  description: string;
  title: string;
  votes: number;
};

const Feedbackitem = ({ description, title, votes }: Props) => {
  const [feebackItemModal, setfeebackItemModal] = useState(false);

  return (
    <div onClick={() => setfeebackItemModal(true)}>
      <div className="flex justify-between items-center h-8 mt-4  ">
        <p className="font-bold">{title}</p>
        <button className="text-md flex gap-1 justify-center items-center shadow  rounded outline outline-1 outline-slate-400 p-0.5">
          <FaCaretUp className="text-3xl" /> {votes}
        </button>
      </div>
      <p className="text-sm">{description}</p>

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
