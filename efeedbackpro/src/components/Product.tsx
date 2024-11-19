import Image from "next/image";
import React from "react";

const Product = () => {
  return (
    <div className="flex gap-5">
      <Image
        src="https://img.freepik.com/free-photo/photo-automobile-production-line-welding-car-body-modern-car-assembly-plant-auto-industry_645730-133.jpg?t=st=1732041197~exp=1732044797~hmac=77cf3e300bac00360dabb09dea315aa214031f2571cfb025ed4c91e6c942223c&w=1380"
        alt=""
        width={90}
        height={70}
        style={{ borderRadius: 10 }}
      />
      <div className="flex flex-col gap-3">
        <p>Product Name</p>
        <p className="text-sm font-light ">Total feedback</p>
      </div>
    </div>
  );
};

export default Product;
