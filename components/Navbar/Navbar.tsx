"use client";

import Image from "next/image";
import SearchInput from "./SearchInput";
import RightContent from "./RightContent/RightContent";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import Link from "next/link";
import Directory from "./Directory/Directory";

export default function Navbar() {
  const [user, loading, error] = useAuthState(auth);

  return (
    <div className="w-full flex items-center justify-between gap-1 h-11 px-2 py-3 bg-white">
      <Link href="/" className="flex items">
        <Image src="/images/redditFace.svg" width={30} height={30} alt="logo" />
        <Image
          className="hidden md:block"
          src="/images/redditText.svg"
          width={75}
          height={46}
          alt="logo"
        />
      </Link>
      {user && <Directory user={user} />}
      <SearchInput user={user}/>
      <RightContent user={user} />
    </div>
  );
}
