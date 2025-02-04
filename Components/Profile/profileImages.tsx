import React from 'react'

interface profileImageProps {
    ProfilePic? : string;
    AltText? : string;
    className? : string;
}

const ProfileImages:React.FC<profileImageProps> = ({ProfilePic , AltText , className}) => {
  return (
   <img src={ProfilePic || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} alt={AltText} className={className}/>
  )
}

export default ProfileImages
