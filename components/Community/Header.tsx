'use client'

import useCommunityData, { Community } from "@/hooks/useCommunityData";
import Image from "next/image";
import { FaReddit } from "react-icons/fa";
import Button from "../ui/Button";

export default function Header({
  communityData,
}: {
  communityData: Community;
}) {
  const { mySnippets, onJoinOrLeaveCommunity, loading, error } = useCommunityData();
  const isJoined = !!mySnippets.find(
    (communitySnippet) => communitySnippet.communityId === communityData.id
  );

  return (
    <div className="flex flex-col w-full h-[146px]">
      <div className="h-1/2 bg-blue-400"></div>
      <div className="flex items-center justify-center bg-white flex-1">
        <div className="flex items-center w-[95%] max-w-[860px] h-full">
          {communityData.imageUrl ? (
            <Image
              src={communityData.imageUrl}
              alt="Community Image"
              width={64}
              height={64}
              className="relative -top-3 p-1 rounded-full bg-white"
            />
          ) : (
            <FaReddit
              className="relative -top-4 text-blue-400 p-1 rounded-full bg-white"
              size={64}
            />
          )}
          <div className="flex px-4 gap-6">
            <div className="flex flex-col text-neutral-600">
              <h1 className="text-lg font-semibold">{communityData.id}</h1>
              <h2 className="text-sm text-neutral-400">r/{communityData.id}</h2>
            </div>
            <div className="flex items-center">
              <Button
                isLoading={loading}
                onClick={() => onJoinOrLeaveCommunity(communityData, isJoined)}
                solid={!isJoined}
                outline={isJoined}
              >
                {isJoined ? "Joined" : "Join"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
