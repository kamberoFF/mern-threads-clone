import { fetchPosts } from '@/lib/actions/thread.actions';
import { currentUser } from '@clerk/nextjs/server';
import { ClerkProvider, UserButton } from '@clerk/nextjs'
import React from 'react'
import ThreadCard from '@/components/cards/ThreadCard';

const Home = async () => {
  const user = await currentUser();
  const result = await fetchPosts(1, 30);

  return (
    <>
      <h1 className='head-text text-left'>Home</h1>

      <section className='mt-9 flex flex-col gap-10'>
        {result?.posts.length === 0 ? 
          (<p className='no-result'>No threads found</p>) :
          (
            <>
              {result?.posts.map((thread) => (
                <ThreadCard
                key={thread._id}
                id={thread._id}
                currentUserId={user?.id || ""}
                parentId={thread.parentId}
                content={thread.text}
                author={thread.author}
                community={thread.community}
                createdAt={thread.createdAt}
                comments={thread.children}
                likes={thread.likes} />
              ))}
            </>
          )}
      </section>
    </>
  )
}

export default Home