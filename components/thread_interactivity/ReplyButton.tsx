import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

interface Props {
    threadId: string
}

const ReplyButton = ({
    threadId
} : Props) => {
  return (
    <Link href={`/thread/${threadId}`}>
        <Image 
        src={"/assets/reply.svg"}
        alt="reply"
        width={24}
        height={24}
        className='cursor-pointer object-contain border border-transparent rounded-full hover:bg-gray-800'
        />
    </Link>
  )
}

export default ReplyButton