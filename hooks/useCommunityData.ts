import {
  FieldValue,
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  writeBatch,
} from "firebase/firestore";
import { create } from "zustand";
import useAuthModal from "./useAuthModal";
import { auth, firestore } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCallback, useEffect, useState } from "react";

export interface Community {
  id: string;
  creatorId: string;
  numberOfMembers: number;
  privacyType: "public" | "restricted" | "private";
  createdAt?: FieldValue;
  imageUrl?: string;
}

interface CommunitySnippet {
  communityId: string;
  isModerator?: boolean;
  imageUrl?: string;
}

interface CommunityState {
  mySnippets: CommunitySnippet[];
  joinCommunity: (newSnippet: CommunitySnippet) => void;
  leaveCommunity: (communityId: string) => void;
  setSnippets: (snippets: CommunitySnippet[]) => void;
}

const useCommunityState = create<CommunityState>((set) => ({
  mySnippets: [],
  joinCommunity: (newSnippet: CommunitySnippet) => {
    set((state) => ({
      mySnippets: [...state.mySnippets, newSnippet],
    }));
  },
  leaveCommunity: (communityId: string) => {
    set((state) => ({
      mySnippets: state.mySnippets.filter(
        (snippet) => snippet.communityId !== communityId
      ),
    }));
  },
  setSnippets: (snippets: CommunitySnippet[]) => set({ mySnippets: snippets }),
}));

export default function useCommunityData() {
  const { mySnippets, joinCommunity, leaveCommunity, setSnippets } =
    useCommunityState();
  const [user] = useAuthState(auth);
  const { onOpen: openAuthModal } = useAuthModal();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onJoinOrLeaveCommunity = useCallback(
    (communityData: Community, isJoined: boolean) => {
      if (!user) {
        openAuthModal("login");
        return;
      }

      if (isJoined) {
        onLeave(communityData);
      } else {
        onJoin(communityData);
      }
    },
    [user]
  );

  const onJoin = useCallback(
    async (CommunityData: Community) => {
      setLoading(true);
      try {
        const batch = writeBatch(firestore);

        const newSnippet: CommunitySnippet = {
          communityId: CommunityData.id,
          imageUrl: CommunityData.imageUrl || "",
        };

        batch.set(
          doc(
            firestore,
            `users/${user?.uid}/communitySnippets`,
            CommunityData.id
          ),
          newSnippet
        );
        batch.update(doc(firestore, "communities", CommunityData.id), {
          numberOfMembers: increment(1),
        });

        await batch.commit();
        // update global state
        joinCommunity(newSnippet);
      } catch (error: any) {
        console.log("onJoin error", error);
        setError(error.message);
      }
      setLoading(false);
    },
    [user]
  );

  const onLeave = useCallback(async (communityData: Community) => {
    setLoading(true);
    try {
      const batch = writeBatch(firestore);

      batch.delete(
        doc(firestore, `users/${user?.uid}/communitySnippets`, communityData.id)
      );
      batch.update(doc(firestore, "communities", communityData.id), {
        numberOfMembers: increment(-1),
      });

      await batch.commit();
      leaveCommunity(communityData.id);
    } catch (error: any) {
      console.log("onLeave Error", error);
      setError(error.message);
    }
    setLoading(false);
  }, []);

  const getSinppets = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const snippetDocs = await getDocs(
        collection(firestore, `users/${user.uid}/communitySnippets`)
      );
      const snippets = snippetDocs.docs.map((snippetDoc) =>
        snippetDoc.data()
      ) as CommunitySnippet[];
      setSnippets(snippets);
    } catch (error) {
      console.log("getSinppets error", error);
    }
    setLoading(false);
  }, [user]);

  const reset = useCallback(() => {
    setSnippets([]);
  }, []);

  useEffect(() => {
    getSinppets();
  }, [user]);

  return { onJoinOrLeaveCommunity, mySnippets, loading, error, reset };
}
