import type { Post } from "@/hooks/usePosts";
import moment from "moment";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsChat } from "react-icons/bs";
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoBookmarkOutline,
} from "react-icons/io5";

export default function PostItem({
  post,
  userIsCreateor,
  userVoteValue,
  onVote,
  onDeletePost,
  onSelectPost,
}: {
  post: Post;
  userIsCreateor: boolean;
  userVoteValue?: number;
  onVote: () => {};
  onDeletePost: (post: Post) => Promise<boolean>;
  onSelectPost: () => {};
}) {
  const [loadingImage, setLoadingImage] = useState(true);
  const [error, setError] = useState('')

  const handleDelete = async () => {
    try {
      const success = await onDeletePost(post)

      if (!success) {
        throw new Error('Failed to delete post')
      }
    } catch (error: any) {
      console.log('handleDelete Error:', error);
      setError(error.message)
    }
  }

  return (
    <div
      className="
        flex
        border-[1px] 
        bg-white 
        border-neutral-300
        rounded-md
        hover:border-neutral-500
        cursor-pointer
        transition
      "
      onClick={onSelectPost}
    >
      <div className="flex flex-col items-center p-2 w-10 rounded-md bg-slate-200 text-neutral-400">
        <div
          className="flex place-items-center cursor-pointer"
          onClick={onVote}
        >
          {userVoteValue === 1 ? (
            <IoArrowUpCircleSharp className="text-brand-100" size={30} />
          ) : (
            <IoArrowUpCircleOutline size={30} />
          )}
        </div>
        <p className="text-neutral-600">{post.voteStatus}</p>
        <div
          className="flex place-items-center cursor-pointer"
          onClick={onVote}
        >
          {userVoteValue === -1 ? (
            <IoArrowDownCircleSharp className="text-brand-100" size={30} />
          ) : (
            <IoArrowDownCircleOutline size={30} />
          )}
        </div>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex flex-col gap-1 p-3">
          <div className="flex items-center gap-0.5 text-xs">
            {/* Home Page Check */}
            <p>
              Posted By u/{post.creatorDisplayName}{" "}
              {moment(new Date(post.createdAt.seconds * 1000)).fromNow()}
            </p>
          </div>
          {/* Post Title */}
          <h1 className="font-medium">{post.title}</h1>
          <p className="text-sm">{post.body}</p>
          {post.imageUrl && (
            <div className="flex items-center justify-center p-2">
              {loadingImage && (
                <div
                  role="status"
                  className="flex items-center justify-center h-[250px] w-full bg-gray-300 rounded-md animate-pulse dark:bg-gray-300"
                ></div>
              )}
              <img
                onLoad={() => setLoadingImage(false)}
                className={`max-h-[500px] ${loadingImage && 'hidden'}`}
                src={post.imageUrl}
                alt="Post Image"
              />
            </div>
          )}
        </div>
        <div className="flex items-center text-neutral-500 p-3 gap-4">
          <div className="p-2 flex items-center rounded-md hover:bg-neutral-100 transition cursor-pointer gap-2">
            <BsChat />
            <p>{post.numberOfComments}</p>
          </div>
          <div className="p-2 flex items-center rounded-md hover:bg-neutral-100 transition cursor-pointer gap-2">
            <IoArrowRedoOutline />
            <p>Share</p>
          </div>
          <div className="p-2 flex items-center rounded-md hover:bg-neutral-100 transition cursor-pointer gap-2">
            <IoBookmarkOutline />
            <p>Save</p>
          </div>
          {userIsCreateor && (
            <div
              onClick={handleDelete}
              className="p-2 flex items-center rounded-md hover:bg-neutral-100 transition cursor-pointer gap-2"
            >
              <AiOutlineDelete />
              <p>Delete</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
