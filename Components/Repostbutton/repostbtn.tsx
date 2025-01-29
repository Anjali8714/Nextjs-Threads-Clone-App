'use client'

import { isOpen } from "@/Store/Slices/repostSlice";
import React from "react";
import { BiRepost } from "react-icons/bi";
import { useDispatch } from "react-redux";


interface RepostbtnProps {
  repostCount: number;
  postId:string;
  setPostId:(postId:string) => void;
}

const Repostbtn: React.FC<RepostbtnProps> = ({ repostCount , postId ,setPostId }) => {

  const dispatch = useDispatch();

  return (
    <button onClick={() => {
      dispatch(isOpen());
      setPostId(postId);
    }}>
      <div className="flex space-x-1 mt-2">

    <BiRepost size={25}/>
    <span>{repostCount}</span>
      </div>
    </button>
  );
};

export default Repostbtn;
