import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, Image } from 'react-native'; // Correct imports
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Adjust with the actual port and route
        // const url = '../../mongo/routes/authRoutes';
        const url = 'http://192.168.50.212:8081/profile/username'; // Replace with your actual IP and port

        const response = await axios.get(url);
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
  
    fetchProfile();
  }, []);
  

  if (!profile) return <Text>Loading...</Text>;

  return (
    <SafeAreaView>
      {profile.picture && <Image source={{ uri: profile.picture }} style={{ width: 100, height: 100 }} />}
      <Text>{profile.name}</Text>
      <Text>Age: {profile.age}</Text>
      <Text>Email: {profile.email}</Text>
    </SafeAreaView>
  );
};

export default Profile;
