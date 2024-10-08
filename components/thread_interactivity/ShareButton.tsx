import React from 'react'
import Image from 'next/image';

const ShareButton = () => {
  return (
    <Image 
    src={"/assets/share.svg"}
    alt="share"
    width={24}
    height={24}
    className='cursor-pointer object-contain border border-transparent rounded-full hover:bg-gray-800'
    />
  )
}

export default ShareButton