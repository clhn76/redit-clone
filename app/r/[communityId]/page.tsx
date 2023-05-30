import CreatePostLink from "@/components/Community/CreatePostLink";
import Header from "@/components/Community/Header";
import Posts from "@/components/Posts/Posts";
import PageContent from "@/components/ui/Layout/PageContent";
import { firestore } from "@/firebase/clientApp";
import { Community } from "@/hooks/useCommunityData";
import { doc, getDoc } from "firebase/firestore";
import { notFound } from "next/navigation";
import safeJsonStringify from "safe-json-stringify";

async function getCommunityData(communityId: string) {
  try {
    const communityDocRef = doc(firestore, "communities", communityId);
    const communtiyDoc = await getDoc(communityDocRef);
    return communtiyDoc.exists()
      ? (JSON.parse(safeJsonStringify(communtiyDoc.data())) as Community)
      : null;
  } catch (error) {
    console.log("getCommunityData Error", error);
  }
}

export default async function CommunityPage({
  params,
}: {
  params: {
    communityId: string;
  };
}) {
  const communityData = await getCommunityData(params.communityId);

  if (!communityData) {
    return notFound();
  }

  return (
    <>
      <Header communityData={communityData} />
      <PageContent>
        <>
          <CreatePostLink />
          <Posts communityData={communityData}/>
        </>
        <>RHS</>
      </PageContent>
    </>
  );
}
