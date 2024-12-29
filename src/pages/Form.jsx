import React, { useState } from "react";
import Icon from "@mdi/react";
import { mdiContentCopy } from "@mdi/js";
import { db, storage } from "../data/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import '../styles/BirthdayForm.scss'
import { QUALITIESLIST, QUALITIESICONSOBJECT } from "../data/qualities";


function Form() {
  const [qualitiesList, setQualitiesList] = useState(QUALITIESLIST);
  const [selectedImageUrl, setSelectedImageUrl] = useState(
    "src/assets/images/avatar.jpg"
  );

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

  const handleChangeInput = (e) => {
    const { name, value, checked } = e.target;
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

  const handleUpload = async () => {
    if (!storage) return;

    if (!celebrantImage) return;

    const storageRef = ref(storage, `images/${celebrantImage.name}`);
    console.log(storageRef);

    await uploadBytes(storageRef, celebrantImage);

    return await getDownloadURL(storageRef);
  };

  const resetForm = () => {
    setFormData({
        name: "",
        dateOfBirth: "",
        celebrantPhotoUrl: null,
        qualities: [],
        birthdayMessage: "",
        theme: "amical",
        senderEmail: "",
        favoriteColor: "#rrggbb",
        senderName: "",
        receiverName: ""
    });
    setLink("");
  };

  const copyLinkOnClipboard = () => {
    navigator.clipboard.writeText(link);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const celebrantPhotoUrl = await handleUpload();

      const docRef = await addDoc(collection(db, "birthdayWishes"), {
        senderName: formData.senderName,
        receiverName: formData.receiverName,
        dateOfBirth: formData.dateOfBirth,
        celebrantPhotoUrl: celebrantPhotoUrl,
        qualities: formData.qualities,
        birthdayMessage: formData.birthdayMessage,
        theme: formData.theme,
        senderEmail: formData.senderEmail,
        favoriteColor: formData.favoriteColor,

      });

      console.log("Document written with ID: ", docRef.id);
      setLink(`${window.location.origin}/wishes?id=${docRef.id}`);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="form-container">
      {!link ? (
        <form onSubmit={handleSubmit} className="birthday-form">
          <div>
            <h1 className="form-title">
              🎉 Créer un vœu d'anniversaire personnalisé 🎂
            </h1>
            <div className="birthday-inputs ">
              <div className="birthday-colum-inputs border-right">
                <h2 className="form-subtitle">🎈 Informations sur l'expéditeur</h2>
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

                <h2 className="form-subtitle">🎈 Informations sur la star  du jour  </h2>

                <label htmlFor="" className="form-label">
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
                  <legend className="qualities-legend">💖Ses qualités :</legend>
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
                    id="birthday-message"
                    name="birthdayMessage"
                    rows="4"
                    value={formData.birthdayMessage}
                    onChange={handleChangeInput}
                  ></textarea>
                </label>
              </div>
            </div>
          </div>

          <button type="submit" className="submit-button">
            🎁 Générer votre vœu
          </button>
        </form>
      ) : (
        <div className="link-container">
          <p className="link-display">
            🎉 Votre lien :{" "}
            <a href={link} className="link" target="_blank" rel="noopener">
              {link}
            </a>
          </p>
          <button
            className="copy-button"
            onClick={copyLinkOnClipboard}
          >
            <Icon path={mdiContentCopy} size={1} />
          </button>
          <button className="back-button" onClick={resetForm}>
            Retour
          </button>
        </div>
      )}
    </div>
  );
}

export default Form;
