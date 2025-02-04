"use client";

import React, { useState } from "react";
import axiosInstance from "@/APIs/axiosInstance";

interface followbtnProps {
  userId: string;
}

const Followbtn: React.FC<followbtnProps> = ({ userId }) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  const senderId = localStorage.getItem("userId");

  const checkFollowing = async () => {
    try {
      const res = await axiosInstance.get(`/users/${userId}`);
      const user = res.data.user;
      if (user.followers.includes(senderId)) {
        setIsFollowing(true);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleFollow = async () => {
    checkFollowing();

    try {
      if (isFollowing) {
        await axiosInstance.post(`/users/unfollow/${userId}`, {
          userUnfollowId: senderId,
        });
        setIsFollowing(false);
      } else {
        await axiosInstance.post(`/users/follow/${userId}`, {
          userfollowId: senderId,
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
