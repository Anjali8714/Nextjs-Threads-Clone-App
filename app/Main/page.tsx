"use client";

import React from "react";

const page= () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="h-[60px] text-xl flex items-center justify-center text-white">
        For you
      </div>
      <div className="relative flex-grow  bg-[#181818] p-4 rounded-t-3xl no-scrollbar overflow-y-auto border border-[#2d2d2d] mx-auto w-[50%] lg:w-[100%]">
        <div className="flex items-center space-x-4">
        <div className="rounded-full w-10 h-10 border border-gray-500 bg-slate-200"></div>
        <p className="text-[#777777] ml-11">What's new?</p>
        </div>
        <button className="absolute top-3 right-4 bg-[#171616] border border-gray-600 text-white font-bold px-4 py-2 rounded-lg">
          Post
        </button>
      </div>
    </div>
  );
};

export default page;