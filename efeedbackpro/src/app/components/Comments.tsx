import React from "react";

type Props = {
  comment: string;
  createdAt: Date;
};

const Comments = ({ comment, createdAt }: Props) => {
  return (
    <div className="mb-4">
      <p className="text-sm font-semibold text-slate-800 ">{comment}</p>
      <p className=" text-xs font-sans lowercase text-slate-500">
        {` ${new Date(createdAt).toDateString()}`}
      </p>
    </div>
  );
};

export default Comments;
