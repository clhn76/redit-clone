import type { Dispatch, SetStateAction } from "react";
import { TabItem } from "./NewPostForm";

export default function TabItem({
  item,
  selected,
  setSelectedTab,
}: {
  item: TabItem;
  selected: boolean;
  setSelectedTab: Dispatch<SetStateAction<string>>;
}) {
  const { icon: Icon, title } = item;

  return (
    <div
      className={`
        gap-1
        py-4 
        px-2 
        flex-1 
        flex 
        items-center 
        justify-center 
        cursor-pointer 
        hover:bg-neutral-50 
        transition
        ${selected ? "text-blue-500" : "text-neutral-500"}
        border-r-[1px]
        ${selected ? "border-b-2" : "border-b-[1px]"}
        ${selected ? "border-b-blue-500" : "border-b-neutral-200"}
        border-r-neutral-200
      `}
      onClick={() => setSelectedTab(title)}
    >
      <Icon size={20} />
      <h2 className="text-sm whitespace-nowrap font-semibold">{title}</h2>
    </div>
  );
}
