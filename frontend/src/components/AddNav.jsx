import Logo from "../svg-components/Logo";
import React from "react";
import { IoMdArrowBack } from "react-icons/io";

const AddNav = () => {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="bg-[#f7f8f8] w-full py-5 px-4 flex gap-2 items-center">
      <div>
        <IoMdArrowBack
          className="cursor-pointer"
          onClick={handleBack}
          fontSize={24}
        />
      </div>
      <div className="ml-5">
        <Logo height={24} />
      </div>
    </div>
  );
};

export default AddNav;
