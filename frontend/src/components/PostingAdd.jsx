import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useCategory } from "../Contexts/CategoryContext";
import Category from "./Category";
import UploadImages from "./UploadImagesForAd";
import BrandCondition from "./BrandConditionInp";
import TitleDescription from "./TitleDescriptionInp";
import Price from "./PriceInputForAd";
import AdHolderDetails from "./AdHolderDetails";
import axios from "axios";

const PostingAdd = () => {
  const { categoryDetail } = useCategory();

  // Initialize React Hook Form
  const methods = useForm();

  const onSubmit = (data) => {
    const adData = new FormData();
    console.log(categoryDetail);
    // Append the data to the FormData object
    adData.append("name", data.name);
    adData.append("adTitle", data.title);
    adData.append("description", data.description);
    adData.append("location", data.location);
    adData.append("brand", data.brand);
    adData.append("condition", data.condition);
    adData.append("phone", data.phone);
    adData.append("price", data.price);
    adData.append("category", categoryDetail.title);
    adData.append("subCategory", categoryDetail.category);
    adData.append("showPhoneNumber", data.showPhoneNumber);
    adData.append("refreshToken", localStorage.getItem("refreshToken"));

    // If you have an array of files for images, you can append each file like this:
    data.images.forEach((image) => {
      adData.append(`images`, image);
    });
    axios
      .post("http://localhost:5000/api/v1/addolxad", adData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {categoryDetail && (
        <div className="w-[70%] m-5">
          {/* Provide form context to child components */}
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <div className="border-[1px] border-solid border-[#002F345C] rounded-md">
                <Category />
                <UploadImages />
                <BrandCondition />
                <TitleDescription />
              </div>
              <div className="mt-5 rounded-md">
                <Price />
              </div>
              <div className="border-2 border-solid border-[#002F345C] mt-5 rounded-md">
                <AdHolderDetails />
                <div className="flex justify-end py-5 px-7 border-t-2 border-[#002F345C]">
                  <button type="submit" className="btn btn-neutral">
                    Post Now
                  </button>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      )}
    </>
  );
};

export default PostingAdd;
