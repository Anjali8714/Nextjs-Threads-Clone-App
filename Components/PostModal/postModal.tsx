import React, { ReactNode } from "react";
import Postbtn from "../Postbutton/postbtn";

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
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-neutral-900 rounded-lg shadow-lg max-w-lg mx-4">
        <div className="flex justify-between items-center px-6 py-4">
          <button
            onClick={onclose}
            className="text-white"
          >
            Cancel
          </button>
        </div>
        <div className="px-6 py-4">{children}</div>
        <div className="flex justify-end px-6 py-4 ">
          <button
            onClick={onclose}
            className="px-4 py-2 bg-zinc-900 text-gray-700 rounded-md "
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
