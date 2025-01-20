import React from 'react'

interface PostBtnProps {
  onclick : () => void ;
}

const Postbtn : React.FC<PostBtnProps> = ({onclick}) => {
  return (
    <>
      <button onClick={onclick} className="absolute top-3 right-4 bg-[#171616] border border-gray-600 text-white font-bold px-4 py-2 rounded-lg">Post</button>
    </>
  )
}

export default Postbtn
