"use client";
import React, { useState } from "react";
import CategoryBox from "../../components/CategoryBox";
import SelectCategoryBox from "../../components/SelectCategoryBox";
import { externalCategory } from "../../components/ExternalCategoryArray";
import { useCategory } from "../../Contexts/CategoryContext";
import Link from "next/link";
import { categories } from "../../components/CategoriesArray";
const AddPost = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedNestedCategory, setSelectedNestedCategory] = useState("");
  const { categoryDetail, setCategoryDetail } = useCategory();

  // Function to set the selected category
  const checkSelected = (item) => {
    setCategoryDetail(item);
    setSelectedCategory(item.title);
    setSelectedNestedCategory(""); // Reset nested category on change
  };

  return (
    <div>
      <div>
        <h3 className="text-center text-lg font-semibold uppercase mt-4 mb-10">
          Post your ad
        </h3>
      </div>
      <div>
        <h4 className="ml-12 font-semibold text-md mb-4">Choose a category</h4>
      </div>

      {/* If no category is selected, show the category options */}
      {!selectedCategory ? (
        <div className="grid grid-cols-3 mx-auto gap-3 items-center text-center w-full max-w-screen-xl">
          {categories.map((item, index) => (
            <div
              key={index}
              onClick={() => checkSelected(item)}
              className="mx-auto flex w-full md:w-auto"
            >
              <CategoryBox src={item.src} alt={item.alt} title={item.title} />
            </div>
          ))}
        </div>
      ) : (
        // When a category is selected, show nested categories
        <div className="grid grid-cols-3 justify-center mx-auto gap-0 border-[1px] border-[#002F345C] rounded-md mt-2 items-start text-center w-full max-w-screen-xl mb-5 h-full">
          <div className="flex-1 border-r-[1px] border-solid border-[#002F345C] h-full">
            {/* Display category options with highlighting */}
            {categories.map((item, index) => (
              <div
                key={index}
                className={`mx-auto md:w-auto border-b-[1px] border-solid border-[#002F345C] ${
                  selectedCategory === item.title && "bg-[#c8f8f6]"
                }`}
                onClick={() => checkSelected(item)}
              >
                <SelectCategoryBox
                  icon={item.icon}
                  title={item.title}
                  alt={item.alt}
                  arrow={true}
                />
              </div>
            ))}
          </div>

          {/* Show the nested categories based on the selected category */}
          {selectedCategory && (
            <div className="flex-1 h-full border-r-[1px] border-solid border-[#002F345C]">
              {externalCategory[0][categoryDetail.title]?.title.map(
                (item, index) => (
                  <Link
                    key={index}
                    href={
                      !externalCategory[0][categoryDetail.title]?.options?.[
                        item
                      ]
                        ? "/addpost/createadd"
                        : "/addpost"
                    }
                  >
                    <div
                      onClick={() => {
                        setSelectedNestedCategory(item);
                        setCategoryDetail((prev) => ({
                          ...prev,
                          category: item,
                        }));
                      }}
                      className="mx-auto md:w-auto border-b-[1px] border-[#002F345C]"
                    >
                      <SelectCategoryBox
                        title={item}
                        arrow={
                          externalCategory[0][categoryDetail.title]?.options?.[
                            item
                          ]
                            ? true
                            : false
                        }
                      />
                    </div>
                  </Link>
                )
              )}
            </div>
          )}

          {/* If a nested category is selected, show further options */}
          {categoryDetail.title &&
          selectedNestedCategory &&
          externalCategory[0][categoryDetail.title].options &&
          externalCategory[0][categoryDetail.title].options[
            selectedNestedCategory
          ] ? (
            <div className="flex-1 h-full">
              {externalCategory[0][selectedCategory].options[
                selectedNestedCategory
              ].map((item, index) => (
                <Link href={"/addpost/createadd"} key={index}>
                  <div
                    onClick={() => {
                      setCategoryDetail((prev) => ({
                        ...prev,
                        category: prev.category + ` / ${item}`,
                      }));
                    }}
                    className="mx-auto md:w-auto border-b-[1px] border-solid border-[#002F345C]"
                  >
                    <SelectCategoryBox title={item} arrow={false} />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex-1"></div>
          )}
        </div>
      )}
    </div>
  );
};

export default AddPost;
