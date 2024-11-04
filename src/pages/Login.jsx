import React, { useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../atoms/userAtom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [, setUser] = useAtom(userAtom);

  const handleLogin = async () => {
    // Remplacez cette partie par l’appel à votre API d’authentification Strapi
    const userData = { username, token: "fakeToken123" };
    setUser(userData);
  };

  return (
    <div>
      <input
        placeholder="Nom d'utilisateur"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Se connecter</button>
    </div>
  );
};

export default Login;
