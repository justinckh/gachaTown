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
   - iOS: Install using Xcode or Apple Configurator
   - Android: Install the APK on your device

## Troubleshooting

### Common Issues

1. Build Errors

   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall: `rm -rf node_modules && npm install`
   - Update Expo SDK: `expo upgrade`

2. Simulator/Emulator Issues

   - Reset simulator/emulator
   - Clear app data
   - Reinstall the development build

3. Permission Issues
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

This project is licensed under the MIT License - see the LICENSE file for details.
