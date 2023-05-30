"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal/Modal";
import ModalBody from "@/components/ui/Modal/ModalBody";
import ModalFooter from "@/components/ui/Modal/ModalFooter";
import ModalHeader from "@/components/ui/Modal/ModalHeader";
import { auth, firestore } from "@/firebase/clientApp";
import { Community } from "@/hooks/useCommunityData";
import useCommunityModal from "@/hooks/useCommunityModal";
import {
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useCallback, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function CreateCommunityModal() {
  const { isOpen, onClose } = useCommunityModal();

  const [user] = useAuthState(auth);
  const [communityName, setCommunityName] = useState("");
  const [charsRemaining, setCharsRemaining] = useState(21);
  const [communityType, setCommunityType] = useState<
    "public" | "restricted" | "private"
  >("public");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 21) return;

    setCommunityName(e.target.value);
    setCharsRemaining(21 - e.target.value.length);
  };

  const onCommunityTypeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCommunityType(e.target.name as ("public" | "restricted" | "private"));
    },
    []
  );

  const handleCreateCommunity = useCallback(async () => {
    // Validate the community name
    if (error) setError("");

    if (!user) {
      setError("Invalid approach. Please logout and login again.");
      return;
    }

    const SPECIAL_CHAR_REGEX = /[`!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (SPECIAL_CHAR_REGEX.test(communityName) || communityName.length < 3) {
      setError(
        "Community names must be between 3-21 characters, and can only contain letters, numbers or underscores"
      );
      return;
    }

    setLoading(true);

    try {
      const communityDocRef = doc(firestore, "communities", communityName);

      await runTransaction(firestore, async (transaction) => {
        const communityDoc = await transaction.get(communityDocRef);

        if (communityDoc.exists()) {
          throw new Error(
            `Sorry, r/${communityName} is already taken. Try another one.`
          );
        }

        const communityData: Community = {
          id: communityName,
          creatorId: user.uid,
          createdAt: serverTimestamp(),
          numberOfMembers: 1,
          privacyType: communityType,
        };

        transaction.set(communityDocRef, communityData);

        transaction.set(
          doc(firestore, `users/${user.uid}/communitySnippets`, communityName),
          {
            communityId: communityName,
            isModerator: true,
          }
        );
      });
    } catch (error: any) {
      console.log("handleCreateCommunity Error", error);
      setError(error.message);
    }
    setLoading(false);
  }, [communityName, user]);

  return (
    <Modal isOpen={isOpen} onClose={() => onClose()}>
      <ModalHeader alignLeft>Create a Community</ModalHeader>
      <ModalBody>
        <div className="px-3 flex flex-col py-2 w-full">
          <h2 className="text-lg font-medium">Name</h2>
          <p className="text-sm text-neutral-500 mb-6">
            Community names including capitalization cannot be changed
          </p>
          <div className="relative">
            <p className="absolute top-[6px] left-3 text-lg text-neutral-400">
              r/
            </p>
            <Input
              small
              className="pl-7"
              required
              value={communityName}
              onChange={handleChange}
            />
          </div>
          <p
            className={`text-xs p-1  ${
              charsRemaining === 0 ? "text-rose-500" : "text-neutral-400"
            }`}
          >
            {charsRemaining} characters remaining
          </p>
          {error && <p className="text-sm text-rose-500">{error}</p>}
        </div>

        <div className="px-3 flex flex-col py-2 w-full">
          <h2 className="text-lg font-medium">Community Type</h2>
          <div className="flex flex-col items-start gap-1 py-2">
            <div className="flex items-center gap-2">
              <CheckBox
                label="Public"
                name="public"
                onChange={onCommunityTypeChange}
                checked={communityType === "public"}
              />
              <p className="text-sm text-neutral-400">
                Anyone can view, post, and comment to this community
              </p>
            </div>
            <div className="flex items-center gap-2">
              <CheckBox
                label="Restricted"
                name="restricted"
                onChange={onCommunityTypeChange}
                checked={communityType === "restricted"}
              />
              <p className="text-sm text-neutral-400">
                Anyone can view this community, but only approved users can post
              </p>
            </div>
            <div className="flex items-center gap-2">
              <CheckBox
                label="Private"
                name="private"
                onChange={onCommunityTypeChange}
                checked={communityType === "private"}
              />
              <p className="text-sm text-neutral-400">
                Only approved users can view and submit to this community
              </p>
            </div>
          </div>
        </div>
      </ModalBody>

      <ModalFooter>
        <Button disabled={loading} large onClick={() => onClose()} outline>
          Close
        </Button>
        <Button isLoading={loading} large onClick={handleCreateCommunity} solid>
          Create Community
        </Button>
      </ModalFooter>
    </Modal>
  );
}

const CheckBox = ({
  label,
  checked,
  onChange,
  name,
}: {
  label: string;
  checked?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}) => {
  return (
    <div className="flex items-center gap-2">
      <input
        name={name}
        onChange={onChange}
        checked={checked}
        className="w-4 h-4 cursor-pointer"
        id={name}
        type="checkbox"
      />
      <label className="cursor-pointer text-neutral-600 text-lg" htmlFor={name}>
        {label}
      </label>
    </div>
  );
};
