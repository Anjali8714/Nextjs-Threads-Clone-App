import { useAppDispatch } from "@/Hook/useAppDispatch";
import React, { ReactNode, useState } from "react";
import { CiCircleMore } from "react-icons/ci";

interface ModalProps {
  isopen: boolean;
  onclose: () => void;
  children: ReactNode;
}
const PostModal: React.FC<ModalProps> = ({ isopen, onclose, children }) => {
  const [postContent, setPostContent] = useState<string>("");
  const [postImage, setPostImage] = useState<any>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const handleNewPost = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(e.target.value);
  };

  const handleImage =(e:React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if(file){
      setPostImage(file);
      const reader = new FileReader();
      reader.onloadend=()=>{
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  if (!isopen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black  bg-opacity-50 flex justify-center items-center">
      <div className="bg-neutral-900 rounded-2xl border border-gray-500 shadow-lg w-full max-w-xl h-72 mx-4">
        <div className="flex justify-between  items-center px-6 py-4">
          <button onClick={onclose} className="text-white">
            Cancel
          </button>
          <CiCircleMore size={20} />
        </div>
        <div className="px-6 py-4 border-t border-gray-500">
          {children}

          <div className="flex flex-col gap-4 mt-8">
            <textarea
              placeholder="What's new?"
              value={postContent}
              onChange={handleNewPost}
              className="bg-[#181818]"
            ></textarea>

            {preview && (
              <div className="rounded-md">
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-auto object-cover rounded-md"
                />
              </div>
            )}
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>
        </div>
        <div className="flex items-end justify-end px-6 py-4">
          <button
            onClick={onclose}
            className="px-2 py-2 bg-zinc-900 text-gray-700 rounded-md"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
