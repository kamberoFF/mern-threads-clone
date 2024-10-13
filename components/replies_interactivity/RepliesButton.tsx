import React from 'react'
import { MessageCircle } from 'lucide-react'

interface Props{
    threadId: string,
    replies: string[]
}

const RepliesButton = ({
    threadId,
    replies
} : Props) => {
  return (
    //Aplikaciqta e prekaleno tejka za da raboti s button, zatova e promeneno s anchor tag 💀💀💀
    <a className="flex items-center space-x-1 hover:text-white cursor-pointer" href={`/thread/${JSON.parse(threadId)}`}>
        <MessageCircle className="w-5 h-5" />
        {/* Comments count */}
        {replies.length > 0 && <span className="text-xs">{replies.length}</span>}
    </a>
    // <button className="flex items-center space-x-1 hover:text-white" onClick={() => router.push(`thread/${JSON.parse(threadId)}`)}>
    //     <MessageCircle className="w-5 h-5" />
    //     {/* Comments count */}
    //     {replies.length > 0 && <span className="text-xs">{replies.length}</span>}
    // </button>
    )
}

export default RepliesButton