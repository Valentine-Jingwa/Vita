import { View, Text } from "react-native";
import React, {useEffect, useState} from 'react';
import {onAuthStateChanged} from 'firebase/auth';

export default function useUserAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        console.log('user retrieved', user);
        if (user) {
            setUser(user);
        } else {
            setUser(null);
        }
    });

    return unsubscribe;
  }, []);

  return { user};
}