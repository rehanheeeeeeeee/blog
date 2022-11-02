import React, { useEffect, useState } from "react";
import ArticleMain from "../../components/ArticleMain";
import ReadersNav from "../../components/ReadersNav";
import Recommendations from "../../components/Recommendations";
import { db } from "../../firebase";
import {
  getDocs,
  query,
  collection,
  getDoc,
  doc,
  orderBy,
  addDoc,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
import { IoClose } from "react-icons/io5";
import { selectUser } from "../../redux/articlesSlice";
import { useSelector } from "react-redux";
import Comment from "../../components/Comment";

export const getStaticPaths = async () => {
  const colRef = query(collection(db, "articles"));
  const snapshot = await getDocs(colRef);
  const paths = [];
  snapshot.forEach((doc) => {
    paths.push({
      params: { id: doc.id },
    });
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const docRef = doc(db, "articles", id);
  const article = await getDoc(docRef);
  return {
    props: {
      article: JSON.parse(
        JSON.stringify({ id: article.id, ...article.data() })
      ),
    },
  };
};

const styles = {
  comments: (showComments) =>
    `${
      showComments
        ? "translate-x-0 translate-y-0"
        : "sm:translate-x-full max-sm:translate-y-full"
    } ease-out delay-800 transition-all fixed z-10 scrollbar-hide right-0 lg:w-1/3 max-lg:w-[50vw] bg-white top-0 bottom-0 max-sm:w-full max-sm:top-20 max-sm:rounded-l-xl max-sm:rounded-r-xl p-5`,
};

export default function Article({ article }) {
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const user = useSelector(selectUser);
  const [comments, setComments] = useState([]);
  const handleComments = () => {
    setShowComments((prevValue) => !prevValue);
  };

  const sendComment = () => {
    const colRef = collection(db, "articles", article.id, "comments");
    addDoc(colRef, {
      username: user.displayName,
      email: user.email,
      text: comment,
      pfp: user.photoURL,
      created: serverTimestamp(),
    });
    setComment("");
  };

  useEffect(() => {
    const q = async () => {
      const colRef = query(
        collection(db, "articles", article.id, "comments"),
        orderBy("created", "desc")
      );
      onSnapshot(colRef, (snapshot) => {
        setComments(snapshot.docs.map((doc) => doc.data()));
      });
    };
    q();
  }, []);

  console.log(comments);

  return (
    <>
      <div className="h-[100vh] flex flex-row">
        <ReadersNav />
        <div className="overflow-y-scroll flex flex-row flex-1">
          <ArticleMain
            article={article}
            handleComments={handleComments}
            comments={comments.length}
          />
          <Recommendations
            username={article.username}
            pfp={article.pfp}
            title={article.title}
          />
        </div>
        <>
          {showComments && (
            <div
              onClick={handleComments}
              className="fixed left-0 right-0 top-0 bottom-0 bg-[rgba(0,0,0,0.3)]"
            ></div>
          )}
          <div className={styles.comments(showComments)}>
            <div className="flex flex-row items-center justify-between">
              <h1 className="text-2xl font-semibold font-sans">
                Responses ({comments.length})
              </h1>
              <IoClose
                onClick={handleComments}
                size={30}
                className="cursor-pointer text-gray-400"
              />
            </div>
            <input
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder="What are yout thoughts?"
              className="w-full shadow-lg p-5 rounded-md my-5 outline-none font-sans"
            />
            <div className="w-full flex flex-row justify-end px-2">
              <button
                onClick={sendComment}
                className="bg-green-600 font-sans px-5 py-1.5 rounded-3xl text-white outline-none font-medium"
              >
                Respond
              </button>
            </div>
            <div className="space-y-7">
              {comments?.map((comment) => (
                <Comment
                  username={comment.username}
                  text={comment.text}
                  created={comment.created}
                  pfp={comment.pfp}
                />
              ))}
            </div>
          </div>
        </>
      </div>
    </>
  );
}
