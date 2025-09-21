# GachaTown 🎮

A mobile app that uses Bluetooth beacons for indoor positioning and navigation.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/) (v8 or later)
- [Xcode](https://developer.apple.com/xcode/) (for iOS development)
- [Android Studio](https://developer.android.com/studio) (for Android development)
- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/) (`npm install -g expo-cli`)
- [eas-cli](https://docs.expo.dev/build/setup/) (`npm install -g eas-cli`)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/GachaTown.git
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

### Prerequisites for Development Builds

1. Install EAS CLI:

   ```bash
   npm install -g eas-cli
   ```

2. Log in to your Expo account:

   ```bash
   eas login
   ```

3. Configure your project:
   ```bash
   eas build:configure
   ```

### iOS Development Build

1. Register your Apple Developer account in Expo:

   ```bash
   eas credentials
   ```

2. Configure your iOS development team in `app.json`:

   ```json
   {
     "expo": {
       "ios": {
         "bundleIdentifier": "com.yourdomain.gachatown",
         "developmentTeam": "YOUR_TEAM_ID"
       }
     }
   }
   ```

3. Create a development build:

   ```bash
   eas build --profile development --platform ios
   ```

4. Install the development build:
   - Download the .ipa file from the EAS build page
   - Install using Xcode or Apple Configurator

### Android Development Build

1. Create a development build:

   ```bash
   eas build --profile development --platform android
   ```

2. Install the development build:
   - Download the .apk file from the EAS build page
   - Install on your Android device or emulator

## Required Permissions

### iOS

Add the following to your `app.json`:

```json
{
  "expo": {
    "ios": {
      "infoPlist": {
        "NSBluetoothAlwaysUsageDescription": "This app uses Bluetooth to connect to nearby beacons for indoor positioning.",
        "NSBluetoothPeripheralUsageDescription": "This app uses Bluetooth to connect to nearby beacons for indoor positioning.",
        "NSLocationWhenInUseUsageDescription": "This app needs access to location to determine your position relative to beacons.",
        "NSLocationAlwaysAndWhenInUseUsageDescription": "This app needs access to location to determine your position relative to beacons.",
        "NSLocationAlwaysUsageDescription": "This app needs access to location to determine your position relative to beacons.",
        "UIBackgroundModes": ["bluetooth-central", "location"]
      }
    }
  }
}
```

### Android

Add the following to your `app.json`:

```json
{
  "expo": {
    "android": {
      "permissions": [
        "BLUETOOTH",
        "BLUETOOTH_ADMIN",
        "ACCESS_COARSE_LOCATION",
        "ACCESS_FINE_LOCATION",
        "BLUETOOTH_SCAN",
        "BLUETOOTH_CONNECT"
      ]
    }
  }
}
```

## Deployment

### Production Build

1. Create a production build configuration:

   ```bash
   eas build:configure
   ```

2. Create production builds:

   ```bash
   # For iOS
   eas build --platform ios --profile production

   # For Android
   eas build --platform android --profile production
   ```

### App Store Deployment

1. Create an App Store Connect application
2. Configure your app's metadata and screenshots
3. Submit for review:
   ```bash
   eas submit --platform ios
   ```

### Google Play Store Deployment

1. Create a Google Play Console application
2. Configure your app's metadata and screenshots
3. Submit for review:
   ```bash
   eas submit --platform android
   ```

## Troubleshooting

### Common Issues

1. Bluetooth Permission Issues

   - Ensure all required permissions are properly configured in `app.json`
   - Check device settings to ensure Bluetooth is enabled
   - For iOS, verify that Location Services are enabled

2. Build Errors

   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall: `rm -rf node_modules && npm install`
   - Update Expo SDK: `expo upgrade`

3. Simulator/Emulator Issues
   - Reset simulator/emulator
   - Clear app data
   - Reinstall the development build

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
