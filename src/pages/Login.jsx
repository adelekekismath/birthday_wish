import React, { useState } from "react";
import { auth, googleProvider, facebookProvider } from "../data/firebaseConfig";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import Icon from "@mdi/react";
import { mdiFacebook } from "@mdi/js";
import { db } from "../data/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { getDoc } from "firebase/firestore";
import "../styles/Register.scss";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const getFriendlyErrorMessage = (errorCode) => {
        switch (errorCode) {
            case "auth/invalid-email":
                return "L'adresse e-mail est invalide.";
            case "auth/user-disabled":
                return "Ce compte utilisateur a été désactivé.";
            case "auth/user-not-found":
                return "Aucun utilisateur trouvé avec cette adresse e-mail.";
            case "auth/wrong-password":
                return "Le mot de passe est incorrect.";
            case "auth/invalid-credential":
                return "L'email ou le mot de passe est incorrect.";
            default:
                return "Une erreur est survenue. Veuillez réessayer.";
        }
    };


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, formData.email, formData.password);
            navigate("/dashboard");
        } catch (err) {
            setError(getFriendlyErrorMessage(err.code));
        }
    };


    const handleGoogleSignIn = async () => {
        try {
            const userCredential = await signInWithPopup(auth, googleProvider);
            const user = userCredential.user;
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (!userDoc.exists()) {
                await setDoc(doc(db, "users", user.uid), {
                    firstName: user.displayName.split(" ")[0],
                    lastName: user.displayName.split(" ")[1],
                    email: user.email,
                    password: user.password,
                });
            }

            navigate("/dashboard");
        } catch (err) {
            setError(err.message);
        }
    };

    const handleFacebookSignIn = async () => {
        try {
            const userCredential = await signInWithPopup(auth, facebookProvider);
            const user = userCredential.user;
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (!userDoc.exists()) {
                await setDoc(doc(db, "users", user.uid), {
                    firstName: user.displayName.split(" ")[0],
                    lastName: user.displayName.split(" ")[1],
                    email: user.email,
                    password: user.password,
                });
            }
            navigate("/dashboard");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="register-modal">
            {error && <p className="error">{error}</p>}
            <form className="auth-form" onSubmit={handleLogin}>
                <div className="overlay">

                <h3>Connexion</h3>

                <div className="form-wrapper">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-wrapper">
                    <label>Mot de passe</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Se connecter</button>
                <div className="form-footer">
                    Vous n'avez pas de compte ? <a href="/register">Inscrivez-vous</a>
                </div>

                <div className="line-divider"></div>

                <button
                    className="social-signin-btn google-btn"
                    onClick={handleGoogleSignIn}
                >
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/0/09/IOS_Google_icon.png"
                        alt="Google Logo"
                        className="google-icon"
                    />
                    Se connecter avec Google
                </button>

                <button
                    className="social-signin-btn facebook-btn"
                    onClick={handleFacebookSignIn}
                >
                    <Icon path={mdiFacebook} size={1} className="icon" />
                    Se connecter avec Facebook
                </button>

                </div>
                
            </form>
        </div>
    );
}
