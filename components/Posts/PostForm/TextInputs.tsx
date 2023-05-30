import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { ChangeEvent } from "react";

export default function TextInputs({
  textInputs,
  handleCreatePost,
  loading,
  onChange,
}: {
  textInputs: {
    title: string;
    body: string;
  };
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleCreatePost: () => void;
  loading: boolean;
}) {
  return (
    <div className="flex flex-col gap-3 w-full">
      <Input
        onChange={onChange}
        value={textInputs.title}
        name="title"
        className="text-sm"
        placeholder="Title"
      />
      <textarea
        onChange={onChange}
        value={textInputs.body}
        name="body"
        placeholder="Text (optional)"
        className="p-2 text-sm border-2 rounded-md bg-neutral-50 h-[100px]  outline-none focus:border-blue-500 duration-300"
      />
      <div className="flex justify-end">
        <Button onClick={handleCreatePost} isLoading={loading} solid large>
          Post
        </Button>
      </div>
    </div>
  );
}
