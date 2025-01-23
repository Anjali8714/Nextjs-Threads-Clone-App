import React from 'react'

interface RelyProps{
    isopen :boolean;
    onclose :() => void;
    username :string;
    postId :string;
    userId :string;
    profilepic : string;
}

const Reply :React.FC<RelyProps> = ({isopen ,onclose,username,userId,postId,profilepic}) => {
  return (
    <div>
      
    </div>
  )
}

export default Reply
