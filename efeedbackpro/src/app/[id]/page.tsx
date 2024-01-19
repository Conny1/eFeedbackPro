"use client";
import React, { useEffect, useState } from "react";
import FeedbackForm from "../components/FeedbackForm";
import Feedbackitem from "../components/Feedbackitem";
import { Feedback } from "../../state/types";
import { handleFeedbackErrors } from "@/helperfunctions/helperfunctions";

function SubmitFeedback() {
  const [feebackFormModal, setfeebackFormModal] = useState(false);
  const [feedback, setfeedback] = useState<Feedback[]>([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      const id = "65a795adda605819ef4243fc";
      try {
        const data = await fetch(`./api/feedback/${id}`);
        const resp = await data.json();
        handleFeedbackErrors(resp.status);
        if (resp.data) {
          setfeedback(resp.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchFeedback();
  }, []);

  return (
    <main className=" relative flex min-h-screen   flex-col   items-center ">
      <div className="w-3/4 max-w-3xl mt-16  ">
        <div className=" p-5  bg-gradient-to-r from-cyan-400 to-blue-400 rounded-t-lg ">
          <h1 className="text-xl font-bold  ">Coding with Conrad Mbuya</h1>
          <p className="text-slate-700">
            Help me decide what i should do next or how i can improve{" "}
          </p>
        </div>

        <div className="bg-slate-200 p-1 px-5 flex justify-end ">
          <button
            onClick={() => setfeebackFormModal(true)}
            className="bg-blue-400 text-white p-1 rounded "
          >
            Make a Suggestion
          </button>
        </div>

        <div className="px-5 shadow ">
          {feedback.map((item) => {
            return <Feedbackitem key={item._id} {...item} />;
          })}
        </div>
      </div>
      {/* modal fro collecting feedback */}
      {feebackFormModal && (
        <FeedbackForm setfeebackFormModal={setfeebackFormModal} />
      )}
    </main>
  );
}

export default SubmitFeedback;
