import { useFeeddbackState } from "@/state/state";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { FaWindowClose } from "react-icons/fa";

type Props = {
  name: string;
  setedit: React.Dispatch<React.SetStateAction<boolean>>;
  setproductname: React.Dispatch<React.SetStateAction<string>>;
  id: string;
};

const EditProductName = ({ name, setedit, setproductname, id }: Props) => {
  const [newname, setnewname] = useState(name);
  const { setrefetch } = useFeeddbackState();

  const updateName = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!newname) return toast.error("provide name");
    setrefetch(false);
    try {
      const resp = await fetch("./api/business", {
        method: "PUT",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({ name: newname, id }),
      });

      const data = await resp.json();
      if (data.status === 200) {
        setproductname(data.respData.name);
        setrefetch(true);
        setedit(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" p-1 rounded absolute bg-slate-300  ">
      <FaWindowClose onClick={() => setedit(false)} />
      <form onSubmit={updateName} className="flex flex-col gap-3">
        <input
          onChange={(ev) => setnewname(ev.target.value)}
          className="p-3 rounded shadow h-9 outline outline-slate-300 outline-1 "
          type="text"
          id="productname"
          required
          value={newname}
          placeholder="Name of your new Product"
        />
        <input
          className=" bg-blue-400 w-fit p-1 rounded cursor-pointer  "
          type="submit"
          value="update"
        />
      </form>
    </div>
  );
};

export default EditProductName;
