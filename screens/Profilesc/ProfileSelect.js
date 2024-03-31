import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import profileStorage from '../../components/ProfileComp/profileKey';

export default function ProfileSelect() {
  const [profiles, setProfiles] = useState([]);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);

  useEffect(() => {
    const init = async () => {
      const loadedProfiles = await profileStorage.loadProfiles();
      setProfiles(Object.values(loadedProfiles)); // Convert object to array if necessary
    };

    init();
  }, []);
  
  // Handles swiping left to view the next profile
  const handleSwipeLeft = () => {
    setCurrentProfileIndex((prevIndex) => (prevIndex + 1) % profiles.length);
  };

  // Handles swiping right to view the previous profile
  const handleSwipeRight = () => {
    setCurrentProfileIndex((prevIndex) => (prevIndex - 1 + profiles.length) % profiles.length);
  };

  // Simple touch detection for swipe left/right - for demonstration
  const onTouchEnd = (e) => {
    if (e.nativeEvent.locationX > 150) { // Assuming a rightward swipe
      handleSwipeRight();
    } else { // Assuming a leftward swipe
      handleSwipeLeft();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {profiles.length > 0 && (
        <>
          <TouchableOpacity onPress={onTouchEnd} style={styles.profileImagePlaceholder}>
            <Image
              style={styles.profileImage}
              source={{ uri: profiles[currentProfileIndex].imageUri || '/path/to/default/image' }}
            />
          </TouchableOpacity>
          <Text style={styles.nameText}>{profiles[currentProfileIndex].username || 'Username'}</Text>
          <Text style={styles.ageText}>Age: {profiles[currentProfileIndex].age || 'Age'}</Text>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#000', // Placeholder color
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  ageText: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 20,
  },
});
