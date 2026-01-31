import React, { createContext, useContext, useEffect, useState } from 'react'
import endpoints from '../api/endpoints';
import axios from 'axios';

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [loading, setLoading] = useState(true);

    const getUser = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            setIsLoggedIn(false);
            setUser(null);
            setLoading(false);
            return;
        }

        try {
            const res = await axios.get(endpoints.getProfile, {
            headers: { Authorization: `Bearer ${token}` }
            });

            setUser(res.data.user);
            setIsLoggedIn(true);
        } catch {
            localStorage.removeItem('token');
            setUser(null);
            setIsLoggedIn(false);
        } finally {
            setLoading(false);
        }
    };


  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    console.log("UserState:", user);
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

export const useUser = () => useContext(UserContext);
