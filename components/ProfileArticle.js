import Image from "next/image";
import React from "react";
import { FiBookmark, FiMoreHorizontal } from "react-icons/fi";

const styles = {
  icon: "text-gray-400 hover:text-gray-800",
};

export default function ProfileArticle({ article }) {
  const { title, text, postedOn, postLength, category, bannerImage } = article;
  return (
    <div className="flex flex-row items-start space-x-5 border-b-2 border-gray-300 py-5">
      <div className="flex flex-col space-y-7">
        <div className="space-y-4">
          <h2 className="font-bold md:text-2xl md:leading-5 max-sm:leading-5 text-[3.2vw] font-sans">
            {title}
          </h2>
          <p className="text-gray-800 text-md max-sm:hidden">
            {text.slice(0, 175)}....
          </p>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center space-x-3">
            <p className="rounded-3xl font-xs bg-gray-200 text-black font-normal px-3">
              {category}
            </p>
            <p className="text-gray-500 text-sm font-sans font-medium">
              {postLength} min read
            </p>
          </div>
          <div className="flex flex-row space-x-5">
            <FiBookmark size={23} className={styles.icon} />
            <FiMoreHorizontal size={23} className={styles.icon} />
          </div>
        </div>
      </div>
      <Image src={bannerImage} height={150} width={150} />
    </div>
  );
}
