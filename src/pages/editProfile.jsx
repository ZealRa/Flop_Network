import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { userAtom } from "../atoms/userAtom";

const EditProfile = () => {
  const [user, setUser] = useAtom(userAtom);
  const [username, setUsername] = useState(user?.username || "");
  const [description, setDescription] = useState(user?.description || "");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwt");

    if (!token) {
      setErrorMessage("Vous devez être connecté pour modifier votre profil.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:1337/api/users-permissions/users/me",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ username, description }),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour du profil.");
      }

      const updatedUser = await response.json();
      setUser(updatedUser); // Met à jour l'utilisateur dans l'état global
      setSuccessMessage("Profil mis à jour avec succès !");
      setErrorMessage("");
    } catch (error) {
      console.error(error);
      setErrorMessage(
        "Une erreur est survenue lors de la mise à jour du profil."
      );
      setSuccessMessage("");
    }
  };

  return (
    <div>
      <h2>Modifier le Profil</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Nom d'utilisateur :</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description :</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Enregistrer les modifications</button>
      </form>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default EditProfile;
