import React from "react";
import { IoLocationOutline } from "react-icons/io5";

const AdDetailBoxes = ({
  price,
  title,
  location,
  description,
  brand,
  condition,
}) => {
  return (
    <div className="w-[64%] mx-8">
      <div className="p-3 h-fit border-2 border-[#ebe6e6] mt-4">
        <h2 className="text-4xl font-semibold">Rs {price || `77,000`} </h2>
        <h4 className="font-semibold mt-4 text-lg">
          {title || "Vivo y83 128 gb 6 gb Brand new 10/10 PTA Approved"}
        </h4>
        <h5 className="flex gap-2 items-center mt-3">
          <IoLocationOutline fontSize={16} />
          {location || "Allama Iqbal Road, Sialkot"}
        </h5>
      </div>
      <div className="p-3 h-fit border-2 border-[#ebe6e6] mt-4">
        <h3 className="text-2xl font-semibold">Details</h3>
        <div className="flex gap-4 mt-4">
          <div className="bg-[#f6f6f6] p-2 w-[50%]">
            <span className="text-sm inline-block w-[50%]">Brand</span>
            <span className="text-sm font-semibold inline-block w-[50%]">
              {brand || "Samsung"}
            </span>
          </div>
          <div className="bg-[#f6f6f6] p-2 w-[50%]">
            <span className="text-sm inline-block w-[50%]">condition</span>
            <span className="text-sm font-semibold inline-block w-[50%]">
              {condition || "New"}
            </span>
          </div>
        </div>
      </div>

      <div className="p-3 h-fit border-2 border-[#ebe6e6] my-4">
        <h3 className="text-2xl font-semibold">Description</h3>
        <div className="whitespace-pre-wrap">
          <span>{description || "Hello And Welcome to my ad"}</span>
        </div>
      </div>
    </div>
  );
};

export default AdDetailBoxes;
