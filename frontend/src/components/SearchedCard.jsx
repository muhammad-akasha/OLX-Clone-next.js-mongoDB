import React from "react";
import { MdOutlinePhone } from "react-icons/md";
import { FaRocketchat } from "react-icons/fa";
import Cards from "./Cards";

const SearchedCard = (item) => {
  return (
    <>
      {item.hide ? (
        <Cards
          image={item.images}
          title={item.adTitle}
          price={item.price}
          location={item.location}
          timeSincePosted={item.diff}
        />
      ) : (
        <div className="w-full h-52 flex border-[0.1rem] border-solid border-[rgba(0,47,52,0.2)] rounded-[0.4rem] cursor-pointer overflow-hidden relative select-none gap-2 bg-white">
          <div className="w-[30%]">
            <img
              className="w-full h-full object-cover"
              src={item.images[0]}
              alt={item.adTitle}
            />
          </div>
          <div className="p-5">
            <h3 className="font-semibold text-2xl">Rs {item.price}</h3>
            <p className="mt-2 text-lg">{item.adTitle}</p>
            <p className="mt-6">
              {item.location} . {item.diff}
            </p>
            <div className="mt-2">
              <button className="btn w-30 text-[17px]">
                <MdOutlinePhone fontSize={22} /> call
              </button>
              <button className="btn btn-neutral ml-5 text-[17px]">
                <FaRocketchat fontSize={22} /> chat
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchedCard;
