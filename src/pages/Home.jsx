import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../atoms/userAtom";
import { postsAtom } from "../atoms/postsAtom";
import Post from "../components/Post";

const Home = () => {
  const [user] = useAtom(userAtom);
  const [posts, setPosts] = useAtom(postsAtom);

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
        <>
          <h1>Bienvenue, {user.username}!</h1>
          <Link to="/createPost">
            <button>Créer un post</button>
          </Link>
          <h2>Posts récents</h2>
          <div>
            {Array.isArray(posts) && posts.length > 0 ? (
              posts.map((post) => (
                <Link to={`/posts/${post.id}`} key={post.id}>
                  <Post post={post} /> {/* Passer l'objet post directement */}
                </Link> // Passer l'objet post directement
              ))
            ) : (
              <p>Aucun post disponible.</p>
            )}
          </div>
        </>
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
    </div>
  );
};

export default Home;
