import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import {
  AiFillFacebook,
  AiFillLinkedin,
  AiFillPlayCircle,
} from "react-icons/ai";
import { BsBookmarks } from "react-icons/bs";
import {
  FiFacebook,
  FiLinkedin,
  FiMoreHorizontal,
  FiMoreVertical,
  FiPaperclip,
  FiTwitter,
} from "react-icons/fi";
import { BsHandThumbsUp, BsChat, BsHandThumbsUpFill } from "react-icons/bs";
import { db } from "../firebase";
import {
  addDoc,
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/articlesSlice";

const styles = {
  cover: "w-full max-h-84",
  title: "capitalize text-2xl font-bold font-sans",
  info: "font-sans",
  icon: (border, black) =>
    `${black ? "text-black" : "text-gray-400"} font-sans flex space-x-3 ${
      border && "px-7 border-x-2"
    }`,
};
export default function ArticleMain({ article, handleComments, comments }) {
  const [likes, setLikes] = useState();
  const user = useSelector(selectUser);
  useEffect(() => {
    const q = async () => {
      const colRef = collection(db, "articles", article.id, "likes");
      onSnapshot(colRef, (snap) => {
        setLikes(snap.docs.map((doc) => doc.data().email));
      });
    };
    q();
  }, []);

  const like = () => {
    const colRef = doc(db, "articles", article.id, "likes", user.uid);
    setDoc(colRef, {
      email: user.email,
    });
  };

  const dislike = () => {
    const colRef = doc(db, "articles", article.id, "likes", user.uid);
    deleteDoc(colRef);
  };

  return (
    <div className="flex-1 flex flex-col space-y-4 px-5 py-10">
      <ArticleHeader
        username={article.username}
        pfp={article.pfp}
        postLength={article.postLength}
        postedOn={article.postedOn}
      />
      <Image
        src={article.bannerImage}
        width={300}
        height={400}
        className={styles.cover}
      />
      <div className="flex flex-col space-y-3">
        <h1 className={styles.title}>{article.title} </h1>
        <div className="leading-6">
          <p className={styles.info}>{article.username},</p>
          <p className={styles.info}>{article.breif}</p>
        </div>
      </div>
      <div className="flex flex-col space-y-3 pb-5">
        <p className="font-sans">{article.text}</p>
      </div>
      <div className="w-full flex flex-row justify-center">
        <div className="shadow-xl fixed bottom-10 bg-zinc-50 rounded-3xl flex flex-row items-center justify-between px-7 py-3 space-x-6">
          <div className="flex flex-row items-center space-x-3">
            {likes?.includes(user.email) ? (
              <BsHandThumbsUpFill
                size={30}
                onClick={dislike}
                className={styles.icon(false, true)}
              />
            ) : (
              <BsHandThumbsUp
                onClick={like}
                size={30}
                className={styles.icon(false)}
              />
            )}
            <p>{likes?.length}</p>
          </div>
          <div className={styles.icon(true)} onClick={handleComments}>
            <BsChat size={27} className={styles.icon()} />
            <p>{comments}</p>
          </div>
          <FiMoreHorizontal size={27} className={styles.icon()} />
        </div>
      </div>
    </div>
  );
}

const ArticleHeader = ({ username, pfp, postLength, postedOn }) => (
  <div className="flex flex-row items-center justify-between flex-wrap space-x-2 space-y-4">
    <div className="flex flex-row space-x-3 items-center">
      <Image
        src={pfp}
        width={30}
        height={30}
        className="rounded-full max-sm:h-8 max-sm:w-8"
      />
      <div>
        <p className="font-medium capitalize font-sans">{username}</p>
        <p className="text-gray-400 text-xs font-sans font-medium">
          {new Date(postedOn.seconds * 1000).toDateString()}· {postLength} min
          read ·{" "}
          <span className="text-green-700">
            <AiFillPlayCircle
              className="inline-flex relative bottom-0.5 mr-2"
              size={18}
            />
            Listen
          </span>
        </p>
      </div>
    </div>
    <div className="flex flex-row items-center space-x-10">
      <div className="flex flex-row items-center space-x-3">
        <FiTwitter
          size={22}
          className="text-gray-400 hover:text-gray-900 transition-all delay-200 linear cursor-pointer"
        />
        <AiFillFacebook
          size={22}
          className="text-gray-400 hover:text-gray-900 cursor-pointer"
        />
        <AiFillLinkedin
          size={22}
          className="text-gray-400  hover:text-gray-900 cursor-pointer"
        />
        <FiPaperclip
          size={22}
          className="text-gray-400 hover:text-gray-900 cursor-pointer"
        />
      </div>
      <div className="flex flex-row items-center space-x-3">
        <BsBookmarks
          size={22}
          className="text-gray-400 hover:text-gray-900 cursor-pointer"
        />
        <FiMoreHorizontal
          size={22}
          className="text-gray-400 hover:text-gray-900 cursor-pointer"
        />
      </div>
    </div>
  </div>
);
