import React from 'react'

interface Props{
    followersCount?: number,
    followingCount?: number
}

const FollowingInfo = ({
    followersCount = 0,
    followingCount = 0
}) => {
  return (
    <div className='flex gap-4'>
        <p className='text-base-medium text-light-2'>
        <span className='text-light-2 font-bold'>{followersCount}</span> Followers
        </p>
        <p className='text-base-medium text-light-2'>
        <span className='text-light-2 font-bold'>{followingCount}</span> Following
        </p>
      </div>
  )
}

export default FollowingInfo