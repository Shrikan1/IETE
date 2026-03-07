import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from '../firebase/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined); // undefined = still checking

  useEffect(() => {
    // onAuthStateChanged resolves async then calls callback once
    const unsub = onAuthStateChanged((u) => setUser(u ?? null));
    return unsub;
  }, []);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
