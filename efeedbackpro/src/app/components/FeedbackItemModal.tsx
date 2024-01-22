import React, { useState, useEffect } from "react";
import { FaWindowClose } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa";
import Comment from "./Comments";
import { Comments } from "@/state/types";
import { toast } from "react-hot-toast";
import {
  handleCommentsErrors,
  handleFeedbackErrors,
} from "@/helperfunctions/helperfunctions";

type Props = {
  setfeebackItemModal: React.Dispatch<React.SetStateAction<boolean>>;
  description: string;
  title: string;
  votes: number;

  _id: string;
};
const FeedbackItemModal = ({
  setfeebackItemModal,
  votes,
  description,
  title,

  _id,
}: Props) => {
  const [votesNumber, setvotesNumber] = useState(votes || 0);
  const [comments, setcomments] = useState<Comments[]>([]);
  const [inputcommnet, setinputcommnet] = useState("");
  const makeAvote = async () => {
    try {
      const respdata = await fetch("./api/feedback", {
        method: "PUT",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({ feedbackid: _id }),
      });
      const data = await respdata.json();

      if (data.status === 200) {
        setvotesNumber(data.data);

        toast.success("voted");
      }
      handleFeedbackErrors(data.status);
    } catch (error) {}
  };

  // fetchComments
  useEffect(() => {
    const fetchFeedback = async () => {
      const id = _id;
      try {
        const data = await fetch(`./api/comments/${id}`);
        const resp = await data.json();
        handleCommentsErrors(resp.status);
        if (resp.commentresp) {
          setcomments(resp.commentresp);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchFeedback();
  }, [_id]);

  // addcomment
  const CommentOnfeedback = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    try {
      const respData = await fetch(`./api/comments`, {
        method: "POST",
        headers: {
          Content_Type: "application/json",
        },
        body: JSON.stringify({ comment: inputcommnet, feedbackid: _id }),
      });
      const data = await respData.json();

      if (data.status === 200) {
        if (comments.length > 0) {
          setcomments([...comments, data.commentresp]);
        } else {
          setcomments([data.commentresp]);
        }
        setinputcommnet("");
      } else {
        handleCommentsErrors(data.status);
      }
    } catch (error) {}
  };
  return (
    <div className=" flex justify-center md:items-center absolute top-0 left-0 bg-black   w-full h-full bg-opacity-80 ">
      <div className=" relative rounded p-5  w-11/12 max-w-screen-md bg-white flex flex-col  items-center  ">
        <FaWindowClose
          onClick={() => {
            setfeebackItemModal(false);
          }}
          className="absolute left-4 text-lg"
        />

        <p className="font-bold w-5/6 m-5 ">{title}</p>

        <p className="text-sm w-5/6 ">{description}</p>

        <div className="w-5/6 p-1 px-5 flex justify-end ">
          <button
            onClick={makeAvote}
            className=" flex text-sm justify-center items-center bg-blue-400 text-white p-1 rounded "
          >
            <FaCaretUp className="text-lg" /> Upvote {votesNumber}
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

        <form onSubmit={CommentOnfeedback} className="w-5/6">
          <div className="flex flex-col gap-3">
            <input
              onChange={(ev) => setinputcommnet(ev.target.value)}
              value={inputcommnet}
              className=" rounded shadow h-9 outline outline-slate-300 outline-1 "
              type="text"
              id="title"
              required
              placeholder="Let us know what you think.."
            />
          </div>

          <div className=" w-full mt-4 flex justify-end flex-col md:flex-row ">
            <button
              onClick={() => console.log("Comment")}
              className="bg-blue-400 p-1 text-white rounded "
            >
              Comment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackItemModal;
