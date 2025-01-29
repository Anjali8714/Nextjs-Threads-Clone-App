'use client'

import { useAppDispatch } from "@/Hook/useAppDispatch";
import React, { ReactNode, useState } from "react";
import { CiCircleMore } from "react-icons/ci";
import { GrGallery } from "react-icons/gr";
import Postbtn from "../Postbutton/postbtn";
import { toast, ToastContainer } from "react-toastify";
import axiosInstance from "@/APIs/axiosInstance";
import { fetchPosts } from "@/Store/Slices/postSlice";

interface ModalProps {
  isopen: boolean;
  onclose: () => void;
  children: ReactNode;
}
const PostModal: React.FC<ModalProps> = ({ isopen, onclose, children }) => {
  const [postContent, setPostContent] = useState<string>("");
  const [postImage, setPostImage] = useState<any>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const handlePostSubmit = async () => {
    const userId = localStorage.getItem("userId");
    if (postContent.trim() === "") {
      toast.success("Please write something before posting!");
      return;
    }

    if (!userId) {
      toast.success("User not found! Please log in.");
      return;
    }

    const newPostData = new FormData();
    newPostData.append("userId", userId);
    newPostData.append("text", postContent);
    newPostData.append("image", postImage);
    try {
      const res = await axiosInstance.post("/posts", newPostData);
      console.log("this is ", res);
      onclose();
      dispatch(fetchPosts());
    } catch (error) {
      console.error("Error adding new post:", error);
    }

    setPostContent("");
    setPostImage(null);
    setPreview(null);
  };

  const handleNewPost = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(e.target.value);
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPostImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isopen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black  bg-opacity-50 flex justify-center items-center">
      <div className="bg-neutral-900 rounded-2xl border border-gray-500 shadow-lg w-96 ">
        <div className="flex justify-between  items-center px-6 py-4">
          <button onClick={onclose} className="text-white">
            Cancel
          </button>
          <CiCircleMore size={20} />
        </div>
        <div className="px-6 py-4 border-t border-gray-500">
          {children}
          <ToastContainer position="bottom-center" />
          <div className="flex flex-col gap-4 mt-8">
            <textarea
              placeholder="What's new?"
              value={postContent}
              onChange={handleNewPost}
              className="bg-[#181818]"
            />

            {preview && (
              <div className="rounded-md">
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-auto object-cover rounded-md"
                />
              </div>
            )}
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <label>
                <button>
                  <GrGallery size={20} />
                </button>
              </label>
            </div>
          </div>
          <div className="flex items-end justify-end px-2 py-2">
            <Postbtn onclick={handlePostSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
