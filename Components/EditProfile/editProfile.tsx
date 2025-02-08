import axiosInstance from "@/APIs/axiosInstance";
import { useAppDispatch } from "@/Hook/useAppDispatch";
import { fetchUser } from "@/Store/Slices/userSlice";
import React, { useEffect, useState } from "react";

interface EditProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isOpen) {
      const fetchProfileData = async () => {
        try {
          const response = await axiosInstance.get(
            `/users/${localStorage.getItem("userId")}`
          );
          if (response.status === 200) {
            const userData = response.data.user;
            setName(userData.name);
            setUsername(userData.username);
            setEmail(userData.email);
            setBio(userData.bio);
            setPreviewImage(userData.profilepic);
          }
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      };
      fetchProfileData();
    }
  }, [isOpen]);

  const handlFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePic(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("bio", bio);
      if (profilePic) {
        formData.append("profilePic", profilePic);
      }
      const response = await axiosInstance.patch(
        `/users/${localStorage.getItem("userId")}`,
        formData
      );
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        onClose();
        dispatch(fetchUser());
      }
    } catch (error) {
      console.error("Error updating profile :", error);
    }
  };
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-neutral-900 p-8 rounded-lg max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-300 text-2xl border-none bg-transparent"
        >
          x
        </button>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm mb-2">
              Name
            </label>
            <input
              type="text"
              name={name}
              onChange={(e) => setName(e.target.value)}
              className="p-3 bg-neutral-800"
            />
          </div>
          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handlFileChange}
              className="hidden"
            />
            {previewImage && (
              <div>
                <img
                  src={previewImage}
                  alt="Profile Image"
                  className="w-12 h-12 rounded-full object-cover"
                  onClick={() => fileInputRef.current?.click()}
                />
              </div>
            )}
            <button
              onClick={handleImageUpload}
              className="bg-[#2d2d2d] text-white p-2 rounded mt-2"
            >
              Upload Image
            </button>
          </div>
          <div className="flex flex-col">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-3 rounded bg-neutral-800 text-white w-full border-none"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="bio" className="text-md  mb-2">
              Bio
            </label>
            <input
              type="text"
              name={bio}
              onChange={(e) => setBio(e.target.value)}
              className="p-3 rounded bg-neutral-800 text-white w-full border-none"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-md  mb-2">
              Email
            </label>
            <input
              type="email"
              name={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 rounded bg-neutral-800 text-white w-full border-none"
            />
          </div>
          <button
            type="submit"
            className="bg-white text-black p-3 rounded text-base cursor-pointer hover:bg-gray-200 transition-colors mt-4"
          >
            Done
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
