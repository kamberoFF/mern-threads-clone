import React from 'react'

interface Props{
    bio: string
}

const Bio = ({
    bio
} : Props) => {
  return (
    <p className='mt-6 max-w-lg text-base-regular text-light-2'>
        {bio}
    </p>
  )
}

export default Bio