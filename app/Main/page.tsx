"use client";

import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "@/Store/store";
import { useAppSelector } from "@/Hook/useAppDispatch";
import { fetchUser } from "@/Store/Slices/userSlice";
import { fetchPosts } from "@/Store/Slices/postSlice";
import { useDispatch } from "react-redux";
import TimeAgo from "@/Components/Timeago/timeago";
import LikeButton from "@/Components/Likebutton/likebtn";
import { useSelector } from "react-redux";
import PostModal from "@/Components/PostModal/postModal";
import Postbtn from "@/Components/Postbutton/postbtn";
import { FaRegComment } from "react-icons/fa";

const page: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { users } = useSelector((state: RootState) => state.users);
  const { posts } = useAppSelector((state: RootState) => state.posts);

  const [user, setUser] = useState<any>(null);

  const [isPostModal, setIsPostModal] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [currentPostId, setCurrentPostId] = useState<string | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId && users.length > 0) {
      const founduser = users.find((user) => user._id === userId);
      setUser(founduser);
    }
  }, [users]);

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="flex flex-col h-screen">
      <div className="h-[60px] text-xl flex items-center justify-center text-white">
        For you
      </div>

      <div className="relative h-screen bg-[#181818] p-4 rounded-t-3xl no-scrollbar overflow-y-auto border border-[#2d2d2d] ">
        <div>
          <div className="flex items-center">
            <img
              src={
                user?.profilepic ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              className="w-10 h-10 rounded-full object-cover mb-3"
              alt="User Profile"
            />
            <p className="text-[#777777] ml-11">What's new?</p>

            <Postbtn onclick={() => setIsPostModal(true)} />
          </div>
        </div>

        <PostModal isopen={isPostModal} onclose={() => setIsPostModal(false)}>
          <h2 className="text-white">New thread</h2>
        </PostModal>

        <div className="w-[calc(100%+2rem)] -ml-4 border-t border-gray-500 my-4"></div>
        {posts.map((post: any) => (
          <div key={post._id} className="text-white mb-4">
            <div className="flex items-center">
              <img
                src={
                  post.postById.profilepic ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="User Profile"
                className="w-10 h-10 rounded-full object-cover mr-3"
              />
              <div>
                <div className="flex flex-row items-center">
                  <p className="font-bold">
                    {post.postById.username || "Unknown User"}
                  </p>
                  <p className="text-gray-400 ml-2 text-xs">
                    <TimeAgo time={post.createdOn} />
                  </p>
                </div>
                <p className="mt-2">{post.text}</p>
              </div>
            </div>

            {post.image && (
              <img
                src={post.image}
                alt="post"
                className="max-h-[400px] mt-2 rounded-lg ml-5 max-w-md"
              />
            )}

            <div className="mt-3 ml-5 flex space-x-4 items-center">
              <LikeButton
                likedValue={post.likes.length}
                postId={post._id}
                likedUsers={post.likes}
              />

              <div>
                <FaRegComment
                  size={20}
                  onClick={() => {
                    setCurrentPostId(post._id);
                    setIsCommentModalOpen(true);
                  }}
                />
              </div>
            </div>

            <div className="w-[calc(100%+2rem)] -ml-4 border-t border-gray-500 my-4"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
