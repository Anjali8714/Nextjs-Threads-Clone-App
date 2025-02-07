"use client";

import Followbtn from "@/Components/FollowButton/followbtn";
import ProfileImages from "@/Components/Profile/profileImages";
import { useAppDispatch, useAppSelector } from "@/Hook/useAppDispatch";
import { fetchUser } from "@/Store/Slices/userSlice";
import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";

const Searchbtn: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.users);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [currentUsers, setCurrentUsers] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    //  console.log(userId,"userid......")
    if (userId && users.length > 0) {
      const user = users.find((user) => user._id === userId);
      if (user) {
        setCurrentUsers(user);
      }
    }
  }, [users]);

  useEffect(() => {
    setFilteredUsers(
      users.filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, users]);

  // const handleSearchButton = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchTerm(e.target.value);
  // };

  return (
    <div className="flex flex-col items-center justify-center  min-h-screen text-white">
      <div className="sticky top-0 bg-black  w-full text-center py-3 m-2 z-50">
        <div className="text-sm font-bold">Search</div>
      </div>

      <div className="bg-[#181818] sticky border border-zinc-700 rounded-3xl p-4 w-[100%]">
        <div className="flex justify-between items-center bg-black rounded-2xl border border-zinc-700 p-1 max-w-xl m-2">
          <IoSearch size={20} className="ml-5 text-stone-700" />

          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
            className="flex-grow border-none bg-transparent outline-none text-sm p-2 placeholder-stone-500"
          />
        </div>

        <p className="m-3 mt-7 text-neutral-500 font-semibold text-sm">
          Follow suggestions
        </p>

        <div className="flex flex-col gap-4 max-w-xl">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user._id}
                className="bg-[#181818] rounded-lg p-4 shadow-md flex items-center justify-between"
              >
                <div className="flex items-center">
                  <ProfileImages
                    ProfilePic={
                      user.profilepic ||
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    AltText="Profile"
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="ml-2">
                    <p className="font-bold text-white">{user.name}</p>
                    <p className="text-sm text-neutral-400">{user.username}</p>
                    <p className="text-sm text-neutral-500">
                      {user.followers.length} followers
                    </p>
                  </div>
                </div>

                {currentUsers && currentUsers._id !== user._id && (
                  <Followbtn userId={user._id} followers={user.followers} />
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center">No users found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Searchbtn;
