import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Heart, MessageCircle, Repeat2, Share2 } from "lucide-react"
import LikeButton from "../replies_interactivity/LikeButton"
import RepliesButton from "../replies_interactivity/RepliesButton"

interface Props{
    //User data
    currentUserId: string,
    accountId: string,
    //Original post data
    threadId: string,
    threadAuthorImage: string,
    threadAuthor_Id: string,
    threadAuthorId: string,
    threadAuthorName: string,
    threadCreatedAt: string,
    threadText: string,
    threadLikes?: string[],
    threadComments?: string[],
    //Reply data
    replyId: string,
    replyText: string,
    replyAuthorName: string,
    replyAuthorImage: string,
    replyAuthor_Id: string,
    replyAuthorId: string,
    replyCreatedAt: string,
    replyLikes?: string[],
    replyComments?: string[]
}

const ReplyCard = ({
    currentUserId,
    accountId,
    threadId,
    threadAuthorImage,
    threadAuthor_Id,
    threadAuthorId,
    threadAuthorName,
    threadCreatedAt,
    threadText,
    threadLikes = [],
    threadComments = [],
    replyId,
    replyText,
    replyAuthorName,
    replyAuthorImage,
    replyAuthor_Id,
    replyAuthorId,
    replyCreatedAt,
    replyLikes = [],
    replyComments = []
} : Props) => {
    const parentIsLiked = threadLikes.some((like) => like === currentUserId);
    const replyIsLiked = replyLikes.some((like) => like === currentUserId);
    
  return (
    <div className="w-full">
        <Card className="w-full bg-black text-white border-none shadow-none">
            <CardContent className="p-4 space-y-4">
                {/* Main post */}
                <div className="flex space-x-3">
                    <div className="flex flex-col items-center">
                        {/* Avatar */}
                        <a href={`/profile/${threadAuthorId}`} className="mt-1">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={threadAuthorImage} alt={threadAuthorName} />
                            <AvatarFallback></AvatarFallback>
                          </Avatar>
                        </a>
                        <div className="w-0.5 min-h-12 flex-grow bg-neutral-800 my-2" />
                    </div>
                    <div className="flex-1">
                        <a className="flex items-center space-x-1" href={`/profile/${threadAuthorId}`}>
                        {/* Username and date */}
                        <h3 className="font-bold mr-1">{threadAuthorName}</h3>
                        <span className="text-gray-500 text-sm">{threadCreatedAt}</span>
                        </a>
                        {/* Post content */}
                        <p className="text-sm mt-1">{threadText}</p>
                        
                        {/* Image */}
                        {/* Not supported for now */}
                        {/* <div className="mt-2 rounded-xl overflow-hidden">
                        <img 
                            src="/placeholder.svg?height=300&width=400" 
                            alt="BMW car rear view" 
                            className="w-full h-auto object-cover"
                        />
                        </div> */}
                        
                        {/* Interaction buttons */}
                        <div className="flex space-x-4 mt-2 text-gray-500">
                        <LikeButton
                            threadId={JSON.stringify(threadId)}
                            currentUserId={currentUserId}
                            initialLikeState={parentIsLiked}
                            likes={threadLikes}
                        />
                        <RepliesButton
                            threadId={JSON.stringify(threadId)}
                            replies={threadComments}
                        />
                        <button className="flex items-center space-x-1">
                            <Repeat2 className="w-5 h-5 hover:text-white" />
                        </button>
                        <button className="flex items-center space-x-1">
                            <Share2 className="w-5 h-5 hover:text-white" />
                        </button>
                        </div>
                    </div>
                    </div>
                    
                    {/* Reply */}
                    <div className="flex space-x-3 mt-4">
                    {/* Avatar */}
                    <a href={`/profile/${replyAuthorId}`} className="mt-1">
                      <Avatar className="w-12 h-12">
                          <AvatarImage src={replyAuthorImage} alt={replyAuthorName}/>
                          <AvatarFallback></AvatarFallback>
                      </Avatar>
                    </a>
                    <div className="flex-1">
                        <a className="flex items-center space-x-1" href={`/profile/${replyAuthorId}`}>
                        {/* Username and date */}
                        <h4 className="font-bold text-sm mr-1">{replyAuthorName}</h4>
                        <span className="text-gray-500 text-xs">{replyCreatedAt}</span>
                        </a>
                        {/* Post content */}
                        <p className="text-sm mt-1">{replyText}</p>
                        {/* Interaction buttons */}
                        <div className="flex space-x-4 mt-2 text-gray-500">
                        <LikeButton
                            threadId={JSON.stringify(replyId)}
                            currentUserId={currentUserId}
                            initialLikeState={replyIsLiked}
                            likes={replyLikes}
                            />
                        <RepliesButton
                            threadId={JSON.stringify(replyId)}
                            replies={replyComments}
                        />
                        <button className="flex items-center space-x-1">
                            <Repeat2 className="w-5 h-5 hover:text-white" />
                        </button>
                        <button className="flex items-center space-x-1">
                            <Share2 className="w-5 h-5 hover:text-white" />
                        </button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
      <div className="w-full h-px bg-neutral-800" role="separator" aria-hidden="true" />
    </div>
  )
}

export default ReplyCard