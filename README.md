# Vita Application

**Vita** is a comprehensive mobile application designed to empower users by simplifying the management of their medical information. By transforming user inputs into accessible graphical data, Vita makes it easier to monitor and understand various health metrics. This app is ideal for anyone seeking a user-friendly solution to track medical data, set reminders for health-related tasks, and visualize medical trends over time.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation Guide](#installation-guide)
- [Usage](#usage)
- [Testing the Application](#testing-the-application)
- [Contributing](#contributing)
- [License](#license)

## Features

### Current Version (1.0)
- **User Account Management:** Manage user profiles.
- **Data Input:** Enter and store key medical data.
- **Reminders:** Set reminders for health tasks.
- **Calendar View:** Display data in a calendar.
- **Interface Themes:** Switch between themes.
- **Edit and Delete Functions:** Modify or remove data.

### Future Developments (Version X)
- **Broad Medical Data Support**
- **Enhanced Security**
- **Robust Data Validation**
- **Automated Reminders**
- **Refined User Interface**
- **Personalization Options**
- **AI-Driven Insights**
- **Performance Improvements**

## Getting Started

### Prerequisites
Ensure you have the following installed:
- **Node.js:** JavaScript runtime (https://nodejs.org/)
- **npm:** JavaScript package manager (https://npmjs.com/)
- **Expo CLI:** Tool for creating React Native apps (https://expo.dev/tools#cli)
- **Android Studio or Expo Go:** For app testing (https://developer.android.com/studio)

### Installation Guide

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Valentine-Jingwa/Vita
   cd vita
   ```
2. **Install Dependencies**
   ```bash
   npm install
   ```
3. **Install Expo CLI and Metro**
```bash
npm install -g expo-cli
npm install -g metro
```

4. **Setup MongoDB**
- Follow MongoDB installation guides, then configure and connect:
- Install MongoDB
- Configure schemas in ./mongo/service/mongoDbService
- Set the connection string in .env.local

5. **Setup Expo Application Services (EAS)**
```bash
npm install -g eas-cli
eas login
eas build --platform all
  ```
6. **Start the Application**
```bash
npx expo start
```
- Scan the QR code with Expo Go or use an Android Studio emulator.

## Usage

**Get Started with Vita**

After installation, perform the following steps to start utilizing Vita:

1. **Open the App**
   - Launch Vita on your device.
   
2. **Register an Account**
   - Follow the on-screen instructions to create a new user account.

3. **Enter Health Data**
   - Input your medical information such as blood pressure, glucose levels, and more.

4. **Use Calendar View**
   - Navigate to the calendar to view entries or add new data.

5. **Set Reminders**
   - Easily set reminders for health appointments and medication schedules to ensure you never miss them.

Explore the intuitive interface to fully harness the capabilities of Vita in managing your health data.

## Testing the Application

**Ensuring Quality and Compatibility**

To maintain the highest standards of quality and ensure smooth performance across all devices:

1. **Regular Testing**
   - Test the app on different hardware and OS versions to check compatibility.

2. **Use Debugging Tools**
   - Employ Expo and Android Studio's debugging tools to track down and solve any issues that arise.

3. **Feedback Loop**
   - Encourage users to report any problems they encounter, and use this feedback to make improvements.

## Contributing

**Join the Vita Development Team**

We are excited to collaborate with talented developers and enthusiasts in our community. If you're looking to contribute, please:

1. **Read Our Guidelines**
   - Familiarize yourself with the contributing guidelines.

2. **Submit Patches**
   - Enhancements and fixes are always welcome. Please submit your patches for review.

3. **Propose Features**
   - Have a great idea? Let us know!

Your contributions help make Vita a better tool for everyone!

## Vita WebSite for Download

https://vita-web-wine.vercel.app/

## Vita WebSite GitHub Repo 

https://github.com/nicoatsait/vita_web

## License

**MIT License**

```plaintext
Copyright (c) [2024] Valentine Jingwa, Jean-Piere and Nicholas Gonzalez

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

