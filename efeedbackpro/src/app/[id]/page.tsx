"use client";
import React, { useEffect, useState } from "react";
import FeedbackForm from "../components/FeedbackForm";
import Feedbackitem from "../components/Feedbackitem";
import { Feedback } from "../../state/types";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../components/Loading";

type Props = {
  params: { id: string };
};

function SubmitFeedback({ params }: Props) {
  const [feebackFormModal, setfeebackFormModal] = useState(false);
  const [feedback, setfeedback] = useState<Feedback[]>([]);
  const [loading, setloading] = useState(false);
  const [product, setproduct] = useState("");

  useEffect(() => {
    const fetchFeedback = async () => {
      setloading(true);
      const id = params.id;
      if (id.length < 24 || id.length > 24) {
        return toast.error("invalid  id");
      }
      try {
        const data = await fetch(`./api/feedback/${id}?query=true`);
        const resp = await data.json();

        if (resp.data) {
          setfeedback(resp.data);
          setloading(false);
          setproduct(resp.business.name);
        }
        if (resp.status === 404) {
          setloading(false);
          setfeedback([]);
          setproduct(resp.business.name);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchFeedback();
  }, []);

  return (
    <main className=" relative flex min-h-screen   flex-col   items-center ">
      <Toaster />
      <div className="w-3/4 max-w-3xl mt-16  ">
        {product && (
          <div className=" p-5  bg-gradient-to-r from-cyan-400 to-blue-400 rounded-t-lg ">
            <h1 className="text-xl font-bold  ">{product}</h1>
            <p className="text-slate-700">
              Suggest feedback to help imporove our products and services
            </p>
          </div>
        )}

        <div className="bg-slate-200 p-1 px-5 flex justify-between flex-col-reverse md:flex-row ">
          <p>Vote for feedback or suggested improvement by others</p>
          <button
            onClick={() => setfeebackFormModal(true)}
            className="bg-blue-400 text-white p-1 rounded "
          >
            Make a Suggestion
          </button>
        </div>

        <div className="px-5 shadow ">
          {loading ? (
            <Loading />
          ) : feedback.length === 0 ? (
            <p>Data not available for voting. You can suggest more feedback</p>
          ) : (
            feedback.map((item) => {
              return <Feedbackitem key={item._id} {...item} />;
            })
          )}
        </div>
      </div>
      {/* modal fro collecting feedback */}
      {feebackFormModal && (
        <FeedbackForm
          setfeebackFormModal={setfeebackFormModal}
          id={params.id}
        />
      )}
    </main>
  );
}

export default SubmitFeedback;
