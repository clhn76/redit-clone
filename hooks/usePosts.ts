import { Timestamp } from "@google-cloud/firestore";
import { useCallback } from "react";
import { create } from "zustand";

export interface Post {
  id?: string;
  communityId: string;
  creatorId: string;
  creatorDisplayName: string;
  title: string;
  body?: string;
  numberOfComments: number;
  voteStatus: number;
  imageUrl?: string;
  createdAt: Timestamp;
  communityImageUrl?: string;
}

interface PostState {
  selectedPost: Post | null;
  posts: Post[];
  setPosts: (newPost: Post[]) => void;
  // postVotes
}

const usePostState = create<PostState>((set) => ({
  posts: [],
  selectedPost: null,
  setPosts: (newPosts: Post[]) =>
    set({
      posts: newPosts,
    }),
}));

export default function usePosts() {
  const { posts, setPosts } = usePostState();

  const onVote = useCallback(async () => {}, []);

  const onSelectPost = useCallback(async () => {}, []);
  
  const onDeletePost = useCallback(async (post: Post) => {
    
  }, []);

  return {
    posts,
    setPosts,
    onVote,
    onSelectPost,
    onDeletePost,
  };
}
