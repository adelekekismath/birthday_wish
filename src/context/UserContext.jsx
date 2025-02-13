import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../data/firebaseConfig"; // Import de Firebase Auth
import { onAuthStateChanged } from "firebase/auth";


const UserContext = createContext(null);

// Provider qui va englober l'application
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); 
    });

    return () => unsubscribe(); 
  }, []);

  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
}

// Hook personnalisé pour utiliser l'utilisateur partout dans l'ap
export function useUser() {
  return useContext(UserContext);
}
