import React, { useState } from "react";
import { auth, googleProvider } from "../data/firebaseConfig";
import { signInWithPopup, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Icon from "@mdi/react";
import { mdiGoogle, mdiFacebook } from "@mdi/js";
import { sendEmailVerification } from "firebase/auth";
import { db } from "../data/firebaseConfig"; // Import Firestore
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate } from "react-router-dom";
import "../styles/Register.scss";
import { use } from "react";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const  navigate = useNavigate();

  // Gestion des inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Inscription avec email/mot de passe
  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // 2️⃣ Mise à jour du profil avec nom & prénom
      await updateProfile(user, {
        displayName: `${formData.firstName} ${formData.lastName}`,
      });
      await setDoc(doc(db, "users", user.uid), {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        createdAt: new Date()
      });
      await sendEmailVerification(user);
        alert("Un email de vérification a été envoyé. Veuillez vérifier votre boîte mail.");

        navigate("/dashboard");
       
    } catch (err) {
      setError(err.message);
    }
  };

  // Connexion avec Google
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      useNavigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFacebookSignIn = () => {};

  return (
    <div className="register-modal">

        
        <form className="auth-form" onSubmit={handleRegister}>
        <div className="overlay">
            <h3>Inscription</h3>
            {error && <p className="error">{error}</p>}
            <div className="form-group">
            <div className="form-wrapper">
                <label>Prénom</label>
                <input
                type="text"
                name="firstName"
                className="form-control"
                onChange={handleChange}
                required
                />
            </div>
            <div className="form-wrapper">
                <label>Nom</label>
                <input
                type="text"
                name="lastName"
                className="form-control"
                onChange={handleChange}
                required
                />
            </div>
            </div>
            <div className="form-wrapper">
            <label>Email</label>
            <input
                type="email"
                name="email"
                className="form-control"
                onChange={handleChange}
                required
            />
            </div>
            <div className="form-wrapper">
            <label>Mot de passe</label>
            <input
                type="password"
                name="password"
                className="form-control"
                onChange={handleChange}
                required
            />
            </div>
            <div className="form-wrapper">
            <label>Confirmer le mot de passe</label>
            <input
                type="password"
                name="confirmPassword"
                className="form-control"
                onChange={handleChange}
                required
            />
            </div>
            <button type="submit">S'inscrire</button>
            <div className="form-footer">
            Vous avez déjà un compte ? <a href="/login">Connectez-vous</a>
            </div>

            <div className="line-divider"></div>

            {/* Boutons d'inscription avec Google et Facebook */}
            <button
            className="social-signin-btn google-btn"
            onClick={handleGoogleSignIn}
            >
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/09/IOS_Google_icon.png"
                alt="Google Logo"
                className="google-icon"
            />
            S'inscrire avec Google
            </button>

            <button
            className="social-signin-btn facebook-btn"
            onClick={handleFacebookSignIn}
            >
            <Icon path={mdiFacebook} size={1} className="icon" />
            S'inscrire avec Facebook
            </button>
        </div>
        </form> 

    </div>
  );
}
