import React, { useRef, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { Button, Icon, Layout } from '@ui-kitten/components';

export default function Home() {
  const pulseIconRef = useRef();

  useEffect(() => {
    pulseIconRef.current.startAnimation();
  }, []);

  const renderPulseIcon = (props) => (
    <Icon
      {...props}
      ref={pulseIconRef}
      animation='pulse'
      name='activity'
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        style={styles.button}
        accessoryLeft={renderPulseIcon}
        onPress={() => pulseIconRef.current.startAnimation()}
      >
        PULSE
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    margin: 8,
  },
});