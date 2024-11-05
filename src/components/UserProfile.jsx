import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const { user_id } = useParams(); // Récupère le user_id à partir des paramètres de l'URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("jwt"); // Récupère le token JWT

      try {
        const response = await fetch(
          `http://localhost:1337/api/users/${user_id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Ajoute le token dans les headers
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            "Erreur lors de la récupération du profil utilisateur"
          );
        }

        const userData = await response.json();
        setUser(userData); // Met à jour l'état avec les données de l'utilisateur
      } catch (error) {
        setError(error.message); // Gère l'erreur
      } finally {
        setLoading(false); // Indique que le chargement est terminé
      }
    };

    fetchUserProfile(); // Appelle la fonction pour récupérer le profil
  }, [user_id]); // Re-exécute si le user_id change

  if (loading) {
    return <div>Chargement...</div>; // Affiche un message de chargement
  }

  if (error) {
    return <div>{error}</div>; // Affiche l'erreur si elle est survenue
  }

  if (!user) {
    return <div>Aucun utilisateur trouvé</div>; // Gérer le cas où l'utilisateur n'est pas trouvé
  }

  return (
    <div>
      <h2>Profil de {user.username}</h2>
      <p>Email: {user.email}</p>
      <p>Description: {user.description || "Aucune description fournie"}</p>
      <p>Créé le: {new Date(user.createdAt).toLocaleDateString()}</p>
      <p>Mise à jour le: {new Date(user.updatedAt).toLocaleDateString()}</p>
    </div>
  );
};

export default UserProfile;
