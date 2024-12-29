// filepath: /home/kismath/Workspace/birthday_wish/src/pages/Home.jsx
import React from "react";
import { auth, googleProvider, facebookProvider } from "../data/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import "../styles/home.scss";

function Home() {
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log("Logged in with Google");

    } catch (error) {
      console.error("Error logging in with Google: ", error);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      await signInWithPopup(auth, facebookProvider);
      console.log("Logged in with Facebook");
    } catch (error) {
      console.error("Error logging in with Facebook: ", error);
    }
  };

  return (
    <div className="home-container">
        <div className="home-card">
            <h1 className="home-title">🎉 WishMaster 🎂</h1>
            <p className="home-description">Faites de leurs anniversaires un moment inoubliable ! 🎉</p>
            <p className="home-description">Créez des vœux d’anniversaire uniques et personnalisés en quelques clics. Offrez à vos proches une attention spéciale qui illuminera leur journée. Partagez votre création pour leur souhaiter un joyeux anniversaire de manière originale !</p>
            <p className="home-description">Commencez dès maintenant et créez un vœu mémorable. 🎂</p>
            <a href="/form" className="home-button">Créer un vœu</a>
            <p className="text-medium">Connectez-vous avec :</p>
            <button className="home-button" onClick={handleGoogleLogin}>Google</button>
            <button className="home-button" onClick={handleFacebookLogin}>Facebook</button>
        </div>
    </div>
  );
}

export default Home;