import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.scss";

function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        const savedWishes = JSON.parse(localStorage.getItem("savedWishes")) || [];
        if (savedWishes.length > 0) {
          navigate("/saved-wishes");
        }
      }, [navigate]);
    return (
        <div className="home-container">
            <div className="home-card">
                <h1 className="home-title">
                    🎉 BirthdayMaster 🎂
                </h1>
                <p className="home-description">
                    Faites de leurs anniversaires un moment inoubliable ! 🎉
                </p>
                <p className="home-description">
                    Créez des vœux d’anniversaire uniques et personnalisés en quelques clics.
                    Offrez à vos proches une attention spéciale qui illuminera leur journée. 
                    Partagez votre création pour leur souhaiter un joyeux anniversaire de manière originale !
                </p>
                <p className="home-description">
                    Commencez dès maintenant et créez un vœu mémorable. 🎂
                </p>
                <a href="/form" className="home-button">
                    Créer un vœu 
                </a>
            </div>
            
    
        </div>
    );
}

export default Home;