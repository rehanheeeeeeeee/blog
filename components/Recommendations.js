import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FiMail, FiSearch } from "react-icons/fi";
import RecommendedBlog from "./RecommendedBlog";
import { useSelector } from "react-redux";
import {
  where,
  getDocs,
  collection,
  query,
  doc,
  setDoc,
  onSnapshot,
  deleteDoc,
  limit,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { selectUser } from "../redux/articlesSlice";
import Link from "next/link";

export default function Recommendations({
  username,
  pfp,
  title,
  dontrecommend,
}) {
  const [user, setUser] = useState();
  const [followers, setFollowers] = useState([]);
  const currentUser = useSelector(selectUser);

  useEffect(() => {
    const get = async () => {
      const colRef = query(
        collection(db, "users"),
        where("username", "==", username)
      );
      const snapshot = await getDocs(colRef);
      const users = snapshot.docs.map((doc) => {
        return doc.data();
      });
      const subColRef = collection(db, "users", users[0].uid, "followers");
      onSnapshot(subColRef, (snapshot) => {
        setFollowers(
          snapshot.docs.map((doc) => {
            return doc.data().username;
          })
        );
      });
      setUser(users[0]);
    };
    get();
  }, [username]);

  console.log(user);

  const follow = () => {
    const docRef = doc(db, "users", user.uid, "followers", currentUser.uid);
    setDoc(docRef, { username: currentUser.displayName });
    const currentRef = doc(
      db,
      "users",
      currentUser.uid,
      "followings",
      user.uid
    );
    setDoc(currentRef, { username: user.username });
  };

  const unfollow = () => {
    const docRef = doc(db, "users", user.uid, "followers", currentUser.uid);
    deleteDoc(docRef);
  };

  return (
    <div className="h-max flex-initial right-0 bottom-0 top-0 sticky w-[30vw] px-8 max-md:hidden py-10 flex flex-col items-center space-y-5">
      <div className="w-full rounded-3xl py-1.5 px-5 outline-none bg-black text-white flex flex-row justify-center">
        Get unlimited access
      </div>
      <div className="flex flex-row items-center space-x-3 w-full rounded-3xl border-gray-200 border-solid border-2 py-2 px-3">
        <FiSearch srize={18} />
        <input placeholder="Search" className="outline-none" />
      </div>
      <User
        username={username}
        pfp={pfp}
        follow={follow}
        followers={followers}
        currentUser={currentUser}
        unfollow={unfollow}
        user={user}
      />
      {!dontrecommend && <RecommendedBlogs title={title} />}
    </div>
  );
}

const User = ({
  user,
  username,
  pfp,
  follow,
  followers,
  currentUser,
  unfollow,
}) => {
  return (
    <div className="flex flex-col w-full items-start space-y-3">
      <Image src={pfp} width={125} height={125} className="rounded-full" />

      <div>
        <p className="font-semibold">{username}</p>
        <p className="text-gray-500">{followers?.length} followers</p>
        {currentUser && currentUser?.displayName !== username && (
          <div>
            {followers?.includes(currentUser?.displayName) ? (
              <button
                onClick={unfollow}
                className="rounded-3xl bg-red-600 text-white py-1 px-3"
              >
                Unfollow
              </button>
            ) : (
              <button
                onClick={follow}
                className="rounded-3xl bg-green-600 text-white py-1 px-3"
              >
                Follow
              </button>
            )}

            <button className="rounded-full bg-green-600 text-white px-2 py-2 m-2 relative top-0.5">
              <FiMail />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const RecommendedBlogs = ({ title }) => {
  const [recommendedArticles, setRecommendedArticles] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "articles"),
      where("title", "!=", title),
      limit(4)
    );
    onSnapshot(q, (snapshot) =>
      setRecommendedArticles(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        })
      )
    );
  }, [title]);
  return (
    <div className="flex flex-col items-start w-full">
      <h2 className="font-medium">More from Medium</h2>
      <div>
        {recommendedArticles?.map((article, index) => {
          return <RecommendedBlog key={index} article={article} />;
        })}
      </div>
    </div>
  );
};
