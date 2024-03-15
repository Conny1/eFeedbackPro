import React from "react";
import { FaWindowClose } from "react-icons/fa";
import copy from "clipboard-copy";
import toast, { Toaster } from "react-hot-toast";

type Props = {
  _id: string;
  setlink: React.Dispatch<React.SetStateAction<boolean>>;
  linkurl: string;
  text: string;
  link?: string;
};

const FeedbackLink = ({ _id, setlink, linkurl, text, link }: Props) => {
  return (
    <div className=" p-3.5 rounded  absolute bg-slate-300  max-w-full ">
      <FaWindowClose onClick={() => setlink(false)} />
      <p className="text-sm  font-bold  ">{text}</p>
      <Toaster />
      {/* coppy to clipboard btn */}
      <button
        onClick={() => {
          copy(link ? `${linkurl}?id=${_id}` : `${linkurl}/${_id}`);
          toast.success("Link copied");
        }}
        className="bg-blue-400 text-xs p-1 font-bold rounded"
      >
        copy
      </button>
      <p className="text-sm bg-slate-100 p-1 rounded max-w-64 md:max-w-full overflow-y-scroll ">
        {link ? `${linkurl}?id=${_id}` : `${linkurl}/${_id}`}
      </p>
    </div>
  );
};

export default FeedbackLink;
