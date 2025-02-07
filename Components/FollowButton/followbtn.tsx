"use client";

import React, { useEffect, useState } from "react";
import axiosInstance from "@/APIs/axiosInstance";

interface followbtnProps {
  userId: string;
  followers: string[];
}

const Followbtn: React.FC<followbtnProps> = ({ userId, followers }) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [currentUserId , setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const senderId = localStorage.getItem("userId");

      if (senderId) {
        setCurrentUserId(senderId)
        setIsFollowing(followers.includes(senderId));
      } else {
        setIsFollowing(false);
      }
    
  }, [followers , userId]);



  const handleFollow = async () => {
    if(!currentUserId){
      console.log("User ID not found in localStorage");
      return
    }

    try {
      if (isFollowing) {

        await axiosInstance.post(`/users/unfollow/${currentUserId}`, {
          userUnfollowId: userId,
        });
        setIsFollowing(false);
      } else {

        await axiosInstance.post(`/users/follow/${currentUserId}`, {
          userfollowId: userId,
        });
        setIsFollowing(true);
      }
    } catch (error) {
      console.error("Error during follow/unfollow:", error);
    }
  };

  return (
    <button
      onClick={handleFollow}
      className="border-[#2d2d2d] border w-28 text-sm rounded-xl h-8 bg-white text-black"
    >
      {isFollowing ? "Following" : "Follow"}
    </button>
  );
};

export default Followbtn;
