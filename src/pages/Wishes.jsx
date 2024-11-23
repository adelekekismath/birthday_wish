import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { db, storage } from "../data/firebaseConfig";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import QUALITIES_WITH_DETAILS from "../data/qualities";



export default function Wishes() {
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
                const docSnap = await getDoc(docRef) ;
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
        <div id="wishes">
        <div id="header">
            <h1>Today is {celebrant.name}'s birthday 🎉 </h1>
            <img id="bff-img" src={celebrant.celebrantPhotoUrl}/>
            <h2 id="bday-age">{celeBrantAge} years old</h2>
            <h4 id="bday-date">{celebrant.dateOfBirth}</h4>
        </div>
        
        <div className="gift-section">
            <h2 className="gift-title">Here's how happy I am for you today 🥳</h2>
            <div className="gift-img" id="gift-img-happy" style={{backgroundImage: `url('https://i.pinimg.com/originals/12/c8/00/12c800aaca044f40c1402d24b5dabfd8.gif')`}}></div>
        </div>

        {celebrant.qualities && Object.keys(QUALITIES_WITH_DETAILS).map((quality) => {
            if (celebrant.qualities.includes(quality)) {
                return (
                    <div className="gift-section">
                        <h2 className="gift-title">{QUALITIES_WITH_DETAILS[quality].phrase}</h2>
                        <div className="gift-img" style={{backgroundImage: `url(${QUALITIES_WITH_DETAILS[quality].gifUrl})`}}></div>
                    </div>
                );
            }
        })}
        
         <div className="gift-section">
            <h2 className="gift-title">This one's for you, my friend 🥂</h2>
            <div className="gift-img" id="gift-img-cheers" style={{backgroundImage: `url('https://reactiongifs.me/wp-content/uploads/2022/10/Cheers-Leonardo-DiCaprio.gif')`}}></div>
        </div>
        
        <p id="footer">Want to create your own Birthday GIFt site? Take <a href="https://scrimba.com/learn/htmlandcss" target="_blank">this HTML & CSS course.</a></p>
        
        </div>)
    );
    }