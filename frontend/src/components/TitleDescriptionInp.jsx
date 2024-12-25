import React from "react";
import { IoSearch } from "react-icons/io5";
import { useFormContext } from "react-hook-form";

const TitleDescription = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="border-b-2 border-solid border-gray p-5">
      {/* Ad Title Input */}
      <div className="flex p-3">
        <div className="w-[30%]">
          <h3 className={`${errors.title ? "text-red-500" : ""}`}>Ad Title*</h3>
        </div>
        <div className="flex-1">
          <div
            className={`flex items-center px-6 ${
              errors.title ? "border-red-500" : "border-black"
            }`}
            style={{ borderWidth: "2px" }}
          >
            <input
              type="text"
              placeholder="Enter Title"
              className={`input w-full border-none focus:outline-none active:outline-none ${
                errors.title ? "text-red-500" : ""
              }`}
              {...register("title", { required: "Title is required" })}
            />
          </div>
          {errors.title && (
            <p className="text-red-500 text-sm mt-2">{errors.title.message}</p>
          )}
        </div>
      </div>

      {/* Description Input */}
      <div className="flex p-3">
        <div className="w-[30%]">
          <h3 className={`${errors.description ? "text-red-500" : ""}`}>
            Description*
          </h3>
        </div>
        <div className="flex-1">
          <div
            className={`flex items-center relative px-6 ${
              errors.description ? "border-red-500" : "border-black"
            }`}
            style={{ borderWidth: "2px", minHeight: "144px" }}
          >
            <textarea
              placeholder="Describe the item you're selling"
              className={`pl-4 py-2 pr-7 w-full h-full absolute top-0 left-0 resize-none border-none outline-none focus:outline-none active:outline-none ${
                errors.description ? "text-red-500" : ""
              }`}
              {...register("description", {
                required: "Description is required",
              })}
            ></textarea>
          </div>
          {errors.description && (
            <p className="text-red-500 text-sm mt-2">
              {errors.description.message}
            </p>
          )}
        </div>
      </div>

      {/* Location Input */}
      <div className="flex p-3">
        <div className="w-[30%]">
          <h3 className={`${errors.location ? "text-red-500" : ""}`}>
            Location*
          </h3>
        </div>
        <div className="flex-1">
          <div
            className={`flex items-center px-6 ${
              errors.location ? "border-red-500" : "border-black"
            }`}
            style={{ borderWidth: "2px" }}
          >
            <IoSearch fontSize={22} />
            <input
              type="text"
              placeholder="Location"
              className={`input w-full border-none outline-none focus:outline-none active:outline-none ${
                errors.location ? "text-red-500" : ""
              }`}
              {...register("location", { required: "Location is required" })}
            />
          </div>
          {errors.location && (
            <p className="text-red-500 text-sm mt-2">
              {errors.location.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TitleDescription;
