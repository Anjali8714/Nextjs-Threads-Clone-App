'use client'

import Image from 'next/image';
import React from 'react'


interface plusbtnprops {
    onclick : () => void;
}

const Plusbtn : React.FC<plusbtnprops> = ( {onclick} ) => {
  return (
    <>
      <button>
        <Image 
            src='/Images/plus.svg'
            alt='New thread'
            height={25}
            width={25}
            onClick={onclick}
            className="m-2 mt-10"
        />
      </button>
    </>
  )
}

export default Plusbtn
