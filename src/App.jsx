import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import AppRoutes from "./AppRoutes";
import { useAtom } from "jotai";
import { userAtom } from "./atoms/userAtom";

const App = () => {
  const [user, setUser] = useAtom(userAtom);

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
        <Header />
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
};

export default App;
