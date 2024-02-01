import FeedbackLink from "@/app/components/FeedbackLink";
import { handleFeedbackErrors } from "@/helperfunctions/helperfunctions";
import { useFeeddbackState } from "@/state/state";
import React, { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import EditProductName from "./EditProductName";
import { toast } from "react-hot-toast";

type Props = {
  name: string;
  _id: string;
  setselectedProduct: React.Dispatch<React.SetStateAction<string>>;
};

const ProductName = ({ name, _id, setselectedProduct }: Props) => {
  const {
    setdashboardfeedback,
    dashboardfeedback,
    setrefetchFeeddback,
    refetchFeeddback,
    setrefetch,
  } = useFeeddbackState();
  const [link, setlink] = useState(false);
  const [edit, setedit] = useState(false);
  const [productname, setproductname] = useState(name);

  const fetchFeedback = async () => {
    const id = _id;
    setdashboardfeedback([]);
    setselectedProduct("");
    try {
      const data = await fetch(`./api/feedback/${id}`);
      const resp = await data.json();
      handleFeedbackErrors(resp.status);
      if (resp.data) {
        setdashboardfeedback(resp.data);
        setselectedProduct(name);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (dashboardfeedback.length > 0) {
      fetchFeedback();
    }
  }, [refetchFeeddback]);
  const deleteProduct = async () => {
    setrefetchFeeddback(false);
    setrefetch(false);
    try {
      const data = await fetch("./api/business", {
        method: "DELETE",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({ businessid: _id }),
      });

      const resp = await data.json();
      if (resp.status === 200) {
        setrefetchFeeddback(true);
        setrefetch(true);
        toast.success("Deleted");
      }
    } catch (error) {}
  };
  return (
    <div className="  flex gap-3  w-full   h-16 ">
      <button
        onClick={fetchFeedback}
        className=" bg-slate-200 text-slate-700 text-l flex-1 rounded "
      >
        {productname}
      </button>
      <div className="flex flex-col-reverse justify-between ">
        <MdDelete
          onClick={deleteProduct}
          className="text-2xl text-red-400 cursor-pointer "
        />
        <MdEdit
          onClick={() => setedit(true)}
          className="text-2xl  cursor-pointer "
        />
      </div>

      <button
        onClick={() => setlink(true)}
        className="bg-slate-200 text-slate-700 text-l flex-1 rounded "
      >
        Feedback link
      </button>
      {link && <FeedbackLink _id={_id} setlink={setlink} />}
      {edit && (
        <EditProductName
          name={productname}
          setproductname={setproductname}
          setedit={setedit}
          id={_id}
        />
      )}
    </div>
  );
};

export default ProductName;
