"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { useRouter } from "next/navigation";
import {  DeleteCookie } from "@/APIs/Cookie/deleteCookie";
import PostModal from "../PostModal/postModal";

const Sidebar = () => {
  const [dropdown, setDropdown] = useState(false);
  const [isPostModal , setIsPostModal] = useState(false);

  const router = useRouter();

  
  const handleLogout = () => {
    localStorage.removeItem("userId");
    DeleteCookie();
    router.push("/Login");
  };
  
  const toggleDropdown = () => {
    setDropdown((p) => !p);
  };
  
  return (
    <div>
      <div className="ml-4 h-full w-20">

        <Link href="/Main">
          <Image
            src="/Images/thread-logo.svg"
            alt="Thread Images"
            height={30}
            width={30}
            className="m-2 "
          />
        </Link>

        <Link href="/Main">
          <Image
            src="/Images/home.svg"
            alt="Home Images"
            height={25}
            width={25}
            className="m-2 mt-28"
          />
        </Link>

        <Link href="/Main/Searchbutton">
          <Image
            src="/Images/search.svg"
            alt="Search Images"
            height={25}
            width={25}
            className="m-2 mt-10"
          />
        </Link>

        <button onClick={()=>setIsPostModal(true)}> <Image
            src="/Images/plus.svg"
            alt="Search Images"
            height={25}
            width={25}
            className="m-2 mt-10"
          />
          </button>

          <PostModal isopen={isPostModal} onclose={() => setIsPostModal(false)}>
            <h2 className="text-white"></h2>
          </PostModal>
         
       

        <Link href="/Main/Activity">
          <Image
            src="/Images/heart.svg"
            alt="Heart Images"
            height={25}
            width={25}
            className="m-2 mt-10"
          />
        </Link>

        <Link href="/Main/UserProfile">
          <Image
            src="/Images/user.svg"
            alt="User Images"
            height={25}
            width={25}
            className="m-2 mt-10"
          />
        </Link>

        <HiOutlineMenuAlt2
          className="m-2 mt-44 cursor-pointer"
          size={23}
          onClick={toggleDropdown}
        />

        {dropdown && (
          <div
            className="absolute bg-gray-800 text-white rounded-lg shadow-md p-3 z-50 bottom-16 left-4 w-28 hover:bg-gray-700 transition-all duration-200"
            onClick={handleLogout}
          >
            <button className="w-full text-left px-4 py-2 text-sm font-semibold text-red-500 hover:bg-gray-600 rounded-md transition-colors duration-200">
              Log out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
