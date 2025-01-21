import React, { ReactNode } from "react";
import { CiCircleMore } from "react-icons/ci";

interface ModalProps {
  isopen: boolean;
  onclose: () => void;
  children: ReactNode;
  className?:string | number;
}
const PostModal: React.FC<ModalProps> = ({ isopen, onclose, children }) => {
  if (!isopen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black  bg-opacity-50 flex justify-center items-center">
      <div className="bg-neutral-900 rounded-2xl border border-gray-500 shadow-lg w-full max-w-xl h-72 mx-4">
        <div className="flex justify-between  items-center px-6 py-4">
        

          <button
            onClick={onclose}
            className="text-white"
          >
            Cancel
          </button>
          <h2 className="text-white font-bold flex items-center">Create new post</h2>
          <CiCircleMore size={20}/>

        </div>
        
        <div className="px-6 py-4 border-t border-gray-500">{children}</div>
        <div className="flex items-end justify-end px-6 py-4">
          <button
            onClick={onclose}
            className="px-2 py-2 mt-32 bg-zinc-900 text-gray-700 rounded-md mb-0"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
