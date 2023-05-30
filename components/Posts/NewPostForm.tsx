"use client";

import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import { AiFillCloseCircle } from "react-icons/ai";
import TabItem from "./TabItem";
import type { IconType } from "react-icons";
import { ChangeEvent, useCallback, useState } from "react";
import TextInputs from "./PostForm/TextInputs";
import ImageUpload from "./PostForm/ImageUpload";
import type { User } from "firebase/auth";
import { Post } from "@/hooks/usePosts";
import { useParams, useRouter } from "next/navigation";
import { Timestamp } from "@google-cloud/firestore";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { firestore, storage } from "@/firebase/clientApp";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const formTabs = [
  {
    title: "Post",
    icon: IoDocumentText,
  },
  {
    title: "Images & Video",
    icon: IoImageOutline,
  },
  {
    title: "Link",
    icon: BsLink45Deg,
  },
  {
    title: "Poll",
    icon: BiPoll,
  },
  {
    title: "Talk",
    icon: BsMic,
  },
];

export interface TabItem {
  title: string;
  icon: IconType;
}

export default function NewPostForm({ user }: { user: User }) {
  const params = useParams();
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
  const [textInputs, setTextInputs] = useState({
    title: "",
    body: "",
  });
  const [selectedFile, setSelectedFile] = useState<string>();
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const handleCreatePost = useCallback(async () => {
    const { communityId } = params;

    const newPost: Post = {
      communityId,
      creatorId: user.uid,
      creatorDisplayName: user.displayName || user.email!.split("@")[0],
      title: textInputs.title,
      body: textInputs.body,
      numberOfComments: 0,
      voteStatus: 0,
      createdAt: serverTimestamp() as Timestamp,
    };

    setLoading(true);
    try {
      const postDocRef = await addDoc(collection(firestore, "posts"), newPost);

      if (selectedFile) {
        const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
        await uploadString(imageRef, selectedFile, "data_url");
        const downloadURL = await getDownloadURL(imageRef);

        await updateDoc(postDocRef, {
          imageUrl: downloadURL,
        });
      }

      router.back()
    } catch (error) {
      console.log("handleCreatePost error:", error);
    }
    setLoading(false);

  }, [textInputs, selectedFile, user]);

  const onSelectImage = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    if (e.target.files?.[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target.result as string);
      }
    };
  }, []);

  const onTextChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setTextInputs((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    },
    []
  );

  return (
    <div className="flex flex-col bg-white rounded-md mt-2">
      <div className="w-full flex items-center">
        {formTabs.map((item) => (
          <TabItem
            key={item.title}
            setSelectedTab={setSelectedTab}
            item={item}
            selected={item.title === selectedTab}
          />
        ))}
      </div>

      <div className="p-4">
        {selectedTab === "Post" && (
          <TextInputs
            loading={loading}
            textInputs={textInputs}
            onChange={onTextChange}
            handleCreatePost={handleCreatePost}
          />
        )}
        {selectedTab === "Images & Video" && (
          <ImageUpload
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            setSelectedTab={setSelectedTab}
            onSelectImage={onSelectImage}
          />
        )}
      </div>
    </div>
  );
}
