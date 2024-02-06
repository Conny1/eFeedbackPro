"use client";
import React, { useState } from "react";
import { FaCaretUp } from "react-icons/fa";
import FeedbackModal from "./FeedbackModal";

type Props = {
  title: string;
  description: string;
  votes: number;
  _id: string;
  isPublic: boolean;
  comments: [string];
  business: string;
};

const Feedback = ({
  title,
  description,
  votes,
  _id,
  isPublic,
  comments,
  business,
}: Props) => {
  const [feebackModal, setfeebackModal] = useState(false);
  const data = { title, description, votes, _id, isPublic, comments, business };

  return (
    <>
      <div
        className="  max-w-96 outline outline-slate-200 outline-1 shadow p-5 rounded cursor-pointer "
        onClick={() => setfeebackModal(true)}
      >
        <div className="flex justify-between items-center h-8 mt-4 mb-4 gap-1   ">
          <p className="font-bold">{title}</p>
          <button className="text-md flex gap-1 justify-center items-center shadow  rounded outline outline-1 outline-slate-400 p-0.5">
            <FaCaretUp className="text-3xl" /> {votes}
          </button>
        </div>
        <p className="text-sm">{description}</p>
      </div>
      {feebackModal && (
        <FeedbackModal setfeebackModal={setfeebackModal} {...data} />
      )}
    </>
  );
};

export default Feedback;
