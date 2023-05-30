"use client";

import Menu from "@/components/ui/Menu/Menu";
import { User, signOut } from "firebase/auth";
import { FaRedditSquare } from "react-icons/fa";
import { BiChevronDown } from "react-icons/bi";
import { VscAccount } from "react-icons/vsc";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogin } from "react-icons/md";
import { IoSparkles } from "react-icons/io5";
import { auth } from "@/firebase/clientApp";
import useAuthModal from "@/hooks/useAuthModal";
import MenuItem from "@/components/ui/Menu/MenuItem";
import { useCallback } from "react";
import useCommunityData from "@/hooks/useCommunityData";

export default function UserMenu({ user }: { user: User | null | undefined }) {
  const { onOpen } = useAuthModal();
  const {reset: resetCommunitySnippets}  = useCommunityData()

  const logout = useCallback(async () => {
    await signOut(auth)
    resetCommunitySnippets()
  }, [])

  const menuButtonContent = (
    <div
      className="
            flex 
            items-center 
            gap-1
            cursor-pointer 
            px-1.5
            py-0.5
            rounded-lg
            border-[1px]
            border-transparent
            hover:border-neutral-200
            transition
          "
    >
      {user ? (
        <div className="flex items-center gap-1">
          <FaRedditSquare className="text-slate-300" size={32} />
          <div className="hidden xl:flex flex-col items-start text-xs">
            <p className="font-semibold text-neutral-700">
              {user.displayName || user.email?.split("@")[0]}
            </p>
            <div className="flex items-center gap-1">
              <IoSparkles className="text-rose-600" />
              <p className="text-neutral-300">1 karma</p>
            </div>
          </div>
        </div>
      ) : (
        <VscAccount size={25} />
      )}
      <BiChevronDown className="text-neutral-400" size={20} />
    </div>
  );

  return (
    <Menu menuButtonContent={menuButtonContent}>
      {user ? (
        <>
          <MenuItem>
            <CgProfile size={20} />
            Profile
          </MenuItem>
          <hr />
          <MenuItem onClick={() => logout()}>
            <MdOutlineLogin size={20} className="-ml-1" />
            Log Out
          </MenuItem>
        </>
      ) : (
        <>
          <MenuItem onClick={() => onOpen("login")}>
            <MdOutlineLogin size={20} className="-ml-1" />
            Login / Sign Up
          </MenuItem>
        </>
      )}
    </Menu>
  );
}

