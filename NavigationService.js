// navigationService.js
import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export function resetToWelcome() {
  console.log("Attempting to reset navigation to Welcome");
  if (navigationRef.isReady()) {
    console.log("Navigation ref is ready, resetting...");
    navigationRef.reset({
      index: 0,
      routes: [{ name: 'Welcome' }],
    });
  }
}