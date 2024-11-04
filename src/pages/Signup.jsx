import React, { useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../atoms/userAtom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setUser] = useAtom(userAtom);

  const handleSignup = async (e) => {
    e.preventDefault();

    const payload = {
      username,
      email,
      password,
    };

    try {
      const response = await fetch(
        "http://localhost:1337/api/auth/local/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de l'inscription");
      }

      const data = await response.json();
      const { jwt, user } = data;

      localStorage.setItem("jwt", jwt);
      setUser(user);

      alert("Inscription réussie ! Bienvenue, " + user.username);
    } catch (error) {
      console.error(error);
      alert("Une erreur est survenue lors de l'inscription.");
    }
  };

  return (
    <div>
      <h1>S'inscrire</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="username">Nom d'utilisateur</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default Signup;
