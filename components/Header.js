import Image from "next/image";
import Link from "next/link";
import React from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { selectUser } from "../redux/articlesSlice";
import { useSelector } from "react-redux";
const styles = {
  content: "flex bg-[#FCC017] p-5 justify-center",
  logo: "object-contain",
  option: "font-sm cursor-pointer text-md max-md:hidden",
};

export default function Header({ setModalOpen }) {
  const user = useSelector(selectUser);
  const signin = () => {
    signInWithPopup(auth, provider);
  };

  const signOut = () => {
    auth.signOut();
  };

  return (
    <div className={styles.content}>
      <nav className="flex flex-row justify-between items-center space-x-2 max-sm:space-x-1 max-w-7xl w-full">
        <Image
          src={"/medium.png"}
          width="200"
          height="200"
          className={styles.logo}
        />
        <div className="flex flex-row items-center space-x-7 max-sm:space-x-4">
          <p className={styles.option}>Our Story</p>
          <p className={styles.option}>Membership</p>
          {user ? (
            <>
              <p
                className="leading-5 font-sm max-sm:font-xs cursor-pointer text-medium"
                onClick={signOut}
              >
                Sign Out
              </p>
              <p
                onClick={() => setModalOpen(true)}
                className={
                  "font-sm cursor-pointer text-sm rounded-3xl bg-black text-white px-4 py-2 font-medium align-middle"
                }
              >
                Write
              </p>
            </>
          ) : (
            <p className="font-sm cursor-pointer text-medium" onClick={signin}>
              Sign in
            </p>
          )}
          <p className="font-sm cursor-pointer max-sm:hidden text-sm rounded-3xl bg-black text-white px-4 py-2 font-medium align-middle max-sm:px-4">
            Get started
          </p>
        </div>
      </nav>
    </div>
  );
}
