import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PostDetail = () => {
  const { id } = useParams(); // Récupère l'ID du post à partir des paramètres de l'URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `http://localhost:1337/api/posts/${id}?populate=author` // Requête pour obtenir le post avec l'auteur
        );
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération du post");
        }
        const data = await response.json();
        console.log("Données récupérées du post :", data);

        // Mise à jour pour accéder à data.data
        setPost(data.data); // Assurez-vous d'accéder aux données du post
      } catch (error) {
        setError(error.message);
        console.error(error);
      } finally {
        setLoading(false); // Indique que le chargement est terminé
      }
    };

    fetchPost(); // Appelle la fonction pour récupérer le post
  }, [id]);

  if (loading) {
    return <p>Chargement du post...</p>; // Affiche un message de chargement
  }

  if (error) {
    return <p>{error}</p>; // Affiche l'erreur si elle est survenue
  }

  // Vérification de l'existence des données du post
  if (!post || !post.attributes) {
    return <p>Post non trouvé.</p>; // Gère le cas où le post est introuvable
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
