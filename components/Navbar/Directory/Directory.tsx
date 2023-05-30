"use client";

import Menu from "@/components/ui/Menu/Menu";
import MenuItem from "@/components/ui/Menu/MenuItem";
import useAuthModal from "@/hooks/useAuthModal";
import { User } from "firebase/auth";
import { BiChevronDown } from "react-icons/bi";
import { TiHome } from "react-icons/ti";
import Communities from "./Communities";

export default function Directory({ user }: { user: User | null | undefined }) {
  const { onOpen } = useAuthModal();

  const menuButtonContent = (
    <div
      className="
            flex 
            items-center 
            justify-between
            gap-1
            cursor-pointer 
            px-1.5
            py-0.5
            rounded-lg
            border-[1px]
            border-neutral-100
            hover:border-neutral-300
            transition
            lg:w-[200px]
          "
    >
      <div className="flex items-center gap-1">
        <TiHome size={25} />
        <p className="hidden lg:block md:mr-2 text-sm">Home</p>
      </div>
      <BiChevronDown className="text-neutral-400" size={20} />
    </div>
  );

  return (
    <Menu fromLeft menuButtonContent={menuButtonContent}>
      <Communities />
    </Menu>
  );
}
