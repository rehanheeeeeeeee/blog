import Image from "next/image";
import React from "react";
import { FiBell, FiBookmark, FiHome } from "react-icons/fi";
import { BsBookmarks, BsPencilSquare } from "react-icons/bs";
import { IoDocumentTextOutline } from "react-icons/io5";
import { AiOutlineHome } from "react-icons/ai";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/articlesSlice";
const styles = {
  wrapper:
    "h-[100vh] flex-none flex flex-col justify-between items-center py-5 px-2 border-r-2 border-gray",
  logo: "h-11 w-11 object-contain",
  pfp: "h-9 w-9 object-contain rounded-full",
  option: "text-gray-400 hover:text-black",
};

export default function ReadersNav() {
  const user = useSelector(selectUser);
  return (
    <div className={styles.wrapper}>
      <Link href="/">
        <Image
          src={"/smallmedium.png"}
          width={200}
          height={200}
          className={styles.logo}
        />
      </Link>
      <div className="flex flex-col space-y-5">
        <div className="flex-col space-y-8 border-b-2 py-5 border-gray-300">
          <Link href="/">
            <AiOutlineHome size={26} className={styles.option} />
          </Link>
          <FiBell size={26} className={styles.option} />
          <BsBookmarks size={26} className={styles.option} />
          <IoDocumentTextOutline size={26} className={styles.option} />
        </div>
        <BsPencilSquare size={26} className={styles.option} />
      </div>
      <Image
        src={user?.photoURL}
        width={200}
        height={200}
        className={styles.pfp}
      />
    </div>
  );
}
