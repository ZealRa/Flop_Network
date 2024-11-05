import React, { useState } from "react";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { postsAtom } from "../atoms/postsAtom";
import { userAtom } from "../atoms/userAtom";

const CreatePost = () => {
  const [text, setText] = useState("");
  const [user] = useAtom(userAtom);
  const [posts, setPosts] = useAtom(postsAtom);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim()) {
      alert("Le contenu du post ne peut pas être vide !");
      return;
    }

    const token = localStorage.getItem("jwt");
    if (!token) {
      alert("Vous devez être connecté pour créer un post.");
      return;
    }

    try {
      const response = await fetch("http://localhost:1337/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          data: {
            text,
            author: user.id, // Vérifiez que user.id est défini
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Erreur lors de la création du post"
        );
      }

      const newPost = await response.json();
      const postData = newPost.data; // Accédez à la structure correcte

      setPosts((prevPosts) => {
        if (!Array.isArray(prevPosts)) {
          console.error("prevPosts n'est pas un tableau", prevPosts);
          return [postData]; // Retourner un tableau avec le nouveau post
        }
        return [postData, ...prevPosts]; // Ajouter le nouveau post
      });

      navigate("/"); // Redirection vers la page d'accueil
    } catch (error) {
      console.error("Erreur :", error);
      alert(error.message); // Afficher l'erreur à l'utilisateur
    }
  };

  return (
    <div>
      <h2>Créer un nouveau post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="text">Contenu :</label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows="5"
            required
          />
        </div>
        <button type="submit">Publier</button>
      </form>
    </div>
  );
};

export default CreatePost;
