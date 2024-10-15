"use client"

import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import FollwingInfo from './FollowingInfo'
import Bio from './Bio'

interface Props {
    urlUserId: string,
    authUserId: string,
    followersCount?: number,
    followingCount?: number,
    bio: string
}

const ProfileBottomPart = ({
    urlUserId,
    authUserId,
    followersCount = 0,
    followingCount = 0,
    bio
}: Props) => {
    const isOwner = urlUserId === authUserId
    const [isFollowing, setIsFollowing] = useState(false)
    const [followersCountState, setFollowersCount] = useState(followersCount)

    const handleFollow = () => {
        setIsFollowing(!isFollowing)
        {isFollowing ? setFollowersCount(followersCountState - 1) : setFollowersCount(followersCountState + 1)}
    }

    return (
        <div className='flex flex-col w-full mt-6'>
            {/* First Row for Following Info */}
            <div className='flex items-center justify-between'>
                <FollwingInfo
                  followersCount={followersCountState}
                  followingCount={followingCount}
                />
            </div>

            {/* Second Row for Bio and Follow/Edit Profile button */}
            <div className="flex flex-row">
                <Bio bio={bio} />

                {!isOwner ? (
                    <Button onClick={handleFollow} className={`text-light-2 w-32 self-end ml-auto
                        ${!isFollowing ? 'bg-primary-500 hover:bg-primary-600' :
                        'bg-dark-2 border-neutral-800 hover:bg-dark-3 hover:text-light-2'
                        }`}
                        variant={isFollowing ? "outline" : null}>
                        {isFollowing ? 'Unfollow' : 'Follow'}
                    </Button>
                ) : (
                    <Button className='text-light-2 w-32 self-end ml-auto bg-primary-500 hover:bg-primary-600'>
                        Edit Profile
                    </Button>
                )}
            </div>
        </div>
    )
}

export default ProfileBottomPart