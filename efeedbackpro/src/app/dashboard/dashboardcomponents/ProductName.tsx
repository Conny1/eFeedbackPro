import FeedbackLink from "@/app/components/FeedbackLink";
import { handleFeedbackErrors } from "@/helperfunctions/helperfunctions";
import { useFeeddbackState } from "@/state/state";
import React, { useCallback, useEffect, useState } from "react";

type Props = {
  name: string;
  _id: string;
};

const ProductName = ({ name, _id }: Props) => {
  const { setdashboardfeedback, dashboardfeedback, refetchFeeddback } =
    useFeeddbackState();
  const [link, setlink] = useState(false);

  const fetchFeedback = async () => {
    const id = _id;
    setdashboardfeedback([]);
    try {
      const data = await fetch(`./api/feedback/${id}`);
      const resp = await data.json();
      handleFeedbackErrors(resp.status);
      if (resp.data) {
        setdashboardfeedback(resp.data);
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
    <div className=" flex items-center justify-center bg-slate-200 flex-1 flex-col-reverse ">
      <button onClick={fetchFeedback} className="text-slate-700 text-l  ">
        {name}
      </button>
      <button onClick={() => setlink(true)} className="text-slate-700 text-l  ">
        Feedback link
      </button>
      {link && <FeedbackLink _id={_id} setlink={setlink} />}
    </div>
  );
};

export default ProductName;
