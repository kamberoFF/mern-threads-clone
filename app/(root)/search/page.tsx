import PostThread from '@/components/forms/PostThread';
import ProfileHeader from '@/components/shared/ProfileHeader';
import { fetchUser, fetchUsers } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'
import { profileTabs } from '@/constants';
import Image from 'next/image';
import ThreadsTab from '@/components/shared/ThreadsTab';
import UserCard from '@/components/cards/UserCard';

const Page = async () => {
    const user = await currentUser();

    if (!user) {
        return null
    }

    const userInfo = await fetchUser(user.id);

    if (!userInfo?.onboarded) {
        redirect('/onboarding');
    }

    // Fetch users
    const result = await fetchUsers({
      userId: user.id,
      searchString: '',
      pageNumber: 1,
      pageSize: 20
    });


  return (
    <section>
        <h1 className="head-text mb-10">Search</h1>

        {/* Search bar */}

        <div className="mt-14 flex flex-col gap-9">
          {result.users.length === 0 ? (
            <p className='no-result'>No Users</p>
          ) : (
            <>
              {result.users.map((user) => (
                <UserCard 
                  key={user.id}
                  id={user.id}
                  name={user.name}
                  username={user.username}
                  imageUrl={user.image}
                  userType={'User'}
                />
              ))}
            </>
          )}
        </div>
    </section>
  )
}

export default Page