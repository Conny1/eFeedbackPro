import React from "react";
import { FaWindowClose } from "react-icons/fa";

type Props = {
  _id: string;
  setlink: React.Dispatch<React.SetStateAction<boolean>>;
};

const FeedbackLink = ({ _id, setlink }: Props) => {
  return (
    <div className=" p-3.5 rounded absolute bg-slate-300  ">
      <FaWindowClose onClick={() => setlink(false)} />
      <p className="text-sm  font-bold">
        {" "}
        send link to users to collect feedback
      </p>
      <p className="text-sm bg-slate-100 p-1 rounded  ">
        {`${process.env.NEXT_PUBLIC_SITE_URL}/${_id} `}{" "}
      </p>
    </div>
  );
};

export default FeedbackLink;
