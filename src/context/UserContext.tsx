import { createContext, useEffect, useState, ReactNode } from "react";

interface User {
  name: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  ready: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserContextProviderProps {
  children: ReactNode;
}

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      fetch('http://localhost:3000/api/profile', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`,
        },
      })
        .then(response => response.json())
        .then(res => {
          setUser(res.data);
          setReady(true);
        })
        .catch(err => {
          console.error("Failed to fetch profile:", err);
          setReady(true);  // Even if the request fails, we should stop the loading state.
        });
    } else {
      setReady(true); // If there's no token, we can consider the app "ready" without loading user data.
    }
  }, [token]);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
