"use client";

import { auth, firestore } from "@/firebase/clientApp";
import { Community } from "@/hooks/useCommunityData";
import usePosts, { Post } from "@/hooks/usePosts";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import PostItem from "./PostItem";
import PostLoading from "./PostLoading";

export default function Posts({ communityData }: { communityData: Community }) {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const { posts, setPosts, onDeletePost, onSelectPost, onVote } = usePosts();

  const getPosts = useCallback(async () => {
    setLoading(true);
    try {
      const postQuery = query(
        collection(firestore, "posts"),
        where("communityId", "==", communityData.id),
        orderBy("createdAt", "desc")
      );
      const postDocs = await getDocs(postQuery);
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      setPosts(posts as Post[]);
    } catch (error) {
      console.log("getPosts error:", error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      {loading ? (
        <PostLoading />
      ) : (
        <div className="flex flex-col gap-2 mt-4">
          {posts.map((post) => (
            <PostItem
              key={post.id}
              userIsCreateor={post?.creatorId === user?.uid}
              post={post}
              onDeletePost={onDeletePost}
              onSelectPost={onSelectPost}
              onVote={onVote}
            />
          ))}
        </div>
      )}
    </>
  );
}
