import React from "react";
import { useAtom } from "jotai";
import { userAtom } from "../atoms/userAtom";

const Header = () => {
  const [user, setUser] = useAtom(userAtom);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("jwt");
  };

  return (
    <header>
      {user ? (
        <div>
          <span>Bienvenue, {user.username}</span>
          <button onClick={handleLogout}>Déconnexion</button>
        </div>
      ) : (
        <span>Veuillez vous connecter</span>
      )}
    </header>
  );
};

export default Header;
