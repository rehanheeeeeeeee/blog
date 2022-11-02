import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { auth, db, storage } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { uid } from "uid";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadString,
} from "firebase/storage";
import { v4 as uuid } from "uuid";

const postSchema = yup.object().shape({
  title: yup.string().required().min(10),
  breif: yup.string().required().min(50),
  category: yup.string().required(),
  postLength: yup.string().required(),
  text: yup.string().required().min(250),
});

const styles = {
  input: (touched, error) =>
    `rounded-sm border-2 flex-1 px-3 ${
      touched && error ? "border-red-500" : "border-black"
    }`,
  inputbox: "flex flex-row items-center space-x-4 w-full outline-none",
  label: "font-mediumSerif font-medium flex-none w-20 leading-5 text-md",
  textbox: "flex flex-row items-start space-x-4 w-full outline-none",
  btn: (valid, bannerImage) =>
    `rounded-3xl ${
      valid && bannerImage ? "bg-black" : "bg-gray-300"
    } text-white px-5 py-1`,
  inputfile: (touched, error) => `rounded-sm flex-1 px-3`,
};

export default PostForm = ({ setModalOpen }) => {
  const user = auth.currentUser;
  const { displayName } = user;
  const [bannerImage, setBannerImage] = useState("");

  return (
    <Formik
      validationSchema={postSchema}
      initialValues={{
        title: "",
        breif: "",
        bannerImage: "",
        category: "",
        postLength: "",
        text: "",
      }}
      onSubmit={async (values) => {
        const uid = uuid();
        console.log(bannerImage);
        const storageRef = ref(storage, `images/${uid}`);
        await uploadBytes(storageRef, bannerImage);
        getDownloadURL(storageRef).then((url) => {
          console.log(url);
          addDoc(collection(db, "articles"), {
            username: displayName,
            email: user.email,
            pfp: user.photoURL,
            postedOn: serverTimestamp(),
            ...values,
            bannerImage: url,
          });
        });
        setModalOpen(false);
      }}
    >
      {({
        handleChange,
        values,
        errors,
        touched,
        handleBlur,
        handleSubmit,
        isValid,
      }) => (
        <div className="flex flex-col items-center w-full space-y-5">
          <div className={styles.inputbox}>
            <p className={styles.label}>Title</p>
            <input
              onBlur={handleBlur("title")}
              className={styles.input(touched.title, errors.title)}
              name="title"
              value={values.title}
              onChange={handleChange("title")}
            />
          </div>
          <div className={styles.inputbox}>
            <p className={styles.label}>Breif</p>
            <input
              onBlur={handleBlur("breif")}
              className={styles.input(touched.breif, errors.breif)}
              value={values.breif}
              onChange={handleChange("breif")}
            />
          </div>
          <div className={styles.inputbox}>
            <p className={styles.label}>Banner Image</p>
            <label
              className={styles.input(touched.bannerImage, !bannerImage)}
              for="upload"
            >
              <p
                className={`text-lg font-semibold font-sans cursor-pointer w-full text-center ${
                  bannerImage ? "text-green-500" : "text-black"
                }`}
              >
                {bannerImage ? "Uploaded" : "Upload Image"}
              </p>
            </label>
            <input
              id="upload"
              onBlur={handleBlur("bannerImage")}
              className={styles.inputfile(touched.bannerImage, bannerImage)}
              type="file"
              onChange={(event) => setBannerImage(event.target.files[0])}
            />
          </div>
          <div className={styles.inputbox}>
            <p className={styles.label}>Category</p>
            <input
              onBlur={handleBlur("category")}
              className={styles.input(touched.category, errors.category)}
              value={values.category}
              onChange={handleChange("category")}
            />
          </div>
          <div className={styles.inputbox}>
            <p className={styles.label}>Estimated Read Length (in minutes)</p>
            <input
              onBlur={handleBlur("postLength")}
              className={styles.input(touched.postLength, errors.postLength)}
              value={values.postLength}
              onChange={handleChange("postLength")}
            />
          </div>
          <div className={styles.textbox}>
            <p className={styles.label}>Article Text</p>
            <textarea
              rows={10}
              onBlur={handleBlur("text")}
              className={styles.input(touched.text, errors.text)}
              value={values.text}
              onChange={handleChange("text")}
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={!isValid || !bannerImage}
            className={styles.btn(isValid, bannerImage)}
          >
            Submit
          </button>
        </div>
      )}
    </Formik>
  );
};
