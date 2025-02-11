"use client";
import React, { useEffect, useState } from "react";
import ProfileImages from "@/Components/Profile/profileImages";
import axiosInstance from "@/APIs/axiosInstance";

const Reposts: React.FC = () => {

  const [posts, setPosts] = useState<Post[]>([]);

  type Post = {
    _id: string;
    userProfilePic: string;
    username: string;
    text: string;
    image: string;
    createdOn: string;
    replies: Reply[];
    likes: string[];
    reposts: string[];
  };

  type Reply = {
    _id: string;
    userId: string;
    userProfilePic: string;
    username: string;
    text: string;
  };

  const fetchPosts = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (userId) {
        const response = await axiosInstance.get(`/posts/${userId}`);
        setPosts(response.data.post);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      {posts.length > 0 ? (
        posts.map((post) =>
          post.reposts && post.reposts.length > 0 ? (
            <div key={post._id}>
              <div>
                <ProfileImages ProfilePic={post.userProfilePic} className="w-[50px] h-[50px] mt-7 rounded-full"/>
                <h2>{post.username}</h2>
              </div>
              <p>{post.text}</p>
              {post.image && (
                 <img
                 src={post.image}
                 alt="Post Image"
                 className="max-h-[400px] mt-6 rounded-lg ml-10 max-w-md"
               />
              )}
            </div>
          ) : null
        )
      ) : (
        <p className="flex justify-center mt-10">No reposts yet</p>
      )}
    </div>
  );
};

export default Reposts;
