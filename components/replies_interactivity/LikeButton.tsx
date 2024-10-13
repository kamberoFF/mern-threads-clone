"use client"

import React from 'react'
import { useState } from 'react'
import { Heart } from 'lucide-react'
import { likeThread } from '@/lib/actions/thread.actions'

interface Props{
  threadId: string,
  currentUserId: string,
  initialLikeState: boolean,
  likes: string[]
}

const LikeButton = ({
  threadId,
  currentUserId,
  initialLikeState,
  likes
} : Props) => {
  async function Handler(){
    setIsLiked(!isLiked);
    isLiked ? setLikesCount(likesCount - 1) : setLikesCount(likesCount + 1);

    try{
      await likeThread(JSON.parse(threadId), currentUserId);
    }
    catch(err){
      console.error("Error while liking thread:", err);
      setIsLiked(!isLiked);
      isLiked ? setLikesCount(likesCount - 1) : setLikesCount(likesCount + 1);
    }
  }

  const [isLiked, setIsLiked] = useState(initialLikeState);
  const[likesCount, setLikesCount] = useState(likes.length);

  return (
    <button className="flex items-center space-x-1 hover:text-white" onClick={Handler}>
        <Heart className={isLiked ?
          "w-5 h-5 text-red-500 fill-red-500" :
          "w-5 h-5"} />
        {/* Likes count */}
        {likesCount > 0 && <span className="text-xs">{likesCount}</span>}
    </button>
  )
}

export default LikeButton