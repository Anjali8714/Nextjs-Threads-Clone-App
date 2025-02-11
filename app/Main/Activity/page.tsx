"use client"

import axiosInstance from "@/APIs/axiosInstance";
import ProfileImages from "@/Components/Profile/profileImages";
import React, { useState } from "react";

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
  senderUserId: User;
}


 const Activity = () => {
  const [notifications , setNotifications] = useState<Notification[]>([]);

  const getNotifications = async() => {
    try {
      const userId = localStorage.getItem('userId');
      if(!userId){
        console.log("User ID not found in localStorage");
        return
      }
      const response = await axiosInstance.get(`/users/notification/${userId}`);
      setNotifications(response.data.notifications);
    } catch (error) {
      console.error("Error fetching notifications",error);
    }
  }

  
  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0 bg-black  w-full text-center py-3 m-2 z-50">
        <div className="text-sm font-bold">Activity</div>
      </div>

      <div className="h-screen bg-[#181818] rounded-t-3xl border border-zinc-700 p-4">
       
          {notifications.length === 0 ? (
            <p className="text-center text-white">No notifications available...</p>
          ) : (
            notifications.map((notification) => (
              <div key={notification._id}>
                <div className="p-3">
                  <ProfileImages
                    ProfilePic={notification.senderUserId.profilepic}
                    AltText="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
                <div className="flex flex-col ml-2">
                  <p className="text-white font-semibold">{notification.senderUserId.name}</p>
                  <p className="text-stone-500">{notification.description}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
  );
}

export default Activity;
