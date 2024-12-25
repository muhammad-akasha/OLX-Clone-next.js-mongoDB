"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SearchedCard from "./SearchedCard";
import Link from "next/link";

const UserAd = () => {
  const [myads, setMyads] = useState([]);
  const getMyAds = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/v1/getads", {
        refreshToken: localStorage.getItem("refreshToken"),
      });
      setMyads(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyAds();
  }, []);
  return (
    <div className="flex flex-col gap-2 my-2">
      {myads.map((item) => (
        <Link href={`/item/${item._id}`} key={item._id}>
          <SearchedCard
            adTitle={item.adTitle}
            price={item.price}
            location={item.location}
            images={item.images}
            hide={false}
          />
        </Link>
      ))}
    </div>
  );
};

export default UserAd;
