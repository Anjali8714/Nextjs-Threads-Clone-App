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
import Reply from "@/Components/Reply/reply";
import Repostbtn from "@/Components/Repostbutton/repostbtn";
import Repost from "@/Components/Repost/repost";
import { IoMdMore } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import axiosInstance from "@/APIs/axiosInstance";

const page: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { users } = useSelector((state: RootState) => state.users);
  const { posts } = useAppSelector((state: RootState) => state.posts);

  const [user, setUser] = useState<any>(null);

  const [isPostModal, setIsPostModal] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [currentPostId, setCurrentPostId] = useState<string | null>(null);
  const [postId, setPostId] = useState<string | null>(null);
  const [isRepostModalOpen, setIsRepostModalOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [deletePostId, setDeletePostId] = useState<string | null>(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    // console.log(userId)
    if (userId && users.length > 0) {
      const founduser = users.find((user) => user._id === userId);
      setUser(founduser);
    }
  }, [users]);

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleModalRepost = (postId: string) => {
    setPostId(postId);
    setIsRepostModalOpen(true);
  };

  const toggleDropdown = (postId: string) => {
    setDropdown((p) => (p === postId ? null : postId));
  };

  const openDeleteModal = (postId: string) => {
    setDeletePostId(postId);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeletePostId(null);
    setDeleteModalOpen(false);
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/posts/${deletePostId}`);
      toast.success("post deleted successfully");
      dispatch(fetchPosts());
      closeDeleteModal();
    } catch (error) {
      console.error("Failed to deletd post", error);
      toast.error("Failed to delete the post ");
    }
  };
  return (
    <div className="flex flex-col h-screen">
      <div className="h-[60px] text-xl flex items-center justify-center text-white">
        For you
      </div>

      <div className="relative flex-grow  bg-[#181818] p-4 rounded-t-3xl no-scrollbar overflow-y-auto border border-[#2d2d2d] mx-auto w-[100%] lg:w-[100%]">
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

        <Reply
          isopen={isCommentModalOpen}
          onclose={() => setIsCommentModalOpen(false)}
          userId={user?._id}
          username={user?.username}
          postId={currentPostId || ""}
          userProfilePic={user?.profilepic}
        />

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
                    <TimeAgo time={post.createdtime} />
                  </p>

                  <IoMdMore
                    className="m-2 mt-2 cursor-pointer"
                    size={23}
                    onClick={() => toggleDropdown(post._id)}
                  />

                  {dropdown === post._id && (
                    <div className=" bg-gray-800 text-white rounded-lg shadow-md p-3 z-50  top-2 w-28 hover:bg-gray-700 transition-all duration-200">
                      <button
                        className="w-full text-left px-4 py-2 text-sm font-semibold text-red-500 hover:bg-gray-600 rounded-md transition-colors duration-200"
                        onClick={() => openDeleteModal(post._id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
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

            <div className="mt-2 ml-5 flex space-x-4 items-center">
              <LikeButton
                likedValue={post.likes.length}
                postId={post._id}
                likedUsers={post.likes}
              />

              <div className="ml-1 flex space-x-1 items-center">
                <FaRegComment
                  size={20}
                  onClick={() => {
                    setCurrentPostId(post._id);
                    setIsCommentModalOpen(true);
                  }}
                />
                {post.replies && <span>{post.replies.length}</span>}
              </div>

              <div>
                <Repostbtn
                  repostCount={post.reposts.length}
                  postId={post._id}
                  setPostId={handleModalRepost}
                />
              </div>
            </div>
            <div className="w-[calc(100%+2rem)] -ml-4 border-t border-gray-500 my-4"></div>
          </div>
        ))}

        <Repost
          postId={postId || ""}
          userProfilePic={user?.profilepic}
          username={user?.username}
        />
      </div>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black border-opacity-50">
          <div className="bg-neutral-900 rounded-lg shadow-lg w-[400px] p-5 text-white">
            <ToastContainer />
            <h2 className="text-lg font-bold mb-3">Deletepost</h2>
            <p>Are you sure you want to delete this post?</p>
            <div className="flex justify-end space-x-3 mt-4">
              <button
                className="px-4 py-2 bg-gray-500 rounded-lg"
                onClick={closeDeleteModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 rounded-lg"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
