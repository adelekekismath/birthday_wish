import React, { useState } from "react";
import axios from "axios";
import Icon from "@mdi/react";
import {
    mdiContentCopy,
    mdiArrowLeft,
    mdiInstagram,
    mdiWhatsapp,
    mdiSnapchat,
} from "@mdi/js";
import { db, storage } from "../data/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "../styles/BirthdayForm.scss";
import { QUALITIESLIST, QUALITIESICONSOBJECT } from "../data/qualities";

function Form() {
    const [qualitiesList] = useState(QUALITIESLIST);
    const [selectedImageUrl, setSelectedImageUrl] = useState("src/assets/images/avatar.jpg");
    const [celebrantImage, setCelebrantImage] = useState(null);
    const [link, setLink] = useState("");
    const [formData, setFormData] = useState({
        senderName: "",
        receiverName: "",
        dateOfBirth: "",
        photo: null,
        qualities: [],
        birthdayMessage: "",
        theme: "amical",
        senderEmail: "",
        favoriteColor: "#rrggbb",
    });

  const shareMessage = "🎉 Hey, viens voir ce vœu d'anniversaire génial que j'ai créé pour toi ! 🎂✨";

    const handleChangeInput = (e) => {
        const { name, value, checked } = e.target;
        setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: checked ? [...prevFormData.qualities, value] : value,
        }));
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          setSelectedImageUrl(URL.createObjectURL(file));
          setCelebrantImage(file);
        }
      };
    
      const handleUpload = async () => {
        if (!celebrantImage) return null;
    
        const formData = new FormData();
        formData.append("file", celebrantImage);
        formData.append("upload_preset", "birth_day_wishes");
    
        try {
          const response = await axios.post(
            "https://api.cloudinary.com/v1_1/dng0tnmki/image/upload",
            formData
          );
          return response.data.secure_url;
        } catch (error) {
          console.error("Error uploading image to Cloudinary: ", error);
          return null;
        }
      };

    const resetForm = () => {
        setFormData({
        senderName: "",
        receiverName: "",
        dateOfBirth: "",
        photo: null,
        qualities: [],
        birthdayMessage: "",
        theme: "amical",
        senderEmail: "",
        favoriteColor: "#rrggbb",
        });
        setLink("");
    };

    const copyLinkOnClipboard = () => {
        navigator.clipboard.writeText(link);
        alert("Lien copié !");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const celebrantPhotoUrl = await handleUpload();
            const docRef = await addDoc(collection(db, "birthdayWishes"), {
                ...formData,
                celebrantPhotoUrl,
            });
            setLink(`${window.location.origin}/wishes?id=${docRef.id}`);

            const savedWishes = JSON.parse(localStorage.getItem('savedWishes')) || [];
            savedWishes.push(docRef.id);
            localStorage.setItem('savedWishes', JSON.stringify(savedWishes));


        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    const today = new Date().toISOString().split("T")[0];


    

    return (
        <div className="form-container">
        {!link ? (
            <form onSubmit={handleSubmit} className="birthday-form">
            <h1 className="form-title">
                🎉 Créer un vœu d'anniversaire personnalisé 🎂
            </h1>
            <div className="birthday-inputs">
                <div className="birthday-colum-inputs border-right">
                <h2 className="form-subtitle">
                    🎈 Informations sur l'expéditeur
                </h2>
                <label className="form-label">
                    Votre prénom :
                    <input
                    type="text"
                    name="senderName"
                    value={formData.senderName}
                    onChange={handleChangeInput}
                    required
                    className="form-input"
                    />
                </label>
                <label className="form-label">
                    Votre email :
                    <input
                    type="email"
                    name="senderEmail"
                    value={formData.senderEmail}
                    onChange={handleChangeInput}
                    required
                    className="form-input"
                    />
                </label>
                <label className="form-label">
                    Thème :
                    <select
                    name="theme"
                    value={formData.theme}
                    onChange={handleChangeInput}
                    className="form-input"
                    >
                    <option value="amical">Amical</option>
                    <option value="romantique">Romantique</option>
                    <option value="familial">Familial</option>
                    </select>
                </label>
                <h2 className="form-subtitle">
                    🎈 Informations sur la star du jour
                </h2>
                <label className="form-label">
                    Son prénom :
                    <input
                    type="text"
                    name="receiverName"
                    value={formData.receiverName}
                    onChange={handleChangeInput}
                    required
                    className="form-input"
                    />
                </label>
                <label className="form-label">
                    Sa date de naissance :
                    <input
                    type="date"
                    name="dateOfBirth"
                    max={today}
                    value={formData.dateOfBirth}
                    onChange={handleChangeInput}
                    required
                    className="form-input"
                    />
                </label>
                <label className="form-label">
                    Sa couleur préférée :
                    <input
                    type="color"
                    name="favoriteColor"
                    value={formData.favoriteColor}
                    onChange={handleChangeInput}
                    className="form-input"
                    />
                </label>
                <label className="form-label">
                    Sa photo :
                    <div className="upload-container">
                        <div className="upload-preview">
                            {selectedImageUrl ? (
                            <img
                                src={selectedImageUrl}
                                alt="Preview"
                                className="image-preview"
                            />
                            ) : (
                            <p className="placeholder">No image selected</p>
                            )}
                        </div>
                        <label htmlFor="image-upload" className="custom-file-label">
                            <i className="fa fa-upload" aria-hidden="true"></i>
                        </label>
                        <input
                            type="file"
                            id="image-upload"
                            name="celebrantPhotoUrl"
                            accept="image/*"
                            className="form-input file-input"
                            onChange={handleImageChange}
                        />
                    </div>
                 
                </label>
                </div>
                <div className="birthday-colum-inputs">
                <fieldset className="qualities-fieldset checkbox-group">
                    <legend className="qualities-legend">💖 Ses qualités :</legend>
                    {qualitiesList.map((quality) => (
                    <label
                        key={quality}
                        className="qualities-label checkbox-wrapper"
                    >
                        <input
                        type="checkbox"
                        value={quality}
                        onChange={handleChangeInput}
                        name="qualities"
                        className="checkbox-input"
                        />
                        <span className="checkbox-tile">
                        <span className="checkbox-icon">
                            {QUALITIESICONSOBJECT[quality]}
                        </span>
                        <span className="checkbox-label">{quality}</span>
                        </span>
                    </label>
                    ))}
                </fieldset>
                <label htmlFor="birthday-message">
                    <textarea
                    placeholder="Ecrivez un vœu d'anniversaire."
                    id="birthday-message"
                    name="birthdayMessage"
                    rows="4"
                    value={formData.birthdayMessage}
                    onChange={handleChangeInput}
                    ></textarea>
                </label>
                </div>
            </div>
            <button type="submit" className="submit-button">
                🎁 Générer votre vœu
            </button>
            </form>
        ) : (
            <div className="link-container">
            <h1 className="form-title">
                🎉 Votre vœu d'anniversaire a été créé ! 🎂
            </h1>
            <p className="text-small">
                Partagez le lien ci-dessous avec vos amis pour qu'ils puissent
                découvrir votre vœu d'anniversaire personnalisé.
            </p>
            <div className="link-preview">
                <p className="text-small">
                Voici un aperçu de votre vœu d'anniversaire :
                </p>
                <iframe
                height={500}
                src={link}
                title="Birthday Wish"
                className="link-iframe"
                ></iframe>
            </div>
            <p className="link-display text-small">
                🎉 Votre lien :{" "}
                <a href={link} className="link" target="_blank" rel="noopener">
                {link}
                </a>
            </p>
            <button className="copy-button" onClick={copyLinkOnClipboard}>
                <Icon path={mdiContentCopy} size={1} /> Copier le lien
            </button>
            <button className="back-button" onClick={resetForm}>
                <Icon path={mdiArrowLeft} size={1} /> Retour
            </button>
            <div className="share-buttons">
                <a
                href={`https://www.instagram.com/?url=${encodeURIComponent(
                    link
                )}`}
                className="share-button instagram"
                target="_blank"
                rel="noopener noreferrer"
                >
                <Icon path={mdiInstagram} size={1} /> Instagram
                </a>
                <a
                href={`https://wa.me/?text=${encodeURIComponent(
                    shareMessage + " " + link
                )}`}
                className="share-button whatsapp"
                target="_blank"
                rel="noopener noreferrer"
                >
                <Icon path={mdiWhatsapp} size={1} /> WhatsApp
                </a>
                <a
                href={`https://www.snapchat.com/scan?attachmentUrl=${encodeURIComponent(
                    link
                )}`}
                className="share-button snapchat"
                target="_blank"
                rel="noopener noreferrer"
                >
                <Icon path={mdiSnapchat} size={1} /> Snapchat
                </a>
            </div>
            </div>
        )}
        </div>
    );
}

export default Form;
