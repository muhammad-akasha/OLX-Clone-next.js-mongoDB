import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { TbCameraPlus } from "react-icons/tb";
import { useFormContext } from "react-hook-form"; // Use form context and controller
import { RxCross2 } from "react-icons/rx";

const UploadImages = () => {
  const { setValue, watch } = useFormContext(); // Get methods from form context
  const [images, setImages] = useState(watch("images") || []); // Retrieve images from form state

  // Handle image selection
  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (images.length + selectedFiles.length <= 13) {
      setImages((prevImages) => [...prevImages, ...selectedFiles]);
      setValue("images", [...images, ...selectedFiles]); // Update form value
    } else {
      alert("You can only upload up to 13 images.");
    }
  };

  // Generate camera items dynamically (limit to 13 images max)
  const generateCameraItems = () => {
    return Array.from({ length: Math.min(13 - images.length) }).map((_, i) => (
      <div
        key={i}
        className="w-[70px] h-[54px] rounded-md p-5 border-[1px] border-solid border-[#002F3433] flex justify-center items-center mr-3 mb-3"
      >
        <TbCameraPlus fontSize={20} />
      </div>
    ));
  };

  const imageSplice = (index) => {
    images.splice(index, 1), setImages((prev) => [...prev]);
    setValue("images", [...images]);
  };

  return (
    <section className="flex justify-between p-5 border-b-2 border-gray">
      <div>
        <h3 className="font-semibold text-lg">Upload Images</h3>
      </div>
      <div className="flex relative flex-col w-[70%] z-10">
        <div className="flex flex-wrap">
          {/* File input should only cover the upload button */}
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            required
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          />
          {/* Add image upload button with file input */}
          <div className="w-[70px] h-[54px] rounded-md p-5 bg-[#ebf1ff] flex justify-center items-center mr-3 mb-3 cursor-pointer">
            <FaPlus fontSize={16} />
          </div>

          {/* Display selected images */}
          {images.length > 0 &&
            images.map((image, index) => (
              <div
                key={index}
                className="w-[70px] h-[54px] rounded-md border-[1px] border-solid border-[#002F3433] flex justify-center items-center mr-3 mb-3 cursor-pointer relative z-30"
              >
                <RxCross2
                  onClick={() => imageSplice(index)}
                  className="absolute top-[0.1rem] right-[0.1rem] hover:bg-white hover:text-black"
                />
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Uploaded ${index + 1}`}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            ))}

          {/* Dynamically generated camera items if there's space for more images */}
          {generateCameraItems()}
        </div>

        <h6 className="text-gray-500 text-[13px] mt-1">
          For the cover picture, we recommend using landscape mode.
        </h6>
      </div>
    </section>
  );
};

export default UploadImages;
