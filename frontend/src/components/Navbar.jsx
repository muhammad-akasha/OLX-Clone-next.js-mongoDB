"use client";

import Car from "../svg-components/Car";
import Floor from "../svg-components/Floor";
import Logo from "../svg-components/Logo";
import React, { useEffect, useState } from "react";
import LocationDropdown from "./LocationDropdown";
import SearchInp from "./SearchInp";
import { FaPlus } from "react-icons/fa";
import SellFrame from "./SellBtnFrame";
import LoginBtn from "./LoginBtn";
import { useNav } from "../Contexts/NavbarContext";
import AddNav from "./AddNav";
import SecondNav from "./SecondNav";
import Link from "next/link";
import { usePathname } from "next/navigation"; // New import
import axios from "axios";
import { useModal } from "../Contexts/AuthModalContext";
import { useAuthenticate } from "../Contexts/UserContext";
import { IoIosArrowDown } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { CiMemoPad } from "react-icons/ci";

const Navbar = () => {
  const { setIsOpenModal } = useModal();
  const pathname = usePathname(); // Get the current path
  const noRouteNav = ["/addpost", "/addpost/createadd"]; // Define routes where navbar shouldn't show
  const { setHomeNav } = useNav() || {}; // Ensure context exists

  // Check if the current route is in noRouteNav
  const showNavbar = noRouteNav.includes(pathname);
  const { isLogin, setIsLogin } = useAuthenticate();
  const [loading, setLoading] = useState(true); // Loading state
  const [hide, show] = useState(false);

  const getUser = () => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLogin(JSON.parse(user));
      setLoading(false);
      return;
    }
    setLoading(true);
    axios
      .post("http://localhost:5000/api/v1/getuser", {
        refreshToken: localStorage.getItem("refreshToken"),
      })
      .then((res) => {
        console.log(res);
        setIsLogin(res.data.user);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    if (showNavbar) {
      setHomeNav(false);
    } else {
      setHomeNav(true);
    }
    if (!isLogin) {
      getUser();
    } else {
      setLoading(false);
    }
  }, [showNavbar]);

  const handleAddPost = () => {
    if (!isLogin) {
      setIsOpenModal(true);
    }
  };
  const logout = () => {
    axios
      .post("http://localhost:5000/api/v1/logout", {
        refreshToken: localStorage.getItem("refreshToken"),
      })
      .then((res) => {
        console.log(res);
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        setIsLogin("");
      })
      .catch((err) => console.log(err));
  };

  return !showNavbar ? (
    <>
      <header className="px-8 py-[14px] bg-white sticky top-0 z-20">
        <div className="flex gap-10 items-center">
          <div>
            <Link href={"/"}>
              <Logo />
            </Link>
          </div>
          <div className="flex gap-3 items-center">
            <div className="bg-custom-gradient p-2 rounded-full">
              <Car />
            </div>
            <h3 className="font-semibold">Motors</h3>
          </div>
          <div className="flex gap-3 items-center">
            <div className="bg-custom-gradient p-2 rounded-full">
              <Floor />
            </div>
            <h3 className="font-semibold">Property</h3>
          </div>
        </div>
        <div className="mt-6 flex gap-4 items-center">
          <LocationDropdown />
          <div className="flex-1">
            <SearchInp />
          </div>
          {loading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : !isLogin ? (
            <LoginBtn />
          ) : (
            <div
              className="flex gap-1 items-center relative"
              onClick={() => show(!hide)}
            >
              <img
                width={40}
                height={40}
                src="/iconProfilePicture.png"
                alt=""
              />
              <IoIosArrowDown
                className={`transform ${
                  hide && "rotate-180"
                } transition-all delay-75 `}
                fontSize={18}
              />
              {hide && (
                <div className="absolute top-10 bg-[#f9f9f9] shadow-lg w-[288px] right-0 h-22 p-4">
                  <Link href="/myads">
                    <h2 className="flex gap-2 cursor-pointer">
                      <CiMemoPad fontSize={22} />
                      MyAds
                    </h2>
                  </Link>

                  <h2
                    className="flex gap-2 cursor-pointer mt-2"
                    onClick={logout}
                  >
                    <CiLogout fontSize={22} />
                    Logout
                  </h2>
                </div>
              )}
            </div>
          )}
          <Link
            href={`${isLogin ? "/addpost" : "/"}`}
            className={!isLogin ? `cursor-not-allowed` : "cursor-pointer"}
            onClick={handleAddPost}
          >
            <div className="relative">
              <SellFrame />
              <h5 className="flex items-center gap-2 absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
                <FaPlus /> Sell
              </h5>
            </div>
          </Link>
        </div>
      </header>
      <SecondNav />
    </>
  ) : (
    <AddNav />
  );
};

export default Navbar;
