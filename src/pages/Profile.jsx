import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../atoms/userAtom";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useAtom(userAtom);
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("jwt");

      if (token) {
        try {
          const response = await fetch("http://localhost:1337/api/users/me", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error(
              "Erreur lors de la récupération des données du profil"
            );
          }

          const data = await response.json();
          setProfileData(data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  if (!user) {
    return <p>Veuillez vous connecter pour accéder à votre profil.</p>;
  }

  if (!profileData) {
    return <p>Chargement du profil...</p>;
  }

  return (
    <div>
      <h2>Profil de {profileData.username}</h2>
      <p>Email : {profileData.email}</p>
      <p>Nom d'utilisateur : {profileData.username}</p>
      <p>Fournisseur : {profileData.provider}</p>
      <p>Compte confirmé : {profileData.confirmed ? "Oui" : "Non"}</p>
      <p>Compte bloqué : {profileData.blocked ? "Oui" : "Non"}</p>
      <p>Description : {profileData.description || "Aucune description"}</p>
      <p>Créé le : {new Date(profileData.created_at).toLocaleDateString()}</p>
      <p>
        Mis à jour le : {new Date(profileData.updated_at).toLocaleDateString()}
      </p>
      <button onClick={() => navigate("/editProfile")}>
        Modifier le profil
      </button>
      {/* <p>Posts aimés : {profileData.posts_liked.length}</p> */}
    </div>
  );
};

export default Profile;
