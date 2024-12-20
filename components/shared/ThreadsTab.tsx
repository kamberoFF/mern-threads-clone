import { fetchUserPosts } from '@/lib/actions/user.actions';
import React from 'react'
import { redirect } from 'next/navigation';
import ThreadCard from '../cards/ThreadCard';
import { User } from '@clerk/nextjs/server';
import { fetchCommunityPosts } from '@/lib/actions/community.actions';

interface Props{
    currentUserId: string,
    accountId: string,
    accountType: string
}

const ThreadsTab = async ({
    currentUserId,
    accountId,
    accountType
} : Props) => {
    let result: any

    if(accountType === 'Community'){
        result = await fetchCommunityPosts(accountId);
    }
    else{
        result = await fetchUserPosts(accountId);
    }

    if(!result) redirect('/');

  return (
    <section className='mt-9 flex flex-col gap-10'>
        {result.threads.map((thread: any) => (
            <ThreadCard 
                key={thread._id}
                id={thread._id}
                currentUserId={currentUserId}
                parentId={thread.parentId}
                content={thread.text}
                author={
                    accountType === 'User' ?
                    {username: result.username, name: result.name, image: result.image, bio: result.bio,  id: result._id} :
                    {username: thread.author.username, name: thread.author.name, image: thread.author.image, bio: thread.author.bio, id: thread.author._id}
                } 
                community={thread.community} // todo
                createdAt={thread.createdAt}
                comments={thread.children}
                likes={thread.likes}
                isComment
            />
        ))}
    </section>
  )
}

export default ThreadsTab