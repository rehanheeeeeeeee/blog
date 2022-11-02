import React from "react";
import ProfileArticle from "./ProfileArticle";

const styles = {
  name: "text-5xl capitalize font-bold font-sans",
};

export default function MainProfile({ user, articles }) {
  return (
    <div className="p-5 space-y-5 my-10">
      <h1 className={styles.name}>{user.username}</h1>
      {articles.length === 0 ? (
        <h2>User hasnt Posted Any Articles</h2>
      ) : (
        articles.map((article) => <ProfileArticle article={article} />)
      )}
    </div>
  );
}
