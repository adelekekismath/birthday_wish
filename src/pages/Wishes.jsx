import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { db } from "../data/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { QUALITIES_WITH_DETAILS } from "../data/qualities";
import '../styles/Wishes.scss'


export default function Wishes() {
    const themeColors = {
        amical: "#ff8a65",
        familial: "#ff80ab",
        romantique: "#ff80ab"
    };

    const [searchParams, setSearchParams] = useSearchParams();
    const [celebrant, setCelebrant] = useState({});
    const firebaseDocRef = searchParams.get("id");
    const [celeBrantAge, setCelebrantAge] = useState(0);

    const calculateAge = (dob) => {
        const dateOfBirth = new Date(dob);
        return new Date().getFullYear() - dateOfBirth.getFullYear();
    }


    useEffect(() => {
        const fetchWishes = async () => {
            if (firebaseDocRef) {
                const docRef = doc(db, "birthdayWishes", firebaseDocRef);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setCelebrant(docSnap.data());
                    setCelebrantAge(calculateAge(docSnap.data().dateOfBirth));
                } else {
                    console.log("No such document!");
                }
            }
        };
        fetchWishes();
    }, []);


    return (
        celebrant && (
            <div 
                id="wishes" 
                className={`theme-${celebrant.theme}`} 
                style={{ backgroundColor: themeColors[celebrant.theme] }}
            >
                <div id="header">
                    <h1 id="bday-title">
                    Aujourd’hui, c’est un jour spécial… C’est l’anniversaire de  &nbsp; 
                        <span style={{ color: celebrant.favoriteColor }} className="celebrant-name">
                            {celebrant.receiverName}  ! 🎉🥳
                        </span>
                         🎉 
                    </h1>
                    <img 
                        id="bff-img" 
                        style={{ borderColor: celebrant.favoriteColor }} 
                        src={celebrant.photo}
                    />
                    <h2 
                        id="bday-age" 
                        style={{ backgroundColor: celebrant.favoriteColor }}
                    >
                        {celeBrantAge} ans
                    </h2>
                    <h4 
                        id="bday-date" 
                        style={{ backgroundColor: celebrant.favoriteColor }}
                    >
                        {celebrant.dateOfBirth}
                    </h4>
                </div>

                <div className="card">
                <div className="back"></div>
                <div className="front">
                    <div className="imgset">
                        <img width="100%" src="https://design-assets.adobeprojectm.com/content/download/express/public/urn:aaid:sc:VA6C2:219b4485-1ea5-5ecd-a94f-353f1dfc86e1/component?assetType=TEMPLATE&etag=30dcacb6b82041e6b9e23a2b6c46e9f6&revision=c16844ee-7b81-47eb-9e6f-396383c4b395&component_id=6af60343-29f6-430e-9201-712c126e9151"/>
                    </div>
                </div>
                <div className="text-container">
                    <p id="head">Happy Birthday {celebrant.receiverName}!</p>
                    <p>{celebrant.birthdayMessage}</p>
                    <p className="card-message-footer">De la part de {celebrant.senderName}</p>
                </div>
                </div>

                {/* <div className="card-message">
                    <h2 className="card-message-title">
                        Un petit message pour toi 💌
                    </h2>
                    <p className="card-message-content text-medium">
                        {celebrant.birthdayMessage}
                    </p>
                    <p className="card-message-footer">
                        De la part de {celebrant.senderName}
                    </p>
                </div> */}

                <div className="gift-section">
                    <h2 className="gift-title">
                        Voici à quel point je suis heureuse pour toi aujourd'hui 🥳
                    </h2>
                    <div 
                        className="gift-img" 
                        id="gift-img-happy" 
                        style={{ backgroundImage: `url('https://i.pinimg.com/originals/12/c8/00/12c800aaca044f40c1402d24b5dabfd8.gif')` }}
                    ></div>
                </div>


                {celebrant.qualities && Object.keys(QUALITIES_WITH_DETAILS).map((quality, index) => {
                    if (celebrant.qualities.includes(quality)) {
                        return (
                            <div key={index} className="gift-section">
                                <h2 className="gift-title">
                                    {QUALITIES_WITH_DETAILS[quality].phrase}
                                </h2>
                                <div 
                                    className="gift-img" 
                                    style={{ backgroundImage: `url(${QUALITIES_WITH_DETAILS[quality].gifUrl})`}}
                                ></div>
                            </div>
                        );
                    }
                })}

                <div className="gift-section">
                    <h2 className="gift-title">
                        À ta santé ! 🥂
                    </h2>
                    <div 
                        className="gift-img" 
                        id="gift-img-cheers" 
                        style={{ backgroundImage: `url('https://reactiongifs.me/wp-content/uploads/2022/10/Cheers-Leonardo-DiCaprio.gif')`}}
                    ></div>
                </div>
            </div>)
    );
}