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
import SearchAndDisplay from '@/components/search_components/SearchAndDisplay';

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

        <SearchAndDisplay response={result}/>
    </section>
  )
}

export default Page