import React, { useEffect, useState, useCallback } from "react";
import { db } from "../data/firebaseConfig";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../styles/SavedWishes.scss";

function SavedWishes() {
  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchWishes = useCallback(async () => {
    setLoading(true);
    try {
      const savedWishes = JSON.parse(localStorage.getItem("savedWishes")) || [];
      const wishesData = await Promise.all(
        savedWishes.map(async (id) => {
          const docRef = doc(db, "birthdayWishes", id);
          const docSnap = await getDoc(docRef);
          return docSnap.exists() ? { id, ...docSnap.data() } : null;
        })
      );
      setWishes(wishesData.filter((wish) => wish !== null));
    } catch (error) {
      console.error("Erreur lors de la récupération des vœux :", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleEdit = (wish) => {
    console.log("wish", wish);
    navigate("/form", { state: { wish: wish } });
  };

  useEffect(() => {
    fetchWishes();
  }, [fetchWishes]);

  const handleDelete = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce vœu ?")) return;
    try {
      await deleteDoc(doc(db, "birthdayWishes", id));
      const updatedWishes = wishes.filter((wish) => wish.id !== id);
      setWishes(updatedWishes);
      localStorage.setItem(
        "savedWishes",
        JSON.stringify(updatedWishes.map((wish) => wish.id))
      );
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  const handleCreateNew = () => {
    navigate("/form");
  };

  return (
    <div className="saved-wishes-container">
      <h1>Gérer vos vœux d'anniversaire</h1>

      <button className="create-btn" onClick={handleCreateNew}>
        🎉 Créer un nouveau vœu
      </button>

      {loading ? (
        <p>Chargement des vœux...</p>
      ) : wishes.length > 0 ? (
        <ul className="wishes-list">
          {wishes.map((wish) => (
            <li key={wish.id} className="wish-item">
              <h2>{wish.receiverName}</h2>
              <p>{wish.birthdayMessage}</p>
              <div className="actions">
                <a
                  href={`/wishes?id=${wish.id}`}
                  className="view-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Voir
                </a>
                <button className="edit-btn" onClick={() => handleEdit(wish)}>
                  Modifier
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(wish.id)}
                >
                  Supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p> Aucun vœu d'anniversaire créé pour le moment. </p>
      )}
    </div>
  );
}

export default SavedWishes;
