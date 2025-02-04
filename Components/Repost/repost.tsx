"use client";

import axiosInstance from "@/APIs/axiosInstance";
import { useAppDispatch, useAppSelector } from "@/Hook/useAppDispatch";
import { fetchPosts } from "@/Store/Slices/postSlice";
import { onClose } from "@/Store/Slices/repostSlice";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface RepostProps {
  postId: string;
  username: string;
  userProfilePic: string;
}

const repost: React.FC<RepostProps> = ({
  postId,
  userProfilePic,
  username,
}) => {
  const [error, setError] = useState<String | null>(null);

  const dispatch = useAppDispatch();

  const isRepostOpen = useAppSelector((state) => state.repost.isRepostOpen);

  const handleRepost = async () => {
    setError(null);
    const userId = localStorage.getItem("userId");
    const repost = {
      userId: userId,
      userProfilePic: userProfilePic,
      username: username,
    };

    try {
      await axiosInstance.post(`/posts/repost/${postId}`, repost);
      dispatch(onClose());
      dispatch(fetchPosts());
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed repost";
      setError(errorMessage);
      toast.success("Failed to repost");
    }
  };

  if (!isRepostOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-[#181818] p-5 rounded-lg w-[300px] text-center relative">
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mt-9 flex justify-center gap-4">
          <button onClick={() => dispatch(onClose())}>Cancel</button>
          <button onClick={handleRepost}>Repost</button>
        </div>
      </div>
    </div>
  );
};

export default repost;
