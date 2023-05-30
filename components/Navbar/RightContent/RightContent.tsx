"use client";

import { User } from "firebase/auth";
import AuthButtons from "./AuthButtons";
import Icons from "./Icons";
import UserMenu from "./UserMenu";

export default function RightContent({
  user,
}: {
  user: User | null | undefined;
}) {
  return (
    <div className="flex items-center justify-center gap-1">
      {user ? <Icons/> : <AuthButtons />}
      <UserMenu user={user}/>
    </div>
  );
}
