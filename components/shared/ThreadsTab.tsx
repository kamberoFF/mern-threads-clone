import { fetchUserPosts } from '@/lib/actions/user.actions';
import React from 'react'
import { redirect } from 'next/navigation';
import ThreadCard from '../cards/ThreadCard';
import { User } from '@clerk/nextjs/server';

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
    //Todo: Fetch profile threads
    let result = await fetchUserPosts(accountId);

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
                    {name: result.name, image: result.image, id: result._id} :
                    {name: thread.author.name, image: thread.author.image, id: thread.author._id}
                } 
                community={thread.community} // todo
                createdAt={thread.createdAt}
                comments={thread.children}
                isComment
            />
        ))}
    </section>
  )
}

export default ThreadsTab