import Banner from "../components/Banner";
import Header from "../components/Header";
import PostCard from "../components/PostCard";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import PostForm from "../components/PostForm";
import { auth, db } from "../firebase";
import {
  getDocs,
  collection,
  where,
  query,
  doc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";

const customStyles = {
  content: {
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
  },
};
import { useDispatch } from "react-redux";
import { addUser } from "../redux/articlesSlice";
import { IoClose } from "react-icons/io5";
import Head from "next/head";

export const getStaticProps = async () => {
  const colRef = query(collection(db, "articles"));
  const snapshot = await getDocs(colRef);
  const ids = snapshot.docs.map((doc) => doc.id);
  const randomIndex = Math.floor(Math.random() * ids.length);
  return {
    props: {
      randomId: ids[randomIndex],
    },
  };
};

export default function Home({ randomId }) {
  const [articles, setArticles] = useState([]);
  const dispatch = useDispatch();
  const [openModal, setModalOpen] = useState(false);
  useEffect(() => {
    const query = async () => {
      onSnapshot(collection(db, "articles"), (snapshot) => {
        setArticles(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          })
        );
      });
    };
    query();
  }, []);
  return (
    <div>
      <Head>
        <title>Medium</title>
        <link rel="icon" href="/smallmedium.png"></link>
      </Head>
      <Header setModalOpen={setModalOpen} />
      <Banner id={randomId} />
      <div className="w-full flex justify-center">
        <div className="flex flex-col max-w-7xl w-[95vw]">
          {articles.map((article) => (
            <PostCard
              key={article.id}
              id={article.id}
              title={article.title}
              breif={article.breif}
              bannerImage={article.bannerImage}
              username={article.username}
              photoURL={article.pfp}
              category={article.category}
              postLength={article.postLength}
              postedOn={article.postedOn}
            />
          ))}
        </div>
      </div>
      <Modal
        style={customStyles}
        isOpen={openModal}
        onRequestClose={() => setModalOpen(false)}
      >
        <div className="flex flex-col items-start px-5 max-sm:px-0">
          <div className="flex flex-row justify-center w-full items-center mb-10">
            <h1 className="font-sans text-3xl font-bold w-full text-center">
              Upload a Post
            </h1>
            <IoClose
              onClick={() => setModalOpen(false)}
              size={28}
              className="text-gray-800 absolute right-5"
            />
          </div>
          <PostForm setModalOpen={setModalOpen} />
        </div>
      </Modal>
    </div>
  );
}
