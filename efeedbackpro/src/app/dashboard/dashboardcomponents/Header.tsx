import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import ProductName from "./ProductName";
import { handleBusinessErrors } from "@/helperfunctions/helperfunctions";
import { Business } from "@/state/types";
import AddProduct from "./AddProduct";
import { useFeeddbackState } from "@/state/state";

const Header = () => {
  const { user } = useFeeddbackState();
  const [product, setproduct] = useState<Business[]>([]);
  const [addproductmodal, setaddproductmodal] = useState(false);
  const router = useRouter();
  const logout = async (
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    ev.preventDefault();
    try {
      const resp = await fetch("../api/user/logout");
      const data = await resp.json();
      if (data.status === 200) {
        toast.success("Logged out");
        localStorage.removeItem("user");
        setTimeout(() => {
          router.push("/auth");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const user = localStorage.getItem("user");

      try {
        if (user) {
          const id = JSON.parse(user)._id;

          const resp = await fetch(`../api/business/${id}`);

          const data = await resp.json();
          if (data.status !== 200) {
            const message = handleBusinessErrors(data.status);
            return toast(message);
          }
          setproduct(data.respData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, []);
  return (
    <main>
      <Toaster />
      <section className=" flex justify-evenly h-20 gap-1 ">
        <div className=" flex items-center justify-center  bg-gradient-to-r from-cyan-400 to-blue-400 flex-1">
          <button className="text-slate-700 text-xl font-bold ">
            Feedback
          </button>
        </div>

        {/* <div className=" flex items-center justify-center  bg-gradient-to-r from-cyan-400 to-blue-400 flex-1">
          <button className="text-slate-700 text-xl font-bold ">
            New Features
          </button>
        </div>

        <div className=" flex items-center justify-center  bg-gradient-to-r from-cyan-400 to-blue-400 flex-1">
          <button className="text-slate-700 text-xl font-bold ">Bugs</button>
        </div> */}
        {/* auth details */}
        <div className=" flex items-center justify-center  flex-1 max-w-xs flex-col  ">
          <img
            className="w-8 h-8 rounded-3xl "
            src="https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?q=80&w=1386&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          {user && (
            <p className="text-slate-700 font-bold text-xs ">{user?.email}</p>
          )}
          <button onClick={logout} className="text-slate-700 text-l  ">
            Log Out
          </button>
        </div>
      </section>

      <section className="  flex justify-evenly h-12 gap-1 ">
        {product.length > 0 &&
          product.map((item) => {
            return <ProductName key={item._id} {...item} />;
          })}
        <div className=" flex items-center justify-center  bg-slate-200 flex-1">
          <button
            onClick={() => setaddproductmodal(true)}
            className="text-slate-700 text-l  "
          >
            {" "}
            Add Product +
          </button>
        </div>
        {/* add new feedback modal */}
        {addproductmodal && (
          <AddProduct
            setproduct={setproduct}
            setaddproductmodal={setaddproductmodal}
          />
        )}
      </section>
    </main>
  );
};

export default Header;
