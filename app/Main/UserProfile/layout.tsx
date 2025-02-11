import Profile from '@/Components/Profile/profile'
import React from 'react'

const Layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div>
      <Profile/>
      {children}
    </div>
  )
}

export default Layout
