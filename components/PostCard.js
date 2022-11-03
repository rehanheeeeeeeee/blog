import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiBookmark } from "react-icons/fi";

export default function PostCard({
  title,
  breif,
  bannerImage,
  postedOn,
  category,
  username,
  photoURL,
  postLength,
  id,
}) {
  return (
    <Link href={`/articles/${id}`}>
      <div className="flex flex-row flex-wrap items-center space-x-4 py-5 max-lg:px-5 max-sm:justify-center space-y-3">
        <div className="flex flex-col space-y-1.5">
          <div className="flex flex-row items-center space-x-2">
            <Image
              src={photoURL}
              width={30}
              height={30}
              className="rounded-full"
            />
            <p className="font-semibold">{username}</p>
          </div>
          <h2 className="text-[3.5vw] leading-6 md:text-2xl font-bold max-w-lg">
            {title}
          </h2>
          <p className="text-gray-500 max-w-md">{breif.slice(0, 101)}...</p>
          <div className="flex flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              {new Date(postedOn?.seconds).toDateString()} · {postLength} min
              read ·{" "}
              <span className="bg-gray-200 rounded-2xl p-1 text-xs">
                {category}
              </span>
            </p>
            <FiBookmark className="cursor-pointer text-lg" />
          </div>
        </div>
        <Image
          src={bannerImage}
          width={200}
          height={200}
          className="object-contain"
        />
      </div>
    </Link>
  );
}
