import React from "react";

type Props = {
  name: string;
  _id: string;
};

const ProductName = ({ name, _id }: Props) => {
  return (
    <div className=" flex items-center justify-center bg-slate-200 flex-1">
      <button className="text-slate-700 text-l  ">{name}</button>
    </div>
  );
};

export default ProductName;
