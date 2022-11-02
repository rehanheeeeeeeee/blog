import { async } from "@firebase/util";
import { collection, getDocs, query } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { db } from "../firebase";

const styles = {
  banner:
    "max-w-7xl flex-row bg-[#FCC017] flex justify-between items-center w-full",
  content: "flex flex-col items-start w-full",
  btn: "bg-black text-white rounded-3xl py-2 px-12 my-5 text-xl font-semibold",
};

export default function Banner({ id }) {
  console.log(id);
  return (
    <div className="bg-[#FCC017] flex px-8 py-10 justify-center border-y-2 border-black">
      <div className={styles.banner}>
        <div className={styles.content}>
          <h1 className="text-[14vw] md:text-[6rem] font-mediumSerif">
            Stay Curious.
          </h1>
          <h3 className="text-2xl my-3 font-md leading-none max-w-lg">
            Discover stories, thinking and expertise from writers on any topic.
          </h3>
          <Link href={`/articles/${id}`}>
            <button className={styles.btn}>Start Reading</button>
          </Link>
        </div>
        <Image
          src="/banner.png"
          height="400"
          width="500"
          className="h-full object-contain max-lg:hidden"
        />
      </div>
    </div>
  );
}
