import { FeedbackCard } from "@/components";
import React from "react";

const ProductDashboard = () => {
  return (
    <div className="flex mt-10 items-center flex-col gap-10  min-h-screen  font-[family-name:var(--font-geist-sans)]">
      <h1 className="font-semibold text-3xl  ">Welcome back , Lucy</h1>
      <p className="text-[grey] text-sm decoration-slice ">
        Manage feedback , analyze data and customize your experience
      </p>
      <div className="w-[70%]    ">
        <button className="text-[grey] font-bold  w-[20%] border-b-2 border-cyan-900  ">
          Feedback
        </button>
      </div>
      <div className="w-[70%]  flex flex-col gap-5 ">
        <h2 className="font-semibold text-xl">Recent feedback</h2>
        <FeedbackCard />
        <FeedbackCard />
        <FeedbackCard />
        <FeedbackCard />
        <FeedbackCard />
        <button className=" w-60 rounded-md bg-[#ededed] p-1.5 self-end ">
          View all feedbacks
        </button>
      </div>

      <div className="w-[70%]  flex flex-col gap-5 ">
        <h2 className="font-semibold text-xl">Feedback analytics</h2>
      </div>
    </div>
  );
};

export default ProductDashboard;
