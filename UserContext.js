import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userIndex, setUserIndex] = useState(0); // Initialize user index here

    const selectUser = (user, index) => {
        setCurrentUser(user);
        setUserIndex(index); // Update index in context
    };

    return (
        <UserContext.Provider value={{ currentUser, userIndex, selectUser, setUserIndex }}>
            {children}
        </UserContext.Provider>
    );
};
