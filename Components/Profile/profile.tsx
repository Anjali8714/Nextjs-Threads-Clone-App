"use client";

import { useAppDispatch, useAppSelector } from "@/Hook/useAppDispatch";
import { fetchUser } from "@/Store/Slices/userSlice";
import React, { useEffect, useState } from "react";
import ProfileImages from "./profileImages";
import EditProfile from "../EditProfile/editProfile";
import Link from "next/link";

const Profile = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.users);

  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [userBio, setUserBio] = useState<string>("");
  const [followers, setFollowers] = useState<string[]>([]);
  const [profilePic, setProfilePic] = useState<string>("");
  const [isEditModal, setIsEditModal] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId && users.length > 0) {
      const user = users.find((user) => user._id === userId);
      if (user) {
        setName(user.name || "");
        setUsername(user.username || "");
        setUserBio(user.bio || "");
        setFollowers(user.followers || []);
        setProfilePic(user.profilepic || "");
      }
    }
  }, [users]);

  const handleEditProfileOpen = () => {
    setIsEditModal(true);
  };
  const handleEditProfileClose = () => {
    setIsEditModal(false);
  };

  return (
    <div className="flex flex-col ">
      <div className="flex justify-center items-center m-6 font-semibold text-sm">
        Profile
      </div>

      <div className=" flex-grow  bg-[#181818] p-4 rounded-t-3xl no-scrollbar overflow-y-auto border border-[#2d2d2d] mx-auto w-[100%] lg:w-[100%] ">
        <div className="text-white">
          <h1 className="text-2xl font-semibold mt-6">{name}</h1>
          <h6 className="text-sm">{username}</h6>
          <h6 className="text-sm mt-6">{userBio}</h6>
          <h6 className="text-sm mt-4">{followers.length} followers</h6>
          <ProfileImages
            AltText="Profile"
            ProfilePic={profilePic}
            className="w-[75px] h-[75px]  rounded-full ml-auto -mt-28"
          />
        </div>
        <div
          className="bg-[#181818] flex justify-center mt-28 rounded-lg border border-[#2d2d2d] p-2 font-bold text-sm h-9 hover:cursor-pointer"
          onClick={handleEditProfileOpen}
        >
          Edit profile
        </div>
        <EditProfile isOpen={isEditModal} onClose={handleEditProfileClose} />
      <div className="flex justify-between items-center p-5">
        <Link href="/Main" className="text-[#777777] hover:text-white transition-colors ml-8">Threads</Link>
        <Link href="/Main/UserProfile/Replies" className="text-[#777777] hover:text-white transition-colors">Replies</Link>
        <Link href="/Main/UserProfile/Reposts" className="text-[#777777] hover:text-white transition-colors mr-6">Reposts</Link>

      </div>
      </div>
    </div>
  );
};

export default Profile;
