import { Comments } from "@/state/types";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaWindowClose } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa";
import Comment from "@/app/components/Comments";
import { useFeeddbackState } from "@/state/state";

type Props = {
  setfeebackModal: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  description: string;
  votes: number;
  _id: string;
  isPublic: boolean;
  comments: [string];
  business: string;
};
const FeedbackModal = ({
  setfeebackModal,
  title,
  description,
  votes,
  _id,
  isPublic,
  comments: commentids,
  business,
}: Props) => {
  const [comments, setcomments] = useState<Comments[]>([]);
  const { setrefetchFeeddback } = useFeeddbackState();

  useEffect(() => {
    const fetchFeedbackComments = async () => {
      const id = _id;
      try {
        const data = await fetch(`./api/comments/${id}`);
        const resp = await data.json();

        if (resp.commentresp) {
          setcomments(resp.commentresp);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchFeedbackComments();
  }, []);

  const deleteFeedback = async () => {
    setrefetchFeeddback(false);
    const bodyData = {
      feedbackid: _id,
      comments: commentids,
      businessid: business,
    };
    try {
      const data = await fetch(`./api/feedback/`, {
        method: "DELETE",
        headers: {
          content_Type: "Application/json",
        },
        body: JSON.stringify(bodyData),
      });
      const resp = await data.json();
      setrefetchFeeddback(true);
      if (resp.status == 200) {
        setfeebackModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" flex justify-center md:items-center absolute top-0 left-0 bg-black   w-full h-full bg-opacity-80 ">
      <Toaster />
      <div className=" relative rounded p-5  w-11/12 max-w-screen-md bg-white flex flex-col  items-center  ">
        <FaWindowClose
          onClick={() => setfeebackModal(false)}
          className="absolute left-4 text-lg"
        />

        {!isPublic && (
          <p className=" w-5/6  text-green-700 italic  ">Private to you </p>
        )}

        <p className="font-bold w-5/6 m-5 "> {title} </p>

        <p className="text-sm w-5/6 ">{description}</p>

        <div className="w-5/6 p-1 px-5 flex justify-end gap-2 ">
          <button className=" flex text-sm justify-center items-center bg-blue-400 text-white p-1 rounded ">
            <FaCaretUp className="text-lg" /> Upvotes {votes}
          </button>
          <button className=" flex text-sm justify-center items-center bg-green-400 text-white p-1 rounded ">
            make Public
          </button>
          <button
            onClick={deleteFeedback}
            className=" flex text-sm justify-center items-center bg-red-400 text-white p-1 rounded "
          >
            Delete
          </button>
        </div>

        <hr className="w-full" />
        <p className="w-5/6 mt-4 font-bold ">All comments</p>
        <div className="w-5/6  max-h-72 overflow-y-scroll  ">
          {comments && comments.length > 0 ? (
            comments.map((item, i) => {
              return <Comment key={item._id} {...item} />;
            })
          ) : (
            <p>no comment yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
