import axios from "axios";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { IoSearchOutline } from "react-icons/io5";
import { useSearched } from "../Contexts/SearchItemContext";
import { useRouter } from "next/navigation";
import formatDateDifferenceWithNow from "../components/DateCompareFunc";

const SearchInp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { data, setData } = useSearched();
  const [inputVal, setInputVal] = useState("");
  const [hideSearch, setHideSearch] = useState(true);

  const dropdownRef = useRef(null);

  // Hide the dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setHideSearch(true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const router = useRouter();

  const onSubmit = () => {
    router.push(`/searcheditem?q=${inputVal}`);
    setHideSearch(true);
  };

  const searchInp = async (val) => {
    if (val.length > 0) {
      setHideSearch(false);
      setInputVal(val);
      try {
        const response = await axios.post(
          `http://localhost:5000/api/v1/getbysearch`,
          {
            inputSearch: val,
          }
        );
        // Check if the response contains data and log it
        if (response.data && response.data.response.length > 0) {
          const createdAt = response.data.response.map((item) => {
            return {
              ...item,
              diff: formatDateDifferenceWithNow(item.createdAt),
            };
          });
          setData(createdAt);
        } else {
          console.log("No results found");
          setData("");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setData("");
      setInputVal("");
      setHideSearch(false);
    }
  };

  return (
    <form
      className="max-w-3xl w-full relative"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full flex items-center">
        <input
          className={`input input-bordered input-md w-full pl-3 pr-12 rounded-l-md rounded-r-none focus:outline-none  placeholder:text-lg ${
            errors.search ? "focus:border-[red]" : "focus:border-[#23E5DB]"
          } `}
          type="text"
          {...register("search", { required: "please add input" })}
          placeholder="Find Cars, Mobile Phones and more..."
          onChange={(e) => searchInp(e.target.value)}
        />
        <div className="p-[13px] rounded-r-md bg-black flex items-center justify-center">
          <button type="submit">
            <IoSearchOutline className="text-[#fff] text-[23px] font-semibold" />
          </button>
        </div>
      </div>

      {!hideSearch && data.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute bg-white w-full text-black shadow-md"
        >
          {data.map((item) => (
            <Link
              onClick={() => setHideSearch(true)}
              key={item._id}
              href={`/searcheditem?q=${item.adTitle}`}
            >
              <div className="cursor-pointer hover:bg-[#17fbef4d] w-full border-[0.1rem] p-4 border-[#ced6d7] border-soild">
                <h3 className="text-sm">
                  <span className="font-semibold">{item.adTitle}</span> in{" "}
                  {item.category}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      )}
    </form>
  );
};

export default SearchInp;
