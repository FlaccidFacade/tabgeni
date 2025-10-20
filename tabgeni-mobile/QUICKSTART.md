# 🚀 Quick Start Guide - Tabgeni Android

Get the Tabgeni Android app up and running in 5 minutes!

## For End Users

### Download from Play Store (Coming Soon)

Once published, you'll be able to download Tabgeni directly from the Google Play Store by searching for "Tabgeni".

### Install APK Manually

If you have an APK file:

1. **Enable Unknown Sources**
   - Go to Settings → Security
   - Enable "Unknown sources" or "Install unknown apps"

2. **Install the APK**
   - Transfer the APK to your device
   - Tap the APK file
   - Tap "Install"

3. **Launch**
   - Find Tabgeni in your app drawer
   - Tap to open

## For Developers

### Prerequisites Check

Run the environment checker:

```bash
./scripts/check_environment.sh
```

This will verify you have:
- Java 17+
- Gradle wrapper
- Android SDK (optional)

### Build in 3 Steps

```bash
# 1. Navigate to mobile directory
cd tabgeni-mobile

# 2. Build debug APK
./gradlew assembleDebug

# 3. Find your APK
ls -lh app/build/outputs/apk/debug/app-debug.apk
```

That's it! Your APK is ready at:
`tabgeni-mobile/app/build/outputs/apk/debug/app-debug.apk`

### Install on Device

```bash
# Connect your device via USB (with USB debugging enabled)
adb devices

# Install the APK
adb install app/build/outputs/apk/debug/app-debug.apk

# Launch the app
adb shell am start -n com.tabgeni.app/.MainActivity
```

### Open in Android Studio

1. **Open Android Studio**
2. **File → Open**
3. **Navigate to `tabgeni-mobile/` directory**
4. **Click OK**
5. **Wait for Gradle sync**
6. **Click Run ▶️**

## For CI/CD Setup

### GitHub Secrets

You need 5 secrets for automated deployment:

1. `ANDROID_KEYSTORE_BASE64` - Base64 keystore
2. `KEYSTORE_PASSWORD` - Keystore password
3. `KEY_ALIAS` - Key alias
4. `KEY_PASSWORD` - Key password
5. `PLAY_STORE_JSON` - Service account JSON

See [SECRETS_SETUP.md](./SECRETS_SETUP.md) for detailed instructions.

### Trigger Release

```bash
# Create and push a version tag
git tag v1.0.0
git push origin v1.0.0
```

GitHub Actions will:
1. Build signed APK and AAB
2. Upload to Play Store (internal track)
3. Create GitHub release
4. Attach APK to release

## Common Commands

```bash
# Build debug
./gradlew assembleDebug

# Build release (needs signing)
./gradlew assembleRelease

# Build AAB for Play Store
./gradlew bundleRelease

# Clean build
./gradlew clean

# Run lint checks
./gradlew lint

# Install on device
adb install -r app/build/outputs/apk/debug/app-debug.apk
```

## Troubleshooting

### Build Fails

```bash
# Clean and rebuild
./gradlew clean
./gradlew assembleDebug --stacktrace
```

### Device Not Detected

```bash
# Check if device is connected
adb devices

# If empty, enable USB debugging:
# Settings → Developer options → USB debugging
```

### Gradle Issues

```bash
# Refresh dependencies
./gradlew --refresh-dependencies

# Use Gradle wrapper (don't use system Gradle)
./gradlew instead of gradle
```

## Next Steps

- 📖 Read the full [README.md](./README.md) for detailed documentation
- 🔐 Set up [GitHub Secrets](./SECRETS_SETUP.md) for deployment
- 🤝 Check [CONTRIBUTING.md](./CONTRIBUTING.md) to contribute
- 🐛 Report issues on GitHub

## Need Help?

- **Documentation**: See [README.md](./README.md)
- **Issues**: Open a GitHub issue
- **Secrets Setup**: See [SECRETS_SETUP.md](./SECRETS_SETUP.md)

---

**Happy coding! 🎉**
