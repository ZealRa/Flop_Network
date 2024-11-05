import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `http://localhost:1337/api/posts/${id}?populate=author`
        );
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération du post");
        }
        const data = await response.json();
        console.log("Données récupérées du post :", data);

        // Mise à jour pour accéder à data.data
        setPost(data.data);
      } catch (error) {
        setError(error.message);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <p>Chargement du post...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Vérification de l'existence des données du post
  if (!post || !post.attributes) {
    return <p>Post non trouvé.</p>;
  }

  // Accéder aux données de l'auteur
  const author = post.attributes.author?.data?.attributes?.username;

  return (
    <div>
      <h2>Post #{post.id}</h2>
      <p>{post.attributes.text || "Texte indisponible"}</p>
      <p>Auteur : {author || "Auteur inconnu"}</p>
      <p>
        Créé le :{" "}
        {new Date(post.attributes.createdAt).toLocaleString() ||
          "Date indisponible"}
      </p>
      <p>
        Mis à jour le :{" "}
        {new Date(post.attributes.updatedAt).toLocaleString() ||
          "Date indisponible"}
      </p>
    </div>
  );
};

export default PostDetail;
