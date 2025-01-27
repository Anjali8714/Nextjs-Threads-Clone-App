import axiosInstance from "@/APIs/axiosInstance";
import { useAppDispatch } from "@/Hook/useAppDispatch";
import { fetchPosts } from "@/Store/Slices/postSlice";
import React, { useEffect, useState } from "react";

interface ReplyProps {
  isopen: boolean;
  onclose: () => void;
  userId: string;
  username: string;
  postId: string;
  userProfilePic: string;
}

const Reply: React.FC<ReplyProps> = ({
  isopen,
  onclose,
  postId,
  userId,
  userProfilePic,
  username,
}) => {
  const [post, setPost] = useState<any>(null);
  const [image, setImage] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [comment, setComment] = useState<string>("");
  const [Loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isopen) {
      const fetchPost = async () => {
        try {
          const response = await axiosInstance.get(`/posts/post/${postId}`);
          setPost(response.data.post);
        } catch (error) {
          console.error("Failed to fetch post:", error);
        }
      };
      fetchPost();
    }
  }, [isopen, postId]);

  const handleReplySubmit = async () => {
    if (!comment.trim()) {
      return;
    }
    const reply = {
      text: comment,
      userId: userId,
      username: username,
      userProfilePic: userProfilePic,
    };

    try {
      setLoading(true);
      await axiosInstance.post(`/posts/${postId}/reply`, reply);
      setComment("");
      onclose();
      dispatch(fetchPosts());
      setError(null);
    } catch (error) {
      console.error("Failed to reply to post", error);
      setError("Failed to post your reply.");
    } finally {
      setLoading(false);
    }
  };

  if (!isopen) {
    return null;
  }
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-neutral-900 rounded-lg shadow-lg w-[600px] h-[600px] flex flex-col animate-fadeIn">
        <div>
          <button
            className="text-white text-l p-3 w-8 h-8 transition-colors"
            onClick={onclose}
          >
            Cancel
          </button>
        </div>

        <div className="flex-1 no-scroller overflow-y-auto px-3">
          {post && (
            <div className="mb-4">
              <div className="flex items-start mb-2">
                <div className="w-full">
                  <p className="text-white font-bold text-sm">
                    {post.postById.username}
                  </p>
                  <p className="text-white text-sm">{post.text}</p>
                </div>
              </div>

              {post.image && (
                <div className="relative w-full mb-3">
                  <img
                    src={post.image}
                    alt="Post"
                    className={`w-full h-full object-cover rounded-lg transition-opacity duration-300 ${image}`}
                  />
                </div>
              )}
              <div className="border-b border-[#2d2d2d] mb-2"></div>
            </div>
          )}

          <div className="mb-3"></div>
          <div className="space-y-2">
            {post?.replies?.length > 0 ? (
              [...post.replies].reverse().map((reply: any, index: number) => (
                <div key={index} className="flex items-start mb-2">
                  <div className="bg-[#181818] p-2.5 rounded-lg text-white w-full">
                    <p className="font-bold text-sm mb-0.5">{reply.username}</p>
                    <p className="break-words text-sm">{reply.text}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-white text-center text-sm">
                No replies yet...
              </p>
            )}
          </div>
        </div>

        <div className="p-2">
          {error && <p className="text-red-500 text-xs mb-2">{error}</p>}

          <div className="mb-2 flex justify-center">
            <input
              placeholder="Add your comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-[330px] p-2 border border-[#2d2d2d] bg-[#181818] rounded-lg text-sm"
            />
          </div>

          <div className="flex justify-end">
            <button
              className="bg-[#2d2d2d] text-white px-3 py-1.5 rounded-2xl mt-2 ml-5 mr-2 text-sm h-10 w-16"
              onClick={handleReplySubmit}
              disabled={Loading}
            >
              {Loading ? "Posting" : "Post"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reply;
