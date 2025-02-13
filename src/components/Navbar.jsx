import React from "react";
import "../styles/Home.scss";
import Icon from '@mdi/react';
import { mdiHome, mdiPartyPopper, mdiInformation, mdiLogin,mdiLogout } from '@mdi/js';
import {useUser } from "../context/UserContext";
import { signOut } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Navbar() {

  const { user } = useUser();
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };
  return (
    <nav className="navbar">
      <div className="logo">Festivo</div>
      <ul className="nav-links">
        <li>
          <a href="/">
            <Icon className="icon" path={mdiHome} size={1} />
            <span className="hide-text-on-mobile">Accueil</span>
          </a>
        </li>
       
        <li>
            <Link to="/about"> 
                <Icon className="icon" path={mdiInformation} size={1} />
                <span className="hide-text-on-mobile">À propos</span>
            </Link>
        </li>

        { user &&
        <li>
            <Link to="/dashboard"> 
                <Icon className="icon" path={mdiPartyPopper} size={1} />
                <span className="hide-text-on-mobile">Mes voeux </span>
            </Link>
        </li> }
        <li>
        {!user ? (
          <a href="/login" className="login-button">
            <Icon className="icon" path={mdiLogin} size={1} />
            <span className="hide-text-on-mobile">Connexion</span>
          </a>
        ) : (
            <a href="#" className="login-button" onClick={handleLogout}>
                <Icon className="icon" path={mdiLogout} size={1} />
                <span onClick={handleLogout} className="hide-text-on-mobile">Déconnexion</span>
            </a>
        )}
        </li>
      </ul>
    </nav>
  );
}
