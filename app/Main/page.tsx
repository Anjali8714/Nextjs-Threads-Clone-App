"use client";

import Sidebar from "@/Components/Sidebar/sidebar";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="h-[60px] text-xl flex items-center justify-center bg-black text-white">
        For you
      </div>
      <div className="h-screen lg:space-x-6 flex items-center justify-center bg-[#181818] p-4 rounded-t-3xl no-scrollbar overflow-y-auto border border-[#2d2d2d] mx-auto w-[50%] lg:w-[50%]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <p className="text-[#777777]">What's new?</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
