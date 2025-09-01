# Android Permissions Setup for Bluetooth BLE

Add the following permissions to your `android/app/src/main/AndroidManifest.xml` file inside the `<manifest>` tag:

```xml
<!-- Bluetooth permissions for API level < 31 -->
<uses-permission android:name="android.permission.BLUETOOTH" />
<uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />

<!-- Bluetooth permissions for API level >= 31 -->
<uses-permission android:name="android.permission.BLUETOOTH_SCAN" android:usesPermissionFlags="neverForLocation" />
<uses-permission android:name="android.permission.BLUETOOTH_CONNECT" />

<!-- Location permission (required for BLE scanning) -->
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />

<!-- Optional: if you don't need location for BLE -->
<uses-permission android:name="android.permission.BLUETOOTH_SCAN" tools:targetApi="s" android:usesPermissionFlags="neverForLocation" />
```

## iOS Setup

Add to your `ios/YourApp/Info.plist`:

```xml
<key>NSBluetoothAlwaysUsageDescription</key>
<string>This app needs access to Bluetooth to connect to nearby devices.</string>
<key>NSBluetoothPeripheralUsageDescription</key>
<string>This app needs access to Bluetooth to connect to nearby devices.</string>
```

## Usage

The `useBLE` hook automatically handles runtime permission requests for both Android and iOS platforms.
