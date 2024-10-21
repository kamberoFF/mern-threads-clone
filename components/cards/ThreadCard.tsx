import { formatDateString } from '@/lib/utils';
import { Organization } from '@clerk/nextjs/server';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import LikeButton from '../thread_interactivity/LikeButton';
import ReplyButton from '../thread_interactivity/ReplyButton';
import { threadId } from 'worker_threads';
import RepostButton from '../thread_interactivity/RepostButton';
import ShareButton from '../thread_interactivity/ShareButton';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/ui/hover-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Props {
  id: string,
  currentUserId: string,
  parentId: string | null,
  content: string,
  author: {username: string, name: string, image: string, bio: string, id: string},
  community: {name: string, image: string, id: string} | null,
  createdAt: string,
  comments: {
    author: {image: string},
  }[],
  likes: [string],
  isComment?: boolean;
}

const ThreadCard = ({
    id,
    currentUserId,
    parentId,
    content,
    author,
    community,
    createdAt,
    comments,
    likes,
    isComment
} : Props) => {
  return (
    <article className={`flex w-full flex-col rounded-xl ${
      isComment ? 'px-10 xs:px-7 ' : 'bg-dark-2 p-7'}`}>
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className='flex flex-col items-center'>
            <HoverCard>
              <HoverCardTrigger asChild>
                <Link href={`/profile/${author.id}`} className="relative h-11 w-11 rounded-full">
                  <Image
                    src={author.image}
                    alt="Profile image"
                    fill
                    className="cursor-pointer rounded-full"
                  />
                </Link>
              </HoverCardTrigger>
              <HoverCardContent 
                className="min-w-[12rem] max-w-[16rem] w-max bg-zinc-900 border-zinc-800 text-zinc-100" 
                side="bottom" 
                align="start"
              >
                <div className="flex space-x-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={author.image} />
                    <AvatarFallback>E36</AvatarFallback>
                  </Avatar>
                  <div className="space-y-0.5 flex-shrink">
                    <h4 className="text-sm font-semibold leading-none truncate">@{author.username}</h4>
                    <p className="text-xs text-zinc-400 mt-1 leading-tight line-clamp-2">
                      {author.bio}
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
            <div className='thread-card_bar' />
          </div>
          <div className='flex w-full flex-col'>
          <HoverCard>
              <HoverCardTrigger asChild>
                <Link href={`/profile/${author.id}`} className='w-fit'>
                  <h4 className='cursor-pointer text-base-semibold text-light-1'>{author.name}</h4>
                </Link>
              </HoverCardTrigger>
              <HoverCardContent 
                className="min-w-[12rem] max-w-[16rem] w-max bg-zinc-900 border-zinc-800 text-zinc-100" 
                side="bottom" 
                align="start"
              >
                <div className="flex space-x-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={author.image} />
                    <AvatarFallback>E36</AvatarFallback>
                  </Avatar>
                  <div className="space-y-0.5 flex-shrink">
                    <h4 className="text-sm font-semibold leading-none truncate">@{author.username}</h4>
                    <p className="text-xs text-zinc-400 mt-1 leading-tight line-clamp-2">
                      {author.bio}
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>

            <p className="mt-2 text-small-regular text-light-2">{content}</p>

            <div className={`${isComment && 'mb-10'} mt-5 flex flex-col gap-3`}>
              <div className='flex gap-3.5'>
                <LikeButton
                threadId={JSON.stringify(id)}
                userId={currentUserId}
                likes={likes} 
                />
                <ReplyButton threadId={id}/>
                {comments && comments.length > 0 && (
                  <p className='text-subtle-medium text-gray-1 self-center'>{comments.length}</p>
                )}
                <RepostButton />
                <ShareButton />
              </div>
            </div>
          </div>
        </div>

        {/* TODO: Delete thread */}

      </div>
        {!isComment && community && (
          <Link href={`/communities/${community.id}`} className='mt-5 flex items-center'>
            <p className="text-subtle-medium text-gray-1">
              {formatDateString(createdAt)}
              {' '}- {community.name} Community
            </p>

            <Image 
            src={community.image}
            alt={community.name}
            width={14}
            height={14}
            className='ml-1 rounded-full object-cover'
            />
          </Link>
        )}
    </article>
  )
}

export default ThreadCard