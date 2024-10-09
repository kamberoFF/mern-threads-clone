"use client";

import React from 'react';
import Image from 'next/image';
import { useState } from 'react';
import { likeThread } from '@/lib/actions/thread.actions';

interface Props {
  threadId: string;
  userId: string;
  likes: string[];
}

const LikeButton = ({
  threadId,
  userId,
  likes
}: Props) => {
  const [liked, setLiked] = useState(likes?.some((like) => like === userId) || false);
  const [likesCount, setLikesCount] = useState<number>(likes?.length || 0);

  const handleLike = async () => {
    await likeThread(JSON.parse(threadId), userId);
    setLiked(!liked);
    setLikesCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));
  };

  return (
    <>
      <Image 
        src={liked ? "/assets/heart-filled.svg" : "/assets/heart-gray.svg"}
        alt="like"
        width={24}
        height={24}
        className='cursor-pointer object-contain border border-transparent rounded-full hover:bg-gray-800'
        onClick={handleLike}
      />
      {likesCount > 0 && (
        <p className='text-subtle-medium text-gray-1 self-center'>{likesCount}</p>
      )}
    </>
  );
};

export default LikeButton;