import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";


import "../styles/Home.scss";



function Home() {
  const { user } = useUser();

  return (
    <div className="home-container">
      
      {/* Hero Section */}
      <div className="header">
        <div className="hero">
          <h1 className="hero-title">
            🎉 Créez des vœux d'anniversaire inoubliables ! 🎂
          </h1>
          <p className="hero-subtitle">
            Personnalisez vos vœux et envoyez-les à vos proches en quelques
            clics.
          </p>
          <div className="hero-buttons">
            
            { !user &&
            <Link to="/register" className="primary-button">
                Inscriver vous gratuitement
            </Link> }
            <Link to="/form" className="secondary-button">
                Créer un vœu 🎁
            </Link>
            

          </div>
        </div>

        {/* Features Section */}
        <div className="features">
          <div className="feature">
            <h2>🎨 100% Personnalisé</h2>
            <p>
              Ajoutez des photos, des messages uniques et choisissez un thème
              qui reflète votre affection.
            </p>
          </div>
          <div className="feature">
            <h2>💌 Partage Facile</h2>
            <p>
              Envoyez vos vœux par e-mail, WhatsApp ou partagez-les sur les
              réseaux sociaux.
            </p>
          </div>
          <div className="feature">
            <h2>📅 Rappels Automatiques</h2>
            <p>
              Ne manquez plus jamais un anniversaire grâce à nos notifications
              intelligentes.
            </p>
          </div>
        </div>

    
      </div>

      <div className="body">
        {/* Testimonials Section */}
        <div className="testimonials">
          <h2>Qu'en penses nos utilisateurs</h2>
          <figure className="snip1533">
            <figcaption>
              <blockquote>
                <p>
                  {" "}
                  Grâce à cette plateforme, j’ai pu envoyer des vœux mémorables
                  à mes amis !{" "}
                </p>
              </blockquote>
              <span>Wisteria R.</span>
            </figcaption>
          </figure> 
          <figure className="snip1533">
            <figcaption>
              <blockquote>
                <p>
                  {" "}
                  J’ai adoré la variété de thèmes disponibles pour personnaliser
                  mes vœux.{" "}
                </p>
              </blockquote>
              <span>Ursula G.</span>
            </figcaption>
          </figure>
          <figure className="snip1533">
            <figcaption>
              <blockquote>
                <p>
                  {" "}
                  Les rappels automatiques m’ont sauvé la vie plus d’une fois !{" "}
                </p>
              </blockquote>
              <span>Amelie N. </span>
            </figcaption>
          </figure>
        </div>

        {/* FAQ Section */}
        <div className="faq">
          <div className="responsive-container-block bigContainer">
            <div className="responsive-container-block Container">
              <p className="text-blk heading">Questions Fréquentes</p>
              <p className="text-blk subHeading">
                Voici quelques réponses aux questions les plus fréquemment
                posées par nos utilisateurs.
              </p>
              <div className="responsive-container-block allCardContainer">
                <div className="responsive-cell-block wk-desk-6 wk-ipadp-12 wk-tab-12 wk-mobile-12">
                  <div className="card">
                    <p className="text-blk cardHeading">
                      Comment fonctionne la création de vœux ?
                    </p>
                    <p className="text-blk cardSubHeading">
                      Il vous suffit de remplir un formulaire simple avec les
                      détails de votre message et de choisir un design.
                    </p>
                    <div className="lineDivider"></div>
                  </div>
                </div>
                <div className="responsive-cell-block wk-desk-6 wk-ipadp-12 wk-tab-12 wk-mobile-12">
                  <div className="card">
                    <p className="text-blk cardHeading">
                      Est-ce que c'est vraiment gratuit ?
                    </p>
                    <p className="text-blk cardSubHeading">
                      Oui ! Vous pouvez créer et envoyer des vœux gratuitement,
                      avec une option Premium pour plus de personnalisation.
                    </p>

                    <div className="lineDivider"></div>
                  </div>
                </div>
                <div className="responsive-cell-block wk-desk-6 wk-ipadp-12 wk-tab-12 wk-mobile-12">
                  <div className="card">
                    <p className="text-blk cardHeading">
                      Comment puis-je envoyer mes vœux ?
                    </p>
                    <p className="text-blk cardSubHeading">
                      Vous pouvez envoyer vos vœux par e-mail, WhatsApp ou les
                      partager sur les réseaux sociaux.
                    </p>
                    <div className="lineDivider"></div>
                  </div>
                </div>
                <div className="responsive-cell-block wk-desk-6 wk-ipadp-12 wk-tab-12 wk-mobile-12">
                  <div className="card">
                    <p className="text-blk cardHeading">
                      Puis-je personnaliser mes vœux ?
                    </p>
                    <p className="text-blk cardSubHeading">
                      Oui ! Vous pouvez ajouter des photos, des messages et
                      choisir un thème pour personnaliser vos vœux.
                    </p>
                    <div className="lineDivider"></div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="contact">
        <h2>Contactez-nous</h2>
        <div className="contact-card">
        <p>Une question ? Un bug à signaler ? N'hésitez pas à nous contacter !</p>
        <a href="mailto:adelekekismath9@gmail.com" className="contact-button">
          Envoyer un e-mail
        </a>
        </div>
      </div>

      
    </div>
  );
}

export default Home;
