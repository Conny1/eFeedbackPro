import React from "react";
import { FaWindowClose } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa";
import Comments from "./Comments";

type Props = {
  setfeebackItemModal: React.Dispatch<React.SetStateAction<boolean>>;
};
const FeedbackItemModal = ({
  setfeebackItemModal,
  feebackItemModal,
}: Props) => {
  return (
    <div className=" flex justify-center md:items-center absolute top-0 left-0 bg-black   w-full h-full bg-opacity-80 ">
      <div className=" relative rounded p-5  w-11/12 max-w-screen-md bg-white flex flex-col  items-center  ">
        <FaWindowClose
          onClick={() => {
            setfeebackItemModal(false);
            console.log(feebackItemModal);
          }}
          className="absolute left-4 text-lg"
        />

        <p className="font-bold w-5/6 m-5 ">Please Post more videos</p>

        <p className="text-sm w-5/6 ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
          ipsa, nisi placeat ea nostrum sequi molestiae beatae omnis, harum
          corrupti, non nihil deserunt sed? Rem esse delectus vero blanditiis
          laborum?
        </p>

        <div className="w-5/6 p-1 px-5 flex justify-end ">
          <button className=" flex text-sm justify-center items-center bg-blue-400 text-white p-1 rounded ">
            <FaCaretUp className="text-lg" /> Upvote 80
          </button>
        </div>
        <hr className="w-full" />
        <p className="w-5/6 mt-4 font-bold ">All comments</p>
        <div className="w-5/6">
          <Comments />
        </div>

        <form className="w-5/6">
          <div className="flex flex-col gap-3">
            <input
              className=" rounded shadow h-9 outline outline-slate-300 outline-1 "
              type="text"
              id="title"
              required
              placeholder="Let us know what you think.."
            />
          </div>

          <div className=" w-full mt-4 flex justify-end flex-col md:flex-row ">
            <input type="file" name="uploadfiles" />
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
