import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { loadProfiles } from '../../components/ProfileComp/profileKey';

export default function ProfileSelect() {
  const [profiles, setProfiles] = useState([]);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);

  // Load profiles from AsyncStorage on component mount
  useEffect(() => {
    const fetchProfiles = async () => {
      const loadedProfiles = await loadProfiles(); // This should be an array of profile objects
      setProfiles(loadedProfiles);
      // Optionally, set a specific profile as the current profile based on your logic
    };

    fetchProfiles();
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
      <TouchableOpacity onPress={onTouchEnd} style={styles.profileImagePlaceholder}>
        {profiles.length > 0 && (
          <Image
            style={styles.profileImage}
            source={{ uri: profiles[currentProfileIndex].imageUri || '/path/to/default/image' }}
          />
        )}
      </TouchableOpacity>
      {profiles.length > 0 && (
        <>
          <Text style={styles.nameText}>{profiles[currentProfileIndex].name || 'Name'}</Text>
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
