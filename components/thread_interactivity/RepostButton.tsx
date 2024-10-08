import React from 'react'
import Image from 'next/image';

const RepostButton = () => {
  return (
    <Image 
    src={"/assets/repost.svg"}
    alt="repost"
    width={24}
    height={24}
    className='cursor-pointer object-contain border border-transparent rounded-full hover:bg-gray-800'
    />
  )
}

export default RepostButton