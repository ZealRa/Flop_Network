import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../atoms/userAtom";
import { useNavigate } from "react-router-dom";
import Post from "../components/Post"; // Assurez-vous d'importer le composant Post

const Profile = () => {
  const [user] = useAtom(userAtom);
  const [profileData, setProfileData] = useState(null);
  const [userPosts, setUserPosts] = useState([]); // État pour stocker les posts de l'utilisateur
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileAndPosts = async () => {
      const token = localStorage.getItem("jwt");

      if (token) {
        try {
          // Récupérer les données du profil
          const profileResponse = await fetch(
            "http://localhost:1337/api/users/me",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!profileResponse.ok) {
            throw new Error(
              "Erreur lors de la récupération des données du profil"
            );
          }

          const data = await profileResponse.json();
          setProfileData(data);

          // Récupérer les posts de l'utilisateur
          const postsResponse = await fetch(
            `http://localhost:1337/api/posts?filters[author][id]=${data.id}&populate=author`
          );

          if (!postsResponse.ok) {
            throw new Error(
              "Erreur lors de la récupération des posts de l'utilisateur"
            );
          }

          const postsData = await postsResponse.json();
          setUserPosts(postsData.data); // Stocker les posts dans l'état
        } catch (error) {
          console.error(error);
        }
      }
    };

    if (user) {
      fetchProfileAndPosts();
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

      <h3>Posts de {profileData.username}</h3>
      <div>
        {userPosts.length > 0 ? (
          userPosts.map((post) => <Post key={post.id} post={post} />)
        ) : (
          <p>Aucun post disponible.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
