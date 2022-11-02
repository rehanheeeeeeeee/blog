import { useDispatch } from "react-redux";
import { addUser } from "../redux/articlesSlice";
import { useEffect } from "react";
import { auth, db } from "../firebase";
import {
  query,
  collection,
  where,
  doc,
  setDoc,
  getDocs,
} from "firebase/firestore";

export default function Layout({ children }) {
  const dispatch = useDispatch();
  useEffect(() => {
    const get = async () => {
      auth.onAuthStateChanged(async (authUser) => {
        if (authUser) {
          dispatch(addUser(authUser));
          const colRef = query(
            collection(db, "users"),
            where("uid", "==", authUser.uid)
          );
          const snap = await getDocs(colRef);
          if (snap.docs) {
            setDoc(doc(db, "users", authUser.uid), {
              uid: authUser.uid,
              username: authUser.displayName,
              email: authUser.email,
              pfp: authUser.photoURL,
            });
          }
        } else dispatch(addUser());
      });
    };
    get();
  }, [dispatch]);
  return <div>{children}</div>;
}
