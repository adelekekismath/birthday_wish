import React, { useEffect, useState } from "react";
import { db } from "../data/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import "../styles/SavedWishes.scss";

function SavedWishes() {
  const [wishes, setWishes] = useState([]);

  useEffect(() => {
    const fetchWishes = async () => {
      const savedWishes = JSON.parse(localStorage.getItem("savedWishes")) || [];
      const wishesData = await Promise.all(
        savedWishes.map(async (id) => {
          const docRef = doc(db, "birthdayWishes", id);
          const docSnap = await getDoc(docRef);
          return docSnap.exists() ? { id, ...docSnap.data() } : null;
        })
      );
      setWishes(wishesData.filter((wish) => wish !== null));
    };

    fetchWishes();
  }, []);

  return (
    <div className="saved-wishes-container">
      <h1>Vos Vœux d'Anniversaire Créés</h1>
      {wishes.length > 0 ? (
        <ul className="wishes-list">
          {wishes.map((wish) => (
            <li key={wish.id} className="wish-item">
              <h2>{wish.receiverName}</h2>
              <p>{wish.birthdayMessage}</p>
              <a href={`/wishes?id=${wish.id}`} target="_blank" rel="noopener noreferrer">
                Voir le vœu
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun vœu d'anniversaire créé pour le moment.</p>
      )}
    </div>
  );
}

export default SavedWishes;