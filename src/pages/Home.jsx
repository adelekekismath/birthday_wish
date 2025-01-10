// filepath: /home/kismath/Workspace/birthday_wish/src/pages/Home.jsx
import React from "react";
import "../styles/home.scss";

function Home() {


  return (
    <div className="home-container">
        <div className="home-card">
            <h1 className="home-title">🎉 WishMaster 🎂</h1>
            <p className="home-description">Faites de leurs anniversaires un moment inoubliable ! 🎉</p>
            <p className="home-description">Créez des vœux d’anniversaire uniques et personnalisés en quelques clics. Offrez à vos proches une attention spéciale qui illuminera leur journée. Partagez votre création pour leur souhaiter un joyeux anniversaire de manière originale !</p>
            <p className="home-description">Commencez dès maintenant et créez un vœu mémorable. 🎂</p>
            <a href="/form" className="home-button">Créer un vœu</a>
        </div>
    </div>
  );
}

export default Home;