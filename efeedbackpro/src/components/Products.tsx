"use client";
import React from "react";
import { LuPlus } from "react-icons/lu";
import Product from "./Product";

const Products = () => {
  return (
    <div className=" mt-10 ">
      <div className=" flex flex-col gap-8 mb-10 ">
        <h1 className="font-semibold text-3xl ">
          Feedback for your product is important
        </h1>
        <p className="w-[80%]">
          Add your products to collect feedback rom your users. This will help
          you understand what your users want and prioritize what to build next
        </p>

        <button className="bg-[#ededed] max-w-[50%] p-2 rounded-xl flex items-center justify-center gap-2 ">
          <LuPlus className="text-2xl" />
          Add Product
        </button>
      </div>
      <h2 className="font-semibold text-xl mb-10 ">Your products</h2>
      <div className="flex flex-col gap-5 max-h-[500px] ">
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </div>
    </div>
  );
};

export default Products;
