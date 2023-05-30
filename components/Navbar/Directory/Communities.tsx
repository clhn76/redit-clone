'use client'

import CreateCommunityModal from "@/components/Modal/CreateCommunity/CreateCommunityModal";
import MenuItem from "@/components/ui/Menu/MenuItem";
import useCommunityModal from "@/hooks/useCommunityModal";

import { GrAdd } from "react-icons/gr";

export default function Communities() {
  const {onOpen, onClose} = useCommunityModal()

  return (
    <>
      <MenuItem onClick={() => onOpen()} gray>
        <GrAdd className="text-neutral-600" size={20} />
        <p className="whitespace-nowrap">Create Community</p>
      </MenuItem>
    </>
  );
}
