import React from "react";
import "./Post.css";

const Post = ({ post }) => {
  const { text, createdAt, author } = post.attributes;

  return (
    <div className="post-card">
      <h3>Post #{post.id}</h3>
      <p>{text}</p>
      <p className="post-author">
        Auteur : {author?.data?.attributes?.username || "Auteur inconnu"}
      </p>
      <p className="post-date">
        Créé le : {new Date(createdAt).toLocaleString()}
      </p>
    </div>
  );
};

export default Post;
