"use client";
import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { FiPhone } from "react-icons/fi";
import { IoChatboxOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { FaRegFlag } from "react-icons/fa";
import { useParams } from "next/navigation";
import NotFound from "../../../components/NotFound";
import axios from "axios";
import AdDetailBoxes from "../../../components/AdDetailBoxes.jsx";
import Loading from "../../../components/Loading";

const Item = () => {
  function formatToMonthYear(dateString) {
    const date = new Date(dateString); // Parse the ISO date string
    const month = date.toLocaleString("en-US", { month: "short" }); // Short month format (e.g., "Dec")
    const year = date.getFullYear(); // Get the year
    return `${month} ${year}`; // Combine month and year
  }

  const { id } = useParams();
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);

  const getAdByID = async (id) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `http://localhost:5000/api/v1/getadbyid/?id=${id}`
      );
      setAd(res.data.ad);
    } catch (error) {
      console.log(error);
      setAd("");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getAdByID(id);
    }
  }, [id]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = (images) => {
    setCurrentIndex((currentIndex + 1) % images.length); // Move to next slide
  };

  const handlePrev = (images) => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length); // Move to previous slide
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {ad ? (
        <>
          <div className="flex gap-4 mt-10 mx-8">
            <div className="carousel w-[67%]">
              {ad.images.map((image, index) => (
                <div
                  key={index}
                  className={`carousel-item relative w-full justify-center h-[500px] ${
                    currentIndex === index ? "flex" : "hidden"
                  }`}
                >
                  <img
                    src={image}
                    alt={`Slide ${index + 1}`}
                    className="object-contain"
                  />
                  <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <button
                      onClick={() => handlePrev(ad.images)}
                      className="btn btn-circle"
                    >
                      ❮
                    </button>
                    <button
                      onClick={() => handleNext(ad.images)}
                      className="btn btn-circle"
                    >
                      ❯
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex-1">
              <div className="p-3 h-fit border-2 border-[#ebe6e6]">
                <div>
                  <h2 className="font-semibold text-lg">
                    Listed by private user
                  </h2>
                </div>
                <div className="mt-4 flex gap-2">
                  <div>
                    <img
                      src="/iconYoutube.svg"
                      alt="profile"
                      className="rounded-full w-14 h-14"
                    />
                  </div>
                  <div>
                    <h2 className="font-semibold text-md">{ad.name}</h2>
                    <h3 className="text-[#002f34] text-sm mt-1">
                      Member since {formatToMonthYear(ad.addedBy.createdAt)}
                    </h3>
                    <h4 className="flex mt-2 gap-4 items-center text-sm font-semibold text-[#002f34]">
                      See Profile
                      <IoIosArrowForward fontSize={14} />
                    </h4>
                  </div>
                </div>
                <button className="btn btn-neutral w-full mt-4 text-white text-md rounded-md">
                  <FiPhone fontSize={22} /> Show phone number
                </button>
                <br />
                <button className="rounded-md btn btn-ghost hover:border-4 hover:border-black w-full border-2 border-black mt-3 hover:bg-transparent">
                  <IoChatboxOutline fontSize={22} /> Chat
                </button>
              </div>
              <div className="p-3 h-fit border-2 border-[#ebe6e6] mt-4">
                <b className="text-xl">Location</b>
                <div className="flex gap-2 items-center mt-2 text-gray-800">
                  <CiLocationOn fontSize={30} /> <span>{ad.location}</span>
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <h6>AD ID {ad._id}</h6>
                <h6 className="flex gap-2 items-center font-semibold">
                  <FaRegFlag /> report this ad
                </h6>
              </div>
            </div>
          </div>
          <AdDetailBoxes
            title={ad.adTitle}
            description={ad.description}
            price={ad.price}
            brand={ad.brand}
            condition={ad.condition}
            location={ad.location}
          />
        </>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default Item;
