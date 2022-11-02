import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function RecommendedBlog({ article }) {
  const { username, pfp, title, id } = article;
  return (
    <Link href={`/articles/${id}`}>
      <div className="space-y-1 my-5">
        <div className="flex flex-row items-center space-x-2">
          <Image src={pfp} height={25} width={25} className="rounded-full" />
          <p>{username}</p>
        </div>
        <p className="font-bold">{title}</p>
      </div>
    </Link>
  );
}
