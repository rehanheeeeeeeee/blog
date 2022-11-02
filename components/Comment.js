import Image from "next/image";
import React from "react";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
import { FiBookmark, FiMoreHorizontal } from "react-icons/fi";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

export default function Comment({ username, created, text, pfp }) {
  console.log(created);
  return (
    <div className="space-y-3 my-2">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center space-x-3">
          <Image src={pfp} width={40} height={40} className={"rounded-full"} />
          <div>
            <h1 className="font-sans">{username}</h1>
            <p className="text-sm font-sans text-gray-400 font-medium">
              <ReactTimeAgo
                date={created?.seconds * 1000 || 0}
                locale="en-US"
              />
            </p>
          </div>
        </div>
        <FiMoreHorizontal size={24} className="text-gray-900" />
      </div>
      <p className="font-sans text-sm font-medium">{text}</p>
    </div>
  );
}
