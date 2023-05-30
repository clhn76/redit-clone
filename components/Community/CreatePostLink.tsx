"use client";

import { FaReddit } from "react-icons/fa";
import { SlPicture } from "react-icons/sl";
import { BsLink45Deg } from "react-icons/bs";
import Input from "../ui/Input";
import { useCallback } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import useAuthModal from "@/hooks/useAuthModal";
import { useParams, useRouter } from "next/navigation";

export default function CreatePostLink() {
  const params = useParams()
  const router = useRouter()
  const [user] = useAuthState(auth);
  const { onOpen: openAuthModal } = useAuthModal();

  const handleClick = useCallback(() => {
    if (!user) return openAuthModal("login");
    
    const {communityId} = params
    router.push(`/r/${communityId}/submit`)
  }, [user]);

  return (
    <div className="text-slate-400 w-full flex items-center justify-between gap-3 p-2 bg-white rounded-md">
      <FaReddit size={40} />
      <input
        onClick={handleClick}
        placeholder="Create Post"
        className="flex-1 bg-neutral-100 border-[1px] rounded-md border-neutral-200 px-4 py-2"
        type="text"
      />
      <SlPicture size={20} />
      <BsLink45Deg size={20} />
    </div>
  );
}
