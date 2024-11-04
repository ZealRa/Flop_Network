import React, { useState } from "react";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom"; // Importer useNavigate
import { userAtom } from "../atoms/userAtom"; // Atome pour stocker l'utilisateur

const Login = () => {
  const [identifier, setIdentifier] = useState(""); // Peut être un nom d'utilisateur ou un email
  const [password, setPassword] = useState("");
  const [, setUser] = useAtom(userAtom);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const payload = {
      identifier,
      password,
    };

    try {
      const response = await fetch("http://localhost:1337/api/auth/local", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la connexion");
      }

      const data = await response.json();
      const { jwt, user } = data;

      // Stocker le token dans localStorage
      localStorage.setItem("jwt", jwt);

      // Mettre à jour l'utilisateur avec atomWithStorage
      setUser(user);

      alert("Connexion réussie ! Bienvenue, " + user.username);
      navigate("/"); // Redirection vers la page d'accueil
    } catch (error) {
      console.error(error);
      alert("Une erreur est survenue lors de la connexion.");
    }
  };

  return (
    <div>
      <h1>Se connecter</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="identifier">Nom d'utilisateur ou Email</label>
          <input
            type="text"
            id="identifier"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default Login;
