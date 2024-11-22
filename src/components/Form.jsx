import React, { useState } from "react";
import { db, storage } from "../data/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import "../styles/App.scss";

function Form() {
  const QUALITIESLIST = [
    "Drôle",
    "Gentil",
    "Intelligent",
    "Créatif",
    "Généreux",
    "Loyal",
    "Honnête",
    "Courageux",
    "Aventurier",
  ];
  const QUALITIESICONSOBJECT = {
    Drôle: "😂",
    Gentil: "🌸",
    Intelligent: "🧠",
    Créatif: "🎨",
    Généreux: "🎁",
    Loyal: "🔒",
    Honnête: "🤞",
    Courageux: "🦸",
    Aventurier: "🌍",
  };
  const [qualitiesList, setQualitiesList] = useState(QUALITIESLIST);
  const [selectedImageUrl, setSelectedImageUrl] = useState(
    "src/assets/images/avatar.jpg"
  );
  const [celebrantImage, setCelebrantImage] = useState(null);

  const [link, setLink] = useState("");

  const [formData, setFormData] = useState({
    senderName: "",
    name: "",
    dob: "",
    photo: null,
    qualities: [],
  });

  const handleChangeInput = (e) => {
    const { name, value, checked } = e.target;
    console.log(name);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: checked ? [...prevFormData.qualities, value] : value,
    }));
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImageUrl(URL.createObjectURL(file));
      setCelebrantImage(file);
    }
  };

  const handleUpload = async (file) => {
    if (!storage) return;

    if (!celebrantImage) return;

    const storageRef = ref(storage, `images/${celebrantImage.name}`);

    await uploadBytes(storageRef, celebrantImage);
    return await getDownloadURL(storageRef);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const photoUrl = handleUpload();

    const docRef = await addDoc(collection(db, "birthdayWishes"), {
      senderName: formData.senderName,
      name: formData.name,
      dob: formData.dob,
      photo: photoUrl,
      qualities: formData.qualities,
    });

    setLink(`/wishes/${docRef.id}`);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="birthday-form">
        <h1 className="form-title">
          🎉 Créer un Vœu d'Anniversaire Personnalisé 🎂
        </h1>
        <label htmlFor="" className="form-label">
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
        <label htmlFor="" className="form-label">
          Prénom de la star du jour :
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChangeInput}
            required
            className="form-input"
          />
        </label>
        <label className="form-label">
          Sa date de naissance :
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChangeInput}
            required
            className="form-input"
          />
        </label>
        <label className="form-label">
          Sa photo:
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
              name="photo"
              accept="image/*"
              className="form-input file-input"
              onChange={handleImageChange}
            />
          </div>
        </label>
        <fieldset className="qualities-fieldset checkbox-group">
          <legend className="qualities-legend">💖Ses qualités :</legend>
          {qualitiesList.map((quality) => (
            <label key={quality} className="qualities-label checkbox-wrapper">
              <input
                type="checkbox"
                value={formData.qualities}
                onChange={handleChangeInput}
                name="qualities"
                className="checkbox-input"
              />
              <span className="checkbox-tile">
                <span className="checkbox-icon">
                  {" "}
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
            id="text"
            name="text"
            rows="4"
          ></textarea>
        </label>

        <button type="submit" className="submit-button">
          🎁 Créer le Vœu
        </button>
      </form>
      {link && (
        <p className="link-display">
          🎉 Votre lien :{" "}
          <a href={link} className="link">
            {link}
          </a>
        </p>
      )}
    </div>
  );
}

export default Form;
