"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";

interface LikeBtnProps {
  likedValue: number;
  postId: string;
  likedUsers: string[];
}

const Likebtn = ({ likedValue, postId, likedUsers}: LikeBtnProps) => {

  const [like, setLike] = useState(likedValue);
  const [isLiked, setIsLiked] = useState(false);

  const userId = localStorage.getItem('userId')
 

  useEffect(() => {
    if (likedUsers.includes(userId as string)) {
      setIsLiked(true);
    }
  }, [likedUsers, userId]);

 
  const handlelike = async () => {

    const updatedLike = isLiked ? like - 1 : like + 1;
    setLike(updatedLike);
    setIsLiked(!isLiked);

    try {
     
      const endpoint = isLiked
        ? `https://social-media-rest-apis-1.onrender.com/api/posts/unlike/${postId}`
        : `https://social-media-rest-apis-1.onrender.com/api/posts/like/${postId}`;

      const response = await axios.post(endpoint, { userId : userId });

      console.log("Response:", response);

      if (response.status !== 200) {
        throw new Error("Failed to update like on the server.");
      }
    } catch (error) {
      console.error("Error updating like:", error);
      setLike(isLiked ? like + 1 : like - 1);
      setIsLiked(isLiked);
    }
  };




  return (
    <button onClick={handlelike}>
      <div className="flex">
        <CiHeart className="text-2xl"  color={isLiked ? '#FF0034' :"white"} />
        <div>{like}</div>
      </div>
    </button>
  );
};

export default Likebtn;
