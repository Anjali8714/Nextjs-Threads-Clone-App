"use client";

import axiosInstance from "@/APIs/axiosInstance";
import { getUserId } from "@/APIs/Cookie/getCookie";
import ProfileImages from "@/Components/Profile/profileImages";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  profilepic: string;
}

interface Notification {
  _id: string;
  description: string;
  senderUSerId: User;
}

const Activity = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  // const [error , setError] = useState<string | null>(null);

  const getNotifications = async () => {
    try {
      const userId = getUserId();
      if (!userId) {
        throw Error("User ID not found");
      }

      const response = await axiosInstance.get(`/users/notification/${userId}`);
      setNotifications(response.data.notifications);
    } catch (error) {
      console.error("Error notifications:", error);
      toast.success("Failed to load notifications . Please try again later.");
    }
  };
  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0 bg-black  w-full text-center py-3 m-2 z-50">
        <div className="text-sm font-bold">Activity</div>
      </div>

      <div className="h-screen bg-[#181818] rounded-t-3xl border border-zinc-700">
        <div className="flex justify-center items-center mt-4">
          {notifications.length === 0 ? (
            <p>No notifications available...</p>
          ) : (
            notifications.map((notification) => (
              <div key={notification._id}>
                <div className="p-3">
                  <ProfileImages
                    ProfilePic={notification.senderUSerId.profilepic}
                    AltText="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-start ml-2">
                  <p className="text-white">{notification.senderUSerId.name}</p>
                  <p className="text-stone-500">{notification.description}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Activity;
