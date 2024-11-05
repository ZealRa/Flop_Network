import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const token = localStorage.getItem("jwt");

      try {
        const response = await fetch(
          `http://localhost:1337/api/posts/${id}?populate=author,users_likes`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération du post");
        }

        const data = await response.json();
        setPost(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <p>Chargement du post...</p>;
  if (error) return <p>{error}</p>;
  if (!post || !post.attributes) return <p>Post non trouvé.</p>;

  const { text, createdAt, updatedAt, author, users_likes } = post.attributes;

  return (
    <div>
      <h2>Post #{post.id}</h2>
      <p>{text || "Texte indisponible"}</p>
      <p>Auteur : {author?.data?.attributes?.username || "Auteur inconnu"}</p>
      <p>Créé le : {new Date(createdAt).toLocaleString()}</p>
      <p>Mis à jour le : {new Date(updatedAt).toLocaleString()}</p>
      <h3>Utilisateurs ayant aimé ce post :</h3>
      {users_likes?.data?.length > 0 ? (
        <ul>
          {users_likes.data.map((user) => (
            <li key={user.id}>{user.attributes.username}</li>
          ))}
        </ul>
      ) : (
        <p>Aucun like sur ce post</p>
      )}
    </div>
  );
};

export default PostDetail;
