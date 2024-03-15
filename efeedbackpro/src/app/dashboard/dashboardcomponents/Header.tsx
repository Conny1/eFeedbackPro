import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { handleBusinessErrors } from "@/helperfunctions/helperfunctions";
import { Business, Feedback } from "@/state/types";
import AddProduct from "./AddProduct";
import { useFeeddbackState } from "@/state/state";
import ProductModal from "./ProductModal";
import Link from "next/link";
import User from "@/models/UserModel";

const Header = () => {
  const { user, refetch } = useFeeddbackState();
  const [product, setproduct] = useState<Business[]>([]);
  const [productLoading, setproductLoading] = useState(false);
  const [addproductmodal, setaddproductmodal] = useState(false);
  const [moreProducts, setmoreProducts] = useState(false);
  const [selectedProduct, setselectedProduct] = useState("");
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
      setproductLoading(true);
      try {
        if (user) {
          const id = JSON.parse(user)._id;

          const resp = await fetch(`../api/business/${id}`);

          const data = await resp.json();
          if (data.status !== 200) {
            const message = handleBusinessErrors(data.status);
            setproductLoading(false);
            setproduct([]);
            return toast(message);
          }
          setproduct(data.respData);
          setproductLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, [refetch]);

  return (
    <main>
      <Toaster />
      <section className=" flex justify-evenly h-20 gap-1 ">
        <div className=" flex items-center justify-center  bg-gradient-to-r from-cyan-400 to-blue-400 flex-1">
          <button className="text-slate-700 text-xl font-bold ">
            Feedback{selectedProduct && `   for ${selectedProduct}`}
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
        <div className=" flex items-center justify-center  flex-1 max-w-xs flex-col font-bold ">
          {/* <img
            className="w-8 h-8 rounded-3xl "
            src="https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?q=80&w=1386&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          /> */}
          <Link
            href="/dashboard/subscription"
            className="text-xs bg-blue-400  p-1 rounded  "
          >
            Billing: <span className="text-red-700">{user?.plan}</span>
          </Link>
          {user && (
            <p className="text-slate-700 font-bold md:text-sm  text-xs ">
              {user?.email}
            </p>
          )}
          <button onClick={logout} className="text-slate-700 text-l  ">
            Log Out
          </button>
        </div>
      </section>

      <section className="  flex justify-evenly h-12 gap-1 ">
        {/*  product list */}
        <div className=" flex items-center justify-center  bg-slate-200 flex-1 max-w-40">
          <button
            onClick={() => setmoreProducts(true)}
            className="text-slate-700 text-l  "
          >
            Products
          </button>
        </div>

        {moreProducts && (
          <ProductModal
            productLoading={productLoading}
            product={product}
            setselectedProduct={setselectedProduct}
            setmoreProducts={setmoreProducts}
          />
        )}
        {/* filters */}

        {/* <div className=" flex items-center justify-center  bg-slate-200 flex-1 max-w-40">
          <button
            onClick={async () => {
              const resp = await mostVoted(dashboardfeedback);
              if (resp) {
                const data = resp as Feedback[];
                console.log(data);
                setdashboardfeedback(data);
              }
            }}
            className="text-slate-700 text-l  "
          >
            Most Voted
          </button>
        </div> */}
        <div className=" flex items-center justify-center  bg-slate-200 flex-1">
          <button
            onClick={() => setaddproductmodal(true)}
            className="text-slate-700 text-l  "
          >
            Add Product +
          </button>
        </div>
        {/* add new feedback modal */}
        {addproductmodal && (
          <AddProduct
            setproduct={setproduct}
            product={product}
            setaddproductmodal={setaddproductmodal}
          />
        )}
      </section>
    </main>
  );
};

export default Header;
