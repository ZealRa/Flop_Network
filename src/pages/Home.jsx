import React from "react";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../atoms/userAtom";

const Home = () => {
  const [user] = useAtom(userAtom);

  return (
    <div>
      {user ? (
        <div>
          <h1>Bienvenue, {user.username}!</h1>
          <Link to="/createPost">
            <button>Créer un post</button>
          </Link>
        </div>
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
