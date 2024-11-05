import React from "react";
import "./Post.css"; // Assurez-vous d'importer le fichier CSS

const Post = ({ post }) => {
  return (
    <div className="post-card">
      <h3>Post #{post.id}</h3>
      <p>{post.attributes.text}</p>
      <p className="post-author">
        Auteur :{" "}
        {post.attributes.author?.data?.attributes?.username || "Auteur inconnu"}
      </p>
      <p className="post-date">
        Créé le : {new Date(post.attributes.createdAt).toLocaleString()}
      </p>
    </div>
  );
};

export default Post;
