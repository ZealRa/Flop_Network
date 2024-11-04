import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRoutes from "./AppRoutes";
import { useAtom } from "jotai";
import { userAtom } from "./atoms/userAtom"; // Atome pour stocker l'utilisateur

const App = () => {
  const [user, setUser] = useAtom(userAtom); // Récupérer et mettre à jour l'utilisateur

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token && !user) {
      const fetchUser = async () => {
        try {
          const response = await fetch("http://localhost:1337/api/users/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error(
              "Erreur lors de la récupération des données de l'utilisateur"
            );
          }

          const userData = await response.json();
          setUser(userData); // Mettre à jour l'utilisateur dans l'atome avec stockage
        } catch (error) {
          console.error(error);
        }
      };

      fetchUser();
    }
  }, [setUser, user]);

  return (
    <div className="App">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
};

export default App;
