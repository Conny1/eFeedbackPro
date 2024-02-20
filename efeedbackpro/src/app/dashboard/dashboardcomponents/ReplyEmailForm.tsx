import React, { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../../components/Loading";

type Props = {
  setreply: React.Dispatch<React.SetStateAction<boolean>>;
  client: string;
};
const ReplyEmailForm = ({ setreply, client }: Props) => {
  const [message, setmessage] = useState("");
  const [productname, setproductname] = useState("");
  const [loading, setloading] = useState(false);

  const sendReply = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!client || !productname) {
      return toast.error("Provide all fields");
    }
    try {
      setloading(true);
      const data = {
        message,
        clientid: client,
        sender: productname,
      };
      const respData = await fetch("./api/feedback/replyemail", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const resp = await respData.json();
      setloading(false);
      if (resp.status === 200) {
        return toast.success("Message sent");
      }
      toast.error("Message not sent");
    } catch (error) {
      toast.error("Message not sent");
      setloading(false);
    }
  };

  return (
    <div className=" flex justify-center md:items-center absolute bg-black right-0  top-0 w-full h-full bg-opacity-80 ">
      <form
        onSubmit={sendReply}
        className=" relative rounded p-5  w-11/12 max-w-screen-md bg-white flex flex-col  items-center  "
      >
        <Toaster />
        <FaWindowClose
          onClick={() => setreply(false)}
          className="absolute left-4 text-lg"
        />
        <h3 className="w-5/6 font-bold h-8  flex items-center justify-center  ">
          Feedback reply
        </h3>
        <hr className=" w-full" />
        <div className="   w-5/6 flex flex-col justify-evenly min-h-48 ">
          <div className="flex flex-col gap-3">
            <label htmlFor="product">
              Product/Busines name <span className="text-red-400">*</span>{" "}
            </label>
            <input
              onChange={(ev) => setproductname(ev.target.value)}
              className=" p-2 rounded shadow h-9 outline outline-slate-300 outline-1 "
              type="text"
              id="product"
              required
              placeholder="Name of your product / business"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="desc">
              Message <span className="text-red-400">*</span>
            </label>
            <textarea
              onChange={(ev) => setmessage(ev.target.value)}
              className=" p-2  rounded shadow min-h-14 outline outline-slate-300 outline-1 "
              name="desc"
              id="desc"
              placeholder="Give more details"
            ></textarea>
          </div>
        </div>

        <div className=" mt-4 w-5/6 flex justify-end flex-col md:flex-row ">
          {loading ? (
            <Loading />
          ) : (
            <button className="bg-blue-400 p-2 text-white rounded ">
              Reply
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ReplyEmailForm;
