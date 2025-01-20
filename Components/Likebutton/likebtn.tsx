"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";

interface LikeBtnProps {
  likedValue: number;
  postId: string;
  likedUsers: string[];
  userId?: string | any;
}

const Likebtn = ({ likedValue, postId, likedUsers, userId }: LikeBtnProps) => {
  const [like, setLike] = useState(likedValue);
  const [isLiked, setIsLiked] = useState(false);
  const [prepost,setprepost]=useState("")
  useEffect(() => {
    if (likedUsers.includes(userId)) {
      setIsLiked(true);
    }
  }, [likedUsers, userId]);

  const handlelike = async () => {
    console.log("it is firsyt line")
    console.log("is like befor...",isLiked)
    console.log("liked valuess...",like)
   
    const updatedLike = isLiked ? like - 1 : like + 1;
    console.log("update like,",updatedLike)
    setLike(updatedLike);
    console.log("count inc,,,,,",like)
    console.log("isLike    befor change....",isLiked)
    setIsLiked(!isLiked);
    console.log("isLike    after change....",isLiked)
    console.log(userId , "userid....")
console.log(postId , "postid .....")

    try {
      console.log("islike in try",isLiked)
     
      const endpoint = isLiked
        ? `https://social-media-rest-apis-1.onrender.com/api/posts/unlike/${postId}`
        : `https://social-media-rest-apis-1.onrender.com/api/posts/like/${postId}`;
      console.log("endpoint......",endpoint)
      console.log("presost.....",prepost)
      console.log("post id.......",postId)
      if(prepost===postId)
          console.log("it is equal......")
        setprepost(postId)

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
