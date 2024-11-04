import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../atoms/userAtom";
import { postsAtom } from "../atoms/postsAtom";

const Home = () => {
  const [user] = useAtom(userAtom);
  const [posts, setPosts] = useAtom(postsAtom);

  // Récupérer les posts lorsque le composant est monté
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/posts?populate=author"
        );
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des posts");
        }
        const data = await response.json();

        console.log("Réponse de l'API avec auteur :", data);

        if (Array.isArray(data.data)) {
          setPosts(data.data);
        } else {
          console.error(
            "Les données récupérées ne contiennent pas de tableau dans la clé 'data'",
            data
          );
        }
      } catch (error) {
        console.error("Erreur :", error);
      }
    };

    fetchPosts();
  }, [setPosts]);

  return (
    <div>
      {user ? (
        <h1>Bienvenue, {user.username}!</h1>
      ) : (
        <div>
          <h1>Bienvenue sur notre réseau social !</h1>
          <p>
            Pour accéder à toutes les fonctionnalités, veuillez vous inscrire ou
            vous connecter.
          </p>
          <Link to="/signup">
            <button>S'inscrire</button>
          </Link>
          <Link to="/login">
            <button>Se connecter</button>
          </Link>
        </div>
      )}

      {/* Afficher les posts */}
      <h2>Posts récents</h2>
      <div>
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id}>
              <h3>Post #{post.id}</h3>
              <p>{post.attributes.text}</p>
              <p>
                Auteur :{" "}
                {post.attributes.author?.data?.attributes?.username ||
                  "Auteur inconnu"}
              </p>
              <p>
                Créé le :{" "}
                {new Date(post.attributes.created_at).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p>Aucun post disponible.</p>
        )}
      </div>

      {/* Lien pour créer un nouveau post */}
      {user && (
        <Link to="/createPost">
          <button>Créer un post</button>
        </Link>
      )}
    </div>
  );
};

export default Home;
