import React, { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { useFeeddbackState } from "@/state/state";
import { Business, plans } from "@/state/types";
import { maximumProductsBysubscription } from "@/helperfunctions/checkplan";

type Props = {
  setaddproductmodal: React.Dispatch<React.SetStateAction<boolean>>;
  setproduct: React.Dispatch<React.SetStateAction<Business[]>>;
  product: Business[];
};
const AddProduct = ({ setproduct, setaddproductmodal, product }: Props) => {
  const [productname, setproductname] = useState("");
  const { user } = useFeeddbackState();

  const addProduct = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    // confirm plan
    const userplan = user?.plan as string;
    if (maximumProductsBysubscription(userplan, product.length) === false) {
      return toast.error(
        "You have reached the maximum number of products for your subscription"
      );
    }
    if (!productname) {
      return toast("Provide the product name");
    }
    try {
      const data = {
        name: productname,
        userid: user?._id,
      };

      const respData = await fetch(`./api/business`, {
        method: "POST",
        headers: {
          Content_Type: "application/json",
        },
        body: JSON.stringify(data),
      });

      const resp = await respData.json();
      if (resp.status === 200) {
        toast.success("Product Added..");
        setproduct((prev: Business[]) => [...prev, resp.busnessresp]);
        setTimeout(() => {
          setaddproductmodal(false);
        }, 3000);
      } else {
        // error messages
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" flex justify-center md:items-center absolute bg-black   w-full h-full bg-opacity-80 ">
      <form
        onSubmit={addProduct}
        className=" relative rounded p-5  w-11/12 max-w-screen-md bg-white flex flex-col  items-center  "
      >
        <Toaster />
        <FaWindowClose
          onClick={() => setaddproductmodal(false)}
          className="absolute left-4 text-lg"
        />
        <h3 className="w-5/6 font-bold h-8  flex items-center justify-center  ">
          Add new Product
        </h3>
        <hr className=" w-full" />
        <div className="   w-5/6 flex flex-col justify-evenly min-h-48 ">
          <div className="flex flex-col gap-3">
            <input
              onChange={(ev) => setproductname(ev.target.value)}
              className="pe-3 rounded shadow h-9 outline outline-slate-300 outline-1 "
              type="text"
              id="productname"
              required
              placeholder="Name of your new Product"
            />
          </div>
        </div>
        <div className=" mt-4 w-5/6 flex justify-end flex-col md:flex-row ">
          <button className="bg-blue-400 p-1 text-white rounded ">
            Create Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
