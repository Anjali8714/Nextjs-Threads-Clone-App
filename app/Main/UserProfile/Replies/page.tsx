"use client";

import axiosInstance from "@/APIs/axiosInstance";
import ProfileImages from "@/Components/Profile/profileImages";
import { useEffect, useState } from "react";

const Replies: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  interface User {
    _id: string;
    username: string;
    userProfilePic: string;
  }
  interface Post {
    _id: string;
    userProfilePic: string;
    username: string;
    postById: User;
    text: string;
    image: string;
    createdOn: string;
    replies: Reply[];
    likes: string[];
    reposts: string[];
  }

  interface Reply {
    _id: string;
    userId: string;
    image: string;
    userProfilePic: string;
    username: string;
    text: string;
  }

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
          post.replies && post.replies.length > 0 ? (
            <div key={post._id}>
              <ProfileImages
                ProfilePic={post.userProfilePic}
                className="w-[50px] h-[50px] mt-7 rounded-full"
              />
              <h2 className="ml-14 -mt-12">{post.postById.username}</h2>
              <h2 className="ml-14 ">{post.text}</h2>
              {post.image && (
                <img
                  src={post.image}
                  alt="Post Image"
                  className="max-h-[400px] mt-6 rounded-lg ml-10 max-w-md"
                />
              )}
              {post.replies.map((reply) => (
                <div key={reply._id}>
                  <div>
                    {reply.userProfilePic && (
                      <ProfileImages ProfilePic={reply.userProfilePic} />
                    )}
                    <h4 className="ml-14">{reply.username}</h4>
                  </div>
                  <p className="ml-14">{reply.text}</p>
                </div>
              ))}
            </div>
          ) : null
        )
      ) : (
        <p className="flex justify-center items-center mt-10">No replies yet</p>
      )}

      
    </div>
  );
};

export default Replies;
