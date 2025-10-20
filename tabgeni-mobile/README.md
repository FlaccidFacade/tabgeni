# 📱 Tabgeni Mobile - Android WebView App

This directory contains the Android mobile application for Tabgeni. The app is a lightweight WebView wrapper that loads [https://tabgeni.app](https://tabgeni.app) and enables users to access Tabgeni as a native Android app from the Google Play Store.

## 📋 Overview

- **Package Name**: `com.tabgeni.app`
- **Minimum SDK**: API 24 (Android 7.0)
- **Target SDK**: API 34 (Android 14)
- **Language**: Kotlin
- **Build System**: Gradle with Kotlin DSL

## 🚀 Features

- ✅ Full WebView implementation with JavaScript enabled
- ✅ HTTPS-only security (loads `https://tabgeni.app`)
- ✅ DOM storage and database enabled for web app functionality
- ✅ Responsive design with zoom controls
- ✅ Back button navigation within WebView
- ✅ Network security configuration
- ✅ ProGuard optimization for release builds

## 🛠️ Quick Start

### Prerequisites

- JDK 17 or higher
- Android SDK (optional for local development)
- Gradle 8.2+ (included via wrapper)

### Building the App

#### 1. Using the Setup Script (Recommended)

```bash
# From repository root
./scripts/setup.sh
```

This script will:
- Check for Java installation
- Build a debug APK
- Display the APK location

#### 2. Manual Build

```bash
cd tabgeni-mobile

# Build debug APK
./gradlew assembleDebug

# Build release APK (requires signing configuration)
./gradlew assembleRelease

# Build release AAB for Play Store
./gradlew bundleRelease
```

#### 3. Clean Build

```bash
cd tabgeni-mobile
./gradlew clean
./gradlew assembleDebug
```

### Installing the APK

```bash
# Install debug APK on connected device/emulator
adb install app/build/outputs/apk/debug/app-debug.apk

# Install release APK
adb install app/build/outputs/apk/release/app-release.apk
```

## 📦 Project Structure

```
tabgeni-mobile/
├── app/
│   ├── src/
│   │   └── main/
│   │       ├── java/com/tabgeni/app/
│   │       │   └── MainActivity.kt          # Main WebView activity
│   │       ├── res/
│   │       │   ├── layout/
│   │       │   │   └── activity_main.xml    # Layout with WebView
│   │       │   ├── values/
│   │       │   │   ├── strings.xml          # App name and strings
│   │       │   │   └── styles.xml           # App theme
│   │       │   ├── mipmap-*/                # App icons
│   │       │   └── xml/
│   │       │       └── network_security_config.xml
│   │       └── AndroidManifest.xml          # App manifest
│   ├── build.gradle.kts                     # App-level build config
│   └── proguard-rules.pro                   # ProGuard rules
├── fastlane/
│   ├── Appfile                              # Fastlane app config
│   └── Fastfile                             # Fastlane deployment lanes
├── gradle/
│   └── wrapper/                             # Gradle wrapper files
├── build.gradle.kts                         # Project-level build config
├── settings.gradle.kts                      # Gradle settings
├── gradlew                                  # Gradle wrapper script (Unix)
├── gradlew.bat                              # Gradle wrapper script (Windows)
└── Gemfile                                  # Ruby dependencies for Fastlane
```

## 🔐 Signing and Release

### Generating a Keystore

```bash
keytool -genkey -v -keystore release-keystore.jks \
  -alias tabgeni-key \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -storepass YOUR_STORE_PASSWORD \
  -keypass YOUR_KEY_PASSWORD
```

**Important**: Keep your keystore and passwords secure! Store them safely and never commit them to version control.

### Signing an APK Manually

Use the provided signing script:

```bash
./scripts/sign_apk.sh \
  app/build/outputs/apk/release/app-release-unsigned.apk \
  release-keystore.jks \
  tabgeni-key \
  app-release-signed.apk
```

### Signing via Gradle

```bash
./gradlew assembleRelease \
  -Pandroid.injected.signing.store.file=/path/to/release-keystore.jks \
  -Pandroid.injected.signing.store.password=YOUR_STORE_PASSWORD \
  -Pandroid.injected.signing.key.alias=tabgeni-key \
  -Pandroid.injected.signing.key.password=YOUR_KEY_PASSWORD
```

## 🚢 CI/CD with GitHub Actions

### Build Workflow (`.github/workflows/build.yml`)

Triggered on:
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches

Actions:
- Builds debug APK
- Uploads APK as artifact (7-day retention)

### Release Workflow (`.github/workflows/release.yml`)

Triggered on:
- Push of version tags (e.g., `v1.0.0`)

Actions:
- Decodes and uses signing keystore
- Builds signed release APK and AAB
- Deploys to Google Play Store (internal track)
- Creates GitHub release with APK
- Uploads artifacts (30-day retention)

### Required GitHub Secrets

Configure these secrets in your repository settings (`Settings > Secrets and variables > Actions`):

| Secret Name | Description |
|------------|-------------|
| `ANDROID_KEYSTORE_BASE64` | Base64-encoded keystore file |
| `KEYSTORE_PASSWORD` | Password for the keystore |
| `KEY_ALIAS` | Alias of the signing key |
| `KEY_PASSWORD` | Password for the signing key |
| `PLAY_STORE_JSON` | Google Play Store service account JSON |

#### Creating Base64-Encoded Keystore

```bash
base64 -i release-keystore.jks -o keystore-base64.txt
# Then copy contents of keystore-base64.txt to ANDROID_KEYSTORE_BASE64 secret
```

#### Creating Google Play Service Account

1. Go to [Google Play Console](https://play.google.com/console)
2. Navigate to **Setup > API access**
3. Create a new service account or link existing one
4. Grant necessary permissions (Release management, etc.)
5. Download the JSON key file
6. Copy the entire JSON content to `PLAY_STORE_JSON` secret

## 🎯 Fastlane Deployment

### Setup Fastlane

```bash
cd tabgeni-mobile

# Install Ruby dependencies
bundle install

# Ensure your Play Store credentials JSON is available
# It should be at: fastlane/play-store-credentials.json
```

### Deployment Lanes

```bash
# Deploy to internal track
bundle exec fastlane deploy_internal

# Deploy to production track
bundle exec fastlane deploy_production

# Build debug APK
bundle exec fastlane build_debug

# Build release APK
bundle exec fastlane build_release

# Build release AAB
bundle exec fastlane build_bundle
```

## 📱 Play Store Submission

### Prerequisites

1. **Google Play Developer Account** (one-time $25 fee)
2. **App created in Play Console** with package name `com.tabgeni.app`
3. **Service account** with API access
4. **Initial APK/AAB uploaded manually** (first upload must be manual)

### Manual Submission Steps

1. **Build signed AAB**:
   ```bash
   ./gradlew bundleRelease
   ```

2. **Log in to Google Play Console**

3. **Navigate to your app** > **Release** > **Production** (or Testing)

4. **Create new release**

5. **Upload AAB**: `app/build/outputs/bundle/release/app-release.aab`

6. **Fill in release notes**

7. **Review and rollout**

### Automated Submission

After the first manual upload, subsequent releases can be automated via GitHub Actions:

```bash
# Tag a new version
git tag v1.0.0
git push origin v1.0.0

# GitHub Actions will automatically:
# - Build signed release
# - Upload to Play Store internal track
# - Create GitHub release
```

## 🧪 Testing

### Testing on Physical Device

1. Enable **Developer Options** on your Android device
2. Enable **USB Debugging**
3. Connect device via USB
4. Verify connection: `adb devices`
5. Install APK: `adb install app/build/outputs/apk/debug/app-debug.apk`

### Testing on Emulator

1. Create an emulator via Android Studio or `avdmanager`
2. Start emulator: `emulator -avd <avd_name>`
3. Install APK: `adb install app/build/outputs/apk/debug/app-debug.apk`

### Testing Release Build Locally

1. Build release APK with signing
2. Install on device
3. Verify app loads `https://tabgeni.app` correctly
4. Test all web app features
5. Check back button navigation

## 🔧 Troubleshooting

### Gradle Build Fails

```bash
# Clear Gradle cache
./gradlew clean
rm -rf .gradle/
./gradlew assembleDebug --refresh-dependencies
```

### Keystore Issues

- Ensure keystore path is correct
- Verify passwords are correct
- Check key alias exists: `keytool -list -v -keystore release-keystore.jks`

### WebView Not Loading

- Check internet connection
- Verify `INTERNET` permission in `AndroidManifest.xml`
- Check network security config allows HTTPS
- Test URL in browser: `https://tabgeni.app`

### Fastlane Fails

```bash
# Update Fastlane and plugins
bundle update fastlane

# Check Play Store credentials
cat fastlane/play-store-credentials.json

# Verify service account has correct permissions
```

## 📖 Resources

- [Android Developer Documentation](https://developer.android.com/docs)
- [WebView Guide](https://developer.android.com/develop/ui/views/layout/webapps/webview)
- [Fastlane for Android](https://docs.fastlane.tools/getting-started/android/setup/)
- [Google Play Console](https://play.google.com/console)
- [Publishing Overview](https://developer.android.com/studio/publish)

## 📄 License

MIT License - See root repository LICENSE file

## 🤝 Contributing

Contributions are welcome! Please see the main repository README for guidelines.

---

**Need Help?** Open an issue in the repository or check the troubleshooting section above.
