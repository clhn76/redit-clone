'use client'

import NewPostForm from "@/components/Posts/NewPostForm";
import PageContent from "@/components/ui/Layout/PageContent";
import { auth } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";

export default function SubmitPage() {
  const [user] = useAuthState(auth);

  return (
    <PageContent>
      <>
        <h1 className="text-xl py-4 border-b-[1px] border-white">
          Create a post
        </h1>
        {user && <NewPostForm user={user} />}
      </>
      <></>
    </PageContent>
  );
}
