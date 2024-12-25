import React from "react";
import { MdOutlineArrowForwardIos } from "react-icons/md";

const SelectCategoryBox = ({ icon, title, alt, arrow }) => {
  return (
    <div className="w-[100%] h-[45px] p-[10px] flex justify-between items-center hover:bg-[#c8f8f6]">
      <div className="flex gap-6 items-center ml-6">
        {icon && <img className="w-6" src={icon} alt={alt} />}
        <h5 className="text-sm">{title}</h5>
      </div>
      {arrow && <MdOutlineArrowForwardIos />}
    </div>
  );
};

export default SelectCategoryBox;
