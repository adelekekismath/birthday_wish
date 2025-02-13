import React from "react";
import "../styles/About.scss";

export default function About() {
  return (
    <div className="about-section">
      <div className="about-content">
        <div className="about-text">
          <h1>
            <span className="highlight">À propos</span> de Festivo
          </h1>
          <p>
            Festivo est une application web qui vous permet de créer des vœux d'anniversaire personnalisés pour vos proches.
          </p>
          <p>
            Ajoutez des photos, choisissez des couleurs et des thèmes festifs pour rendre vos vœux uniques.
            Partagez-les facilement via e-mail, WhatsApp ou sur les réseaux sociaux !
          </p>
          <a href="#" className="cta-button">Créer mon vœu 🎉</a>
        </div>

        <div className="about-services">
          <h2>Ce que vous pouvez faire 🎨</h2>
          <div className="service-item">
            <span className="icon">🎂</span>
            <div>
              <h3>Créer un vœu</h3>
              <p>Personnalisez vos vœux avec du texte, des images et des couleurs.</p>
            </div>
          </div>
          <div className="service-item">
            <span className="icon">📨</span>
            <div>
              <h3>Envoyer facilement</h3>
              <p>Partagez votre vœu par e-mail, WhatsApp ou sur les réseaux sociaux.</p>
            </div>
          </div>
          <div className="service-item">
            <span className="icon">💎</span>
            <div>
              <h3>Mode Premium</h3>
              <p>Débloquez plus d’options pour personnaliser encore plus vos vœux.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
