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
    parentId: string,
    parentIdImage: string,
    parentIdAuthorId: string,
    parentIdName: string,
    parentIdCreatedAt: string,
    parentIdText: string,
    parentIdLikes?: string[],
    parentIdComments?: string[],
    //Reply data
    replyId: string,
    replyText: string,
    replyAuthorName: string,
    replyAuthorImage: string,
    replyAuthorId: string,
    replyCreatedAt: string,
    replyLikes?: string[],
    replyComments?: string[]
}

const ReplyCard = ({
    currentUserId,
    accountId,
    parentId,
    parentIdImage,
    parentIdAuthorId,
    parentIdName,
    parentIdCreatedAt,
    parentIdText,
    parentIdLikes = [],
    parentIdComments = [],
    replyId,
    replyText,
    replyAuthorName,
    replyAuthorImage,
    replyAuthorId,
    replyCreatedAt,
    replyLikes = [],
    replyComments = []
} : Props) => {
    const parentIsLiked = parentIdLikes.some((like) => like === currentUserId);
    const replyIsLiked = replyLikes.some((like) => like === currentUserId);
    
  return (
    <div className="w-full">
        <Card className="w-full bg-black text-white border-none shadow-none">
            <CardContent className="p-4 space-y-4">
                {/* Main post */}
                <div className="flex space-x-3">
                    <div className="flex flex-col items-center">
                        {/* Avatar */}
                        <Avatar className="w-10 h-10">
                        <AvatarImage src={parentIdImage} alt={parentIdName} />
                        <AvatarFallback></AvatarFallback>
                        </Avatar>
                        <div className="w-0.5 min-h-12 flex-grow bg-neutral-800 my-2" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center space-x-1">
                        {/* Username and date */}
                        <h3 className="font-bold mr-1">{parentIdName}</h3>
                        <span className="text-gray-500 text-sm">{parentIdCreatedAt}</span>
                        </div>
                        {/* Post content */}
                        <p className="text-sm mt-1">{parentIdText}</p>
                        
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
                            threadId={JSON.stringify(parentId)}
                            currentUserId={currentUserId}
                            initialLikeState={parentIsLiked}
                            likes={parentIdLikes}
                        />
                        <RepliesButton
                            threadId={JSON.stringify(parentId)}
                            replies={parentIdComments}
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
                    <Avatar className="w-10 h-10">
                        <AvatarImage src={replyAuthorImage} alt={replyAuthorName} />
                        <AvatarFallback></AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <div className="flex items-center space-x-1">
                        {/* Username and date */}
                        <h4 className="font-bold text-sm mr-1">{replyAuthorName}</h4>
                        <span className="text-gray-500 text-xs">{replyCreatedAt}</span>
                        </div>
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