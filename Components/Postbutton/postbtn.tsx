import React from 'react'

interface PostBtnProps {
  onclick : () => void ;
}

const Postbtn : React.FC<PostBtnProps> = ({onclick}) => {
  return (
    <>
      <button onClick={onclick} className="h-9 mr-3 w-16 ml-80  bg-[#181818] text-white border border-[#2d2d2d] rounded-lg">Post</button>
    </>
  )
}

export default Postbtn
