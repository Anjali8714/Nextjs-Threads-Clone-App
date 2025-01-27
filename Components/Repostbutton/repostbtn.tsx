import React from "react";

interface repostbtnProps {
  repostCount: number;
}
const repostbtn: React.FC<repostbtnProps> = ({ repostCount }) => {
  return (
    <button>
      <span>{repostCount}</span>
    </button>
  );
};

export default repostbtn;
