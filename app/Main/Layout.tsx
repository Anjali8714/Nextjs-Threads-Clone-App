import Sidebar from '@/Components/Sidebar/sidebar'
import React from 'react'

const Layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div>
      <div>
        <Sidebar/>
      </div>
      
      <div>
        {children}
      </div>

    </div>
  )
}

export default Layout