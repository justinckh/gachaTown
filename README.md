# GachaTown 🎮

A mobile app that uses Bluetooth beacons for indoor positioning and navigation.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/) (v8 or later)
- [Xcode](https://developer.android.com/studio) (for iOS development)
- [Android Studio](https://developer.android.com/studio) (for Android development)
- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/) (`npm install -g expo-cli`)
- [eas-cli](https://docs.expo.dev/build/setup/) (`npm install -g eas-cli`)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/justinckh/GachaTown.git
   cd GachaTown
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## iOS Development Setup

1. Apple Developer Account

   - Enroll in the [Apple Developer Program](https://developer.apple.com/programs/) (required for development on physical devices)
   - Sign in to your Apple Developer account in Xcode (Xcode → Preferences → Accounts)

2. Register Your Device

   - Connect your iOS device to your Mac
   - Open Xcode → Window → Devices and Simulators
   - Click the '+' button to register your device
   - Note your device's UDID (you'll need this for EAS)

3. Configure EAS for iOS Development

   ```bash
   # Log in to your Expo account
   eas login

   # Register your device with EAS
   eas device:create
   ```

## Local Development

1. Start the development server:

   ```bash
   npx expo start
   ```

2. Open the app:
   - Press `i` to open in iOS simulator
   - Press `a` to open in Android emulator
   - Scan the QR code with Expo Go app (iOS/Android) for testing on physical device

## Creating Development Builds

1. Install EAS CLI and log in:

   ```bash
   npm install -g eas-cli
   eas login
   ```

2. Create development builds:

   ```bash
   # For iOS
   eas build --profile development --platform ios

   # For Android
   eas build --profile development --platform android
   ```

3. Install the development build:
   - iOS:
     - Download the .ipa file from EAS
     - Install using Apple Configurator 2 or TestFlight
     - Note: The app must be signed with your development team and the device must be registered
   - Android:
     - Download and install the APK on your device

## Troubleshooting

### Common Issues

1. Build Errors

   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall: `rm -rf node_modules && npm install`
   - Update Expo SDK: `expo upgrade`

2. iOS Device Not Recognized

   - Ensure your device is registered in the Apple Developer portal
   - Verify your device UDID is correctly registered with EAS
   - Check that your Apple Developer account is active
   - Trust your developer certificate on your iOS device (Settings → General → Device Management)

3. Simulator/Emulator Issues

   - Reset simulator/emulator
   - Clear app data
   - Reinstall the development build

4. Permission Issues
   - Ensure Bluetooth is enabled on your device
   - Enable Location Services (required for Bluetooth scanning)
   - Grant necessary permissions when prompted by the app

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details
