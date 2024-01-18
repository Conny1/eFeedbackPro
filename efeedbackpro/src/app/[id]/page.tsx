"use client";
import React, { useState } from "react";
import { FeedbackForm } from "../components/FeedbackForm";
import { Feedbackitem } from "../components/Feedbackitem";

export function SubmitFeedback() {
  const [feebackFormModal, setfeebackFormModal] = useState(false);

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
          <Feedbackitem />
          <Feedbackitem />
        </div>
      </div>
      {/* modal fro collecting feedback */}
      {feebackFormModal && (
        <FeedbackForm setfeebackFormModal={setfeebackFormModal} />
      )}
    </main>
  );
}
