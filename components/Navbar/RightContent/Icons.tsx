'use client'

import { BsArrowUpRightCircle, BsChatDots } from "react-icons/bs";
import {
  IoFilterCircleOutline,
  IoVideocamOutline,
  IoNotificationsOutline,
} from "react-icons/io5";
import { GrAdd } from "react-icons/gr";

const ICON_CLASS_NAME = "flex items-center mx-1.5 p-1 cursor-pointer hover:bg-neutral-100 transitino rounded-full"

export default function Icons() {
  return (
    <div className="flex items-center">
      <div className="hidden md:flex items-center border-r-[1px]">
        <BsArrowUpRightCircle
          className={ICON_CLASS_NAME}
          size={32}
        />
        <IoFilterCircleOutline
          className="
            flex
            items-center
            mx-1.5
            p-1
            cursor-pointer
            hover:bg-neutral-100
            transition
            rounded-full
          "
          size={34}
        />
        <IoVideocamOutline
          className={ICON_CLASS_NAME}
          size={34}
        />
      </div>
      <div className="flex items-center">
        <BsChatDots
          className={ICON_CLASS_NAME}
          size={32}
        />
        <IoNotificationsOutline
          className={ICON_CLASS_NAME}
          size={32}
        />
        <GrAdd
          className={ICON_CLASS_NAME}
          size={32}
        />
      </div>
    </div>
  );
}
