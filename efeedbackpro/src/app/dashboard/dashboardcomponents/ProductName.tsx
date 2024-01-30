import FeedbackLink from "@/app/components/FeedbackLink";
import { handleFeedbackErrors } from "@/helperfunctions/helperfunctions";
import { useFeeddbackState } from "@/state/state";
import React, { useEffect, useState } from "react";

type Props = {
  name: string;
  _id: string;
  setselectedProduct: React.Dispatch<React.SetStateAction<string>>;
};

const ProductName = ({ name, _id, setselectedProduct }: Props) => {
  const { setdashboardfeedback, dashboardfeedback, refetchFeeddback } =
    useFeeddbackState();
  const [link, setlink] = useState(false);

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
  return (
    <div className="  flex gap-3  w-full   h-16 ">
      <button
        onClick={fetchFeedback}
        className=" bg-slate-200 text-slate-700 text-l flex-1 rounded "
      >
        {name}
      </button>
      <button
        onClick={() => setlink(true)}
        className="bg-slate-200 text-slate-700 text-l flex-1 rounded "
      >
        Feedback link
      </button>
      {link && <FeedbackLink _id={_id} setlink={setlink} />}
    </div>
  );
};

export default ProductName;
