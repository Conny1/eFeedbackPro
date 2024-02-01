import React from "react";
import { FaWindowClose } from "react-icons/fa";
import { Business } from "@/state/types";
import ProductName from "./ProductName";

type Props = {
  product?: Business[];
  setmoreProducts: React.Dispatch<React.SetStateAction<boolean>>;
  setselectedProduct: React.Dispatch<React.SetStateAction<string>>;
};
const ProductModal = ({
  product,
  setmoreProducts,
  setselectedProduct,
}: Props) => {
  if (!product) {
    return (
      <>
        <p>No product has been added yet</p>
      </>
    );
  }

  return (
    <div className=" flex justify-center md:items-center absolute bg-black   w-full h-full bg-opacity-80 ">
      <div className=" relative rounded p-5 gap-3 w-11/12 max-w-screen-md bg-white flex flex-col  items-center  ">
        <FaWindowClose
          onClick={() => setmoreProducts(false)}
          className="absolute left-4 text-lg"
        />
        <h3 className="w-5/6 font-bold h-8  flex items-center justify-center  ">
          Produc list
        </h3>
        <hr className=" w-full" />
        {product.length > 0 &&
          product.map((item) => {
            return (
              <ProductName
                key={item._id}
                setselectedProduct={setselectedProduct}
                {...item}
              />
            );
          })}
      </div>
    </div>
  );
};

export default ProductModal;
