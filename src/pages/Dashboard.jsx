import React, { useEffect, useState, useCallback } from "react";
import { db } from "../data/firebaseConfig";
import { collection, query, where, getDocs, deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { useUser } from "../context/UserContext";
import {Icon } from "@mdi/react";
import { mdiEye, mdiUpdate, mdiDelete, mdiBell, mdiLink } from "@mdi/js";
import "../styles/Dashboard.scss";

function Dashboard() {
  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const navigate = useNavigate();

  const fetchWishes = useCallback(async () => {
    setLoading(true);
    try {
      if (user) {
        const q = query(collection(db, "birthdayWishes"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const wishesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setWishes(wishesData);
      } else {
        const savedWishes = JSON.parse(localStorage.getItem("savedWishes")) || [];
        const wishesData = await Promise.all(
          savedWishes.map(async (id) => {
            const docRef = doc(db, "birthdayWishes", id);
            const docSnap = await getDoc(docRef);
            return docSnap.exists() ? { id, ...docSnap.data() } : null;
          })
        );
        setWishes(wishesData.filter((wish) => wish !== null));
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des vœux :", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const handleEdit = (wish) => {
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

  const handleReminder = () => {
    console.log("Rappel automatique");
  };

    const handleCopy = (id) => {
        const url = `${window.location.origin}/wishes?id=${id}`;
        navigator.clipboard.writeText(url);
        alert("Lien copié dans le presse-papiers !");
    }

  return (
    <div className="dashboard-container">
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
                <img 
                    className="bff-img" 
                    style={{ borderColor: wish.favoriteColor }} 
                    src={wish.celebrantPhotoUrl}
                />
              <h2>{wish.receiverName}</h2>
              <p>{wish.birthdayMessage}</p>
              <div className="actions">
                <button className="action-btn view-btn" onClick={() => navigate(`/wishes/${wish.id}`)}> 
                    <Icon className="left" path={mdiEye} size={1} />
                    Voir
                </button>
                
                <button className="action-btn edit-btn" onClick={() => handleEdit(wish)}>
                    <Icon className="left" path={mdiUpdate} size={1} />
                    Modifier
                </button>
                
                <button className="action-btn delete-btn" onClick={() => handleDelete(wish.id)}>
                    <Icon className="left" path={mdiDelete} size={1} />
                    Supprimer
                </button>

                <button className="action-btn share-btn" onClick={() => handleCopy(wish.id)}>
                    <Icon className="left" path={mdiLink} size={1} />
                    Copier
                </button>

                <button className="action-btn automatic-reminder-btn" onClick={handleReminder}>
                    <Icon className="left" path={mdiBell} size={1} />
                    Rappel
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

export default Dashboard;