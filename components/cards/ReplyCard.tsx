import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, MessageCircle, Repeat2, Share2 } from "lucide-react"
import LikeButton from "../replies_interactivity/LikeButton"
import RepliesButton from "../replies_interactivity/RepliesButton"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import Link from "next/link"

interface Props {
  currentUserId: string
  accountId: string
  threadId: string
  threadAuthorImage: string
  threadAuthor_Id: string
  threadAuthorId: string
  threadAuthorUsername: string
  threadAuthorName: string
  threadAuthorBio: string
  threadCreatedAt: string
  threadText: string
  threadLikes?: string[]
  threadComments?: string[]
  replyId: string
  replyText: string
  replyAuthorUsername: string
  replyAuthorName: string
  replyAuthorImage: string
  replyAuthorBio: string
  replyAuthor_Id: string
  replyAuthorId: string
  replyCreatedAt: string
  replyLikes?: string[]
  replyComments?: string[]
}

const ReplyCard = ({
  currentUserId,
  accountId,
  threadId,
  threadAuthorImage,
  threadAuthor_Id,
  threadAuthorId,
  threadAuthorUsername,
  threadAuthorName,
  threadAuthorBio,
  threadCreatedAt,
  threadText,
  threadLikes = [],
  threadComments = [],
  replyId,
  replyText,
  replyAuthorUsername,
  replyAuthorName,
  replyAuthorImage,
  replyAuthorBio,
  replyAuthor_Id,
  replyAuthorId,
  replyCreatedAt,
  replyLikes = [],
  replyComments = []
}: Props) => {
  const parentIsLiked = threadLikes.some((like) => like === currentUserId)
  const replyIsLiked = replyLikes.some((like) => like === currentUserId)

  const UserHoverCard = ({ image, username, bio, userId }: { image: string; username: string; bio: string; userId: string }) => (
    <HoverCardContent 
      className="min-w-[12rem] max-w-[16rem] w-max bg-zinc-900 border-zinc-800 text-zinc-100" 
      side="bottom" 
      align="start"
    >
      <div className="flex space-x-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={image} />
          <AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="space-y-0.5 flex-shrink">
          <h4 className="text-sm font-semibold leading-none truncate">@{username}</h4>
          <p className="text-xs text-zinc-400 mt-1 leading-tight line-clamp-2">
            {bio}
          </p>
        </div>
      </div>
    </HoverCardContent>
  )

  return (
    <div className="w-full">
      <Card className="w-full bg-black text-white border-none shadow-none">
        <CardContent className="p-4 space-y-4">
          {/* Main post */}
          <div className="flex space-x-3">
            <div className="flex flex-col items-center">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Link href={`/profile/${threadAuthorId}`} className="mt-1">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={threadAuthorImage} alt={threadAuthorName} />
                      <AvatarFallback>{threadAuthorName.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Link>
                </HoverCardTrigger>
                <UserHoverCard image={threadAuthorImage} username={threadAuthorUsername} bio={threadAuthorBio} userId={threadAuthorId} />
              </HoverCard>
              <div className="w-0.5 min-h-12 flex-grow bg-neutral-800 my-2" />
            </div>
            <div className="flex-1">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Link href={`/profile/${threadAuthorId}`} className="inline-flex items-center space-x-1">
                    <span className="font-bold mr-1">{threadAuthorName}</span>
                    <span className="text-gray-500 text-sm">{threadCreatedAt}</span>
                  </Link>
                </HoverCardTrigger>
                <UserHoverCard image={threadAuthorImage} username={threadAuthorUsername} bio={threadAuthorBio} userId={threadAuthorId} />
              </HoverCard>
              <p className="text-sm mt-1">{threadText}</p>
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
            <HoverCard>
              <HoverCardTrigger asChild>
                <Link href={`/profile/${replyAuthorId}`} className="mt-1">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={replyAuthorImage} alt={replyAuthorName}/>
                    <AvatarFallback>{replyAuthorName.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Link>
              </HoverCardTrigger>
              <UserHoverCard image={replyAuthorImage} username={replyAuthorUsername} bio={replyAuthorBio} userId={replyAuthorId} />
            </HoverCard>
            <div className="flex-1">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Link href={`/profile/${replyAuthorId}`} className="inline-flex items-center space-x-1">
                    <span className="font-bold text-sm mr-1">{replyAuthorName}</span>
                    <span className="text-gray-500 text-xs">{replyCreatedAt}</span>
                  </Link>
                </HoverCardTrigger>
                <UserHoverCard image={replyAuthorImage} username={replyAuthorUsername} bio={replyAuthorBio} userId={replyAuthorId} />
              </HoverCard>
              <p className="text-sm mt-1">{replyText}</p>
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