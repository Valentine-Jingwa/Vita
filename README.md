# Vita Application
Vita is a comprehensive mobile application designed to empower users by simplifying the management of their medical information. By transforming user inputs into accessible graphical data, Vita makes it easier to monitor and understand various health metrics. This app is ideal for anyone seeking a user-friendly solution to track medical data, set reminders for health-related tasks, and visualize medical trends over time.

# Features
## Current Version (1.0)
User Account Management: Allows users to create and manage their profiles.
- **Data Input:** Users can enter and store medical data like blood pressure, glucose levels, etc.
- **Reminders:** Set reminders for health appointments and medication schedules.
- **Calendar View:** View inputted data in a user-friendly calendar format.
- **Interface Themes:** Choose between light and dark modes for personal preference.
- **Edit and Delete Functions:** Provides users with the ability to modify or remove their data.
## Future Developments (Version X)
- **Broad Medical Data Support:** Integration of more diverse types of medical data.
- **Enhanced Security:** Implementation of advanced security measures to protect user data.
Robust Data Validation: Ensuring the accuracy and reliability of the inputted data.
- **Automated Reminders:** Sophisticated reminder systems that prompt users based on their schedules.
- **Refined User Interface:** A more intuitive and smoother user interface experience.
- **Personalization Options:** Greater customization features for users to tailor the app to their needs.
- **AI-Driven Insights:** Use of Artificial Intelligence to analyze data and provide actionable insights.
- **Performance Improvements:** Enhanced algorithms for faster data retrieval and processing.
## Getting Started
### Prerequisites
__To set up and run Vita, you will need the following tools and technologies installed on your system:__

- **Node.js:** A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **npm:** A package manager for JavaScript, used to install packages and manage dependencies.
- **Expo CLI:** A command-line tool that helps you build Expo and React Native projects.
- **Android Studio or Expo Go:** For testing your application on Android or iOS devices.
- **MongoDB:** A NoSQL database used for storing your application data.
### Installation Guide
## **Step 1:** Clone the Repository
__First, obtain a copy of the project repository. You can do this by forking, cloning, or downloading the repository:__

**Copy code**
git clone  https://github.com/Valentine-Jingwa/Vita?tab=readme-ov-file
## **cd vita**
## **Step 2:** Install Dependencies
__Navigate to the project directory and install the necessary dependencies:__

__Copy code__
__npm install__
- **Step 3:** Install Expo CLI and Metro
__Expo CLI facilitates the development and testing of React Native applications:__

**Copy code**
- **npm install -g expo-cli**
Metro, the JavaScript bundler for React Native:

- **Copy code**
## **npm install -g metro**
## **Step 4: Setup MongoDB**
- **If you do not have MongoDB set up, you will need to install it and configure it for your application:**

- **Installation:** Follow the official MongoDB documentation to install MongoDB on your system.
- **Configuration:** Set up your database schemas based on the needs detailed in ./mongo/service/mongoDbService.
- **Connection:** Ensure your application is properly connected to MongoDB by adjusting the connection string in your .env.local file.
- **Step 5:** Setup Expo Application Services (EAS)
- **EAS helps manage and expedite the development process through cloud builds and other services:**

- **Installation:** Install EAS CLI globally using npm:

- **Copy code**
- **npm install -g eas-cli**
- **Login:** Connect to your Expo account (or create one if necessary):

- **Copy code**
- **eas login**
- **Configuration:** Configure eas.json as per your project requirements or use the default settings provided by Expo.
- **Builds:** Start building your app using EAS:

- **Copy code**
- **eas build --platform all**
- **Step 6:** Start the Application
- **Run the following command to start your Expo project:**


- **Copy code**
- ## **npx expo start**
A QR code will be displayed in your terminal. You can scan this with the Expo Go app on your mobile device or use an Android Studio emulator to run your application.

## Testing the Application
Ensure that all features work as expected. Test the application on different devices to check for compatibility and responsiveness. Use the debugging tools provided by Expo and Android Studio to diagnose and fix any issues.

## Contributing
We welcome contributions from the community. Please read our contributing guidelines before submitting pull requests or issues.

# License
## MIT License

**Copyright (c) [2024] Valentine Jingwa, Jean-Piere and Nicolas Gonsales**

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
