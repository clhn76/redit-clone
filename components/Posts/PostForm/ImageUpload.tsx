import Button from "@/components/ui/Button";
import { ChangeEvent, useRef } from "react";

export default function ImageUpload({
  selectedFile,
  onSelectImage,
  setSelectedFile,
  setSelectedTab
}: {
  selectedFile?: string;
  onSelectImage: (e: ChangeEvent<HTMLInputElement>) => void;
  setSelectedTab: (value: string) => void;
  setSelectedFile: (value: string) => void;
}) {
  const selectedFileRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col items-center w-full">
      {selectedFile ? (
        <>
          <img src={selectedFile} className="max-w-[400px] max-h-[400px]" />
          <div className="flex items-center mt-4 gap-4">
            <Button solid onClick={() => setSelectedTab('Post')}>Back to Post</Button>
            <Button outline onClick={() => setSelectedFile('')}>Remove</Button>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center p-20 border-[1px] border-dashed w-full">
          <Button
            solid
            large
            onClick={() => {
              selectedFileRef.current?.click();
            }}
          >
            Upload
          </Button>
          <input
            onChange={onSelectImage}
            ref={selectedFileRef}
            hidden
            type="file"
          />
          <img src={selectedFile} alt="" />
        </div>
      )}
    </div>
  );
}
