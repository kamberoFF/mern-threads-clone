"use client"

import React from 'react'
import Image from 'next/image';
import { useState } from 'react';

interface Props {
  likes: {like: {id: string}}[]
}

const LikeButton = () => {
  //Update to actually get the liked status from the db
  const [liked, setLiked] = useState(false)

  return (
    <Image 
    src={liked ? "/assets/heart-filled.svg" : "/assets/heart-gray.svg"}
    alt="like"
    width={24}
    height={24}
    className='cursor-pointer object-contain border border-transparent rounded-full hover:bg-gray-800'
    onClick={() => setLiked(!liked)}
    />
  )
}

export default LikeButton