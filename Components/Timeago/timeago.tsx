import React, { useMemo } from "react";

interface TimeAgoProps {
  time: string;
}

const TimeAgo: React.FC<TimeAgoProps> = ({ time }) => {
  const getTimeAgo = (dateString: string) => {
    const postDate = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);

    const intervals = [
      { limit: 31536000, label: "y" },
      { limit: 2592000, label: "m" },
      { limit: 86400, label: "d" },
      { limit: 3600, label: "h" },
      { limit: 60, label: "min" },
    ];

    for (const { limit, label } of intervals) {
      const interval = Math.floor(seconds / limit);
      if (interval > 0) return `${interval} ${label}${interval > 1 ? "" : ""}`;
    }

    return "Just now";
  };

  const timeAgo = useMemo(() => getTimeAgo(time), [time]);

  return <span>{timeAgo}</span>; // Return a JSX element
};

export default TimeAgo;
