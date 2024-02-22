import React, { useState } from "react";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { FaWindowClose } from "react-icons/fa";

type Props = {
  uploads: string[];
  setimageModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const FeedbackImage = ({ uploads, setimageModal }: Props) => {
  const [bigimage, setbigimage] = useState(0);

  return (
    <div className="absolute w-full h-96 bg-black  left-0 top-0">
      <FaWindowClose
        onClick={() => setimageModal(false)}
        className="absolute left-4 text-3xl text-white cursor-pointer "
      />
      <MdKeyboardDoubleArrowRight
        onClick={() =>
          setbigimage((prev) =>
            prev === uploads.length - 1 ? uploads.length - 1 : prev + 1
          )
        }
        className=" text-white text-4xl absolute top-1/2 right-0 "
      />
      <img
        className=" flex-1 w-full max-h-full object-contain cursor-pointer"
        src={uploads[bigimage]}
        alt="feedbackimg"
      />

      <MdKeyboardDoubleArrowLeft
        onClick={() => setbigimage((prev) => (prev === 0 ? 0 : prev - 1))}
        className=" text-white text-4xl absolute top-1/2 left-0 "
      />
      <p className="bg-white text-center font-bold text-sm ">
        {" "}
        {bigimage + 1} / {uploads.length}
      </p>
    </div>
  );
};

export default FeedbackImage;
