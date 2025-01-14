"use client";

import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "@/Store/store";
import { useAppSelector } from "@/Hook/useAppDispatch";
import { fetchUser } from "@/Slices/userSlice";
import { useDispatch } from "react-redux";

const page:React.FC = () => {

  const dispatch = useDispatch<AppDispatch>();

  const {users}  = useAppSelector((state: RootState) => state.users);
  const {posts} = useAppSelector((state : RootState) => state.posts);

  const [user , setUser] = useState<any>(null);
  const [isModalOpen , setIsModalOpen] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if(userId && users.length > 0){
      const foundUser = users.find((user) => user._id === userId);
      setUser(foundUser);
    }
  },[users]);

  useEffect(() => {
    dispatch(fetchUser());
  },[dispatch])

  return (
    <div className="flex flex-col h-screen">
      <div className="h-[60px] text-xl flex items-center justify-center text-white">
        For you
      </div>

      <div className="relative flex-grow  bg-[#181818] p-4 rounded-t-3xl no-scrollbar overflow-y-auto border border-[#2d2d2d] mx-auto w-[50%] lg:w-[100%]">
        <div className="flex items-center space-x-4">
          <img 
        src={user?.profilepic || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
        className="w-10 h-10 rounded-full object-cover mb-3"
        alt="User Profile"/>
        <p className="text-[#777777] ml-11">What's new?</p>
        </div>
        <button onClick={()=>setIsModalOpen(true)} className="absolute top-3 right-4 bg-[#171616] border border-gray-600 text-white font-bold px-4 py-2 rounded-lg">
          Post
        </button>
      </div>
    </div>

   
   
  );
};

export default page;