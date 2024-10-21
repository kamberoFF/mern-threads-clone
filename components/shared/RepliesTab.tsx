import { fetchUserPosts } from '@/lib/actions/user.actions';
import React from 'react'
import { redirect } from 'next/navigation';
import ThreadCard from '../cards/ThreadCard';
import { fetchCommunityPosts } from '@/lib/actions/community.actions';
import { fetchUserReplies } from '@/lib/actions/thread.actions';
import ReplyCard from '../cards/ReplyCard';

interface Props{
    currentUserId: string,
    //Use that id to fetch the posts
    accountId: string,
    accountType: string
}

//#region 
//REPLY STRUCTURE
// {
//     "id": "123",
//     "text": "Hello World",
//     "author": {
//         "name": "John Doe",
//         "image": "https://example.com/image.jpg",
//         "id": "456"
//     },
//     "community": {
//         "name": "Community Name",
//         "image": "https://example.com/image.jpg",
//         "id": "789"
//     },
//     "createdAt": "2022-01-01T00:00:00.000Z",
//     "comments": [
//         {
//             "id": "123",
//             "text": "Hello World
//             "author": {
//                 "name": "John Doe",
//                 "image": "https://example.com/image.jpg",
//                 "id": "456"
//             },
//             "community": {
//                 "name": "Community Name",
//                 "image": "https://example.com/image.jpg",
//                 "id": "789"
//             },
//             "createdAt": "2022-01-01T00:00:00.000Z",
//             "comments": []
//         }
//     ],
//     "likes": []
// }
//#endregion

const RepliesTab = async ({
    currentUserId,
    //Use that id to fetch the posts
    accountId,
    accountType
} : Props) => {
    let result: any

    if(accountType === 'Community'){
        result = await fetchCommunityPosts(accountId);
    }
    else{
        result = await fetchUserReplies(accountId);
    }

    if(!result) redirect('/');

  return (
    <>
    {result.map((reply: any) => (
        <ReplyCard
        key={reply._id}
        currentUserId={currentUserId}  // Pass current user's ID
        accountId={accountId}  // ID of the reply author
  
        // Original Post (Parent) Data
        threadId={reply.parentId?._id}  // Parent post ID
        threadAuthorImage={reply.parentId?.author?.image || '/default-avatar.png'}  // Use default image if not available
        threadAuthor_Id={reply.parentId?.author?._id}  // Parent post author's ID
        threadAuthorId={reply.parentId?.author?.id}  // Parent post author's ID
        threadAuthorUsername={reply.parentId?.author?.username}  // Parent post author's username
        threadAuthorName={reply.parentId?.author?.name}  // Parent post author's name
        threadAuthorBio={reply.parentId?.author?.bio}  // Parent post author's bio
        threadCreatedAt={reply.parentId ? new Date(reply.parentId.createdAt).toLocaleDateString() : 'N/A'}  // Parent post date
        threadText={reply.parentId?.text}  // Parent post content
        threadLikes={reply.parentId?.likes}  // Parent post likes
        threadComments={reply.parentId?.children}  // Replies to the original post
  
        // Reply Data
        replyId={reply._id}  // User's reply ID
        replyText={reply.text}  // User's reply content
        replyAuthorUsername={reply.author.username}  // Reply author's username
        replyAuthorName={reply.author.name}  // Reply author's name
        replyAuthorImage={reply.author.image}  // Reply author's avatar
        replyAuthorBio={reply.author.bio}  // Reply author's bio
        replyAuthor_Id={reply.author._id}  // Reply author's ID
        replyAuthorId={reply.author.id}  // Reply author's ID
        replyCreatedAt={new Date(reply.createdAt).toLocaleDateString()}  // Reply date
        replyLikes={reply.likes}  // Reply likes
        replyComments={reply.children}  // Replies to the reply
      />  
    ))}
    </>
  )
}

export default RepliesTab