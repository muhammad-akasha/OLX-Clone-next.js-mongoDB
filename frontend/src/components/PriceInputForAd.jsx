import React from "react";
import { useFormContext } from "react-hook-form";

const Price = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex p-6 border-2 border-solid border-gray-300 h-32 rounded-md">
      {/* Label */}
      <div className="w-[30%]">
        <h3 className={`${errors.price ? "text-red-500" : ""}`}>Price*</h3>
      </div>

      {/* Input Container */}
      <div className="flex-1">
        <div className="flex items-center h-14 w-full">
          <div
            className={`flex items-center px-4 h-full rounded-md w-full ${
              errors.price ? "border-red-500" : "border-black"
            }`}
            style={{ borderWidth: "2px" }}
          >
            {/* Currency Prefix */}
            <div className="flex justify-between items-center">
              Rs
              <span className="border-l-[1px] border-black h-5 mx-2"></span>
            </div>

            {/* Input Field */}
            <input
              type="number"
              placeholder="Enter Price"
              className={`p-0 input w-full border-none outline-none focus:outline-none active:outline-none ${
                errors.price ? "text-red-500" : ""
              }`}
              {...register("price", {
                required: "Price is required",
                validate: (value) =>
                  value > 0 || "Price must be greater than zero",
              })}
            />
          </div>
        </div>
        <div className="mt-2">
          {errors.price && (
            <p className="text-red-500 text-sm mt-2">{errors.price.message}</p>
          )}
        </div>
      </div>
      {/* Error Message */}
    </div>
  );
};

export default Price;
