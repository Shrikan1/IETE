import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from '../supabase/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined); // undefined = still checking

  useEffect(() => {
    console.log("AuthProvider: Initializing...");
    const unsub = onAuthStateChanged((u) => {
      console.log("AuthProvider: Auth state changed:", u ? u.email : "No user");
      setUser(u || null);
    });
    return unsub;
  }, []);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
