# Contributing to Tabgeni Mobile

Thank you for your interest in contributing to Tabgeni Mobile! This guide will help you get started with developing the Android app.

## 🚀 Getting Started

### Prerequisites

- **JDK 17 or higher** - [Download here](https://adoptium.net/)
- **Android Studio** (optional but recommended) - [Download here](https://developer.android.com/studio)
- **Git** for version control
- Basic knowledge of Kotlin and Android development

### Setting Up Your Development Environment

1. **Clone the repository**
   ```bash
   git clone https://github.com/FlaccidFacade/tabgeni.git
   cd tabgeni
   ```

2. **Navigate to mobile directory**
   ```bash
   cd tabgeni-mobile
   ```

3. **Copy local properties example**
   ```bash
   cp local.properties.example local.properties
   ```

4. **Edit local.properties**
   ```bash
   # Set your Android SDK path
   # Example: sdk.dir=/Users/yourname/Library/Android/sdk
   ```

5. **Build the project**
   ```bash
   ./gradlew assembleDebug
   ```

## 🏗️ Project Structure

```
tabgeni-mobile/
├── app/
│   ├── src/main/
│   │   ├── java/com/tabgeni/app/
│   │   │   └── MainActivity.kt          # Main activity
│   │   ├── res/                         # Resources
│   │   └── AndroidManifest.xml          # App manifest
│   ├── build.gradle.kts                 # App build config
│   └── proguard-rules.pro               # ProGuard rules
├── gradle/                              # Gradle wrapper
├── build.gradle.kts                     # Root build config
└── settings.gradle.kts                  # Gradle settings
```

## 🔨 Development Workflow

### Building

```bash
# Debug build
./gradlew assembleDebug

# Release build (requires signing)
./gradlew assembleRelease

# Clean build
./gradlew clean
```

### Installing on Device

```bash
# Install debug APK
adb install app/build/outputs/apk/debug/app-debug.apk

# Install and launch
adb install -r app/build/outputs/apk/debug/app-debug.apk
adb shell am start -n com.tabgeni.app/.MainActivity
```

### Testing

```bash
# Run on connected device/emulator
./gradlew installDebug

# View logs
adb logcat | grep Tabgeni
```

## 📝 Making Changes

### Code Style

- Follow [Kotlin Coding Conventions](https://kotlinlang.org/docs/coding-conventions.html)
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

### Commit Messages

Use clear, descriptive commit messages:

```bash
# Good
git commit -m "Add support for file downloads in WebView"
git commit -m "Fix back button navigation issue"
git commit -m "Update target SDK to 34"

# Bad
git commit -m "fix stuff"
git commit -m "updates"
```

### Branch Naming

- `feature/description` - New features
- `bugfix/description` - Bug fixes
- `refactor/description` - Code refactoring
- `docs/description` - Documentation updates

Example:
```bash
git checkout -b feature/add-splash-screen
```

## 🧪 Testing Guidelines

### Manual Testing Checklist

Before submitting a PR, verify:

- [ ] App launches successfully
- [ ] WebView loads https://tabgeni.app
- [ ] JavaScript functionality works
- [ ] Back button navigation works
- [ ] App rotates correctly (portrait/landscape)
- [ ] No crashes or ANR (Application Not Responding)
- [ ] ProGuard build (release) works

### Testing on Different Devices

Test on:
- At least one physical device
- At least one emulator
- Different Android versions (minimum: API 24, recommended: API 33+)
- Different screen sizes

## 📤 Submitting Changes

### Pull Request Process

1. **Fork the repository**

2. **Create a feature branch**
   ```bash
   git checkout -b feature/my-new-feature
   ```

3. **Make your changes**
   - Write clean, documented code
   - Test thoroughly
   - Update documentation if needed

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add feature: description"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/my-new-feature
   ```

6. **Open a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Fill in the PR template with:
     - Description of changes
     - Testing performed
     - Screenshots (if UI changes)
     - Related issue numbers

### PR Requirements

Your PR should:
- ✅ Pass CI/CD builds
- ✅ Include a clear description
- ✅ Reference any related issues
- ✅ Be focused on a single feature/fix
- ✅ Include screenshots for UI changes
- ✅ Not break existing functionality

## 🐛 Reporting Issues

When reporting bugs, include:

1. **Device information**
   - Device model
   - Android version
   - App version

2. **Steps to reproduce**
   ```
   1. Open the app
   2. Navigate to...
   3. Tap on...
   4. Observe error
   ```

3. **Expected behavior**
   What should happen?

4. **Actual behavior**
   What actually happens?

5. **Logs (if applicable)**
   ```bash
   adb logcat > logcat.txt
   ```

## 🎨 UI/UX Guidelines

### WebView Considerations

- Ensure responsive design works in WebView
- Test zoom controls
- Verify touch gestures work
- Check file upload functionality
- Test video/audio playback

### Performance

- Monitor memory usage
- Check battery consumption
- Optimize WebView settings
- Use ProGuard for release builds

## 📚 Resources

### Android Development
- [Android Developer Docs](https://developer.android.com/docs)
- [Kotlin Documentation](https://kotlinlang.org/docs/home.html)
- [Material Design Guidelines](https://material.io/design)

### WebView
- [WebView Guide](https://developer.android.com/develop/ui/views/layout/webapps/webview)
- [WebView Best Practices](https://developer.android.com/develop/ui/views/layout/webapps/best-practices)

### Tools
- [Android Studio](https://developer.android.com/studio)
- [Gradle Build Tool](https://gradle.org/)
- [Fastlane](https://fastlane.tools/)

## 💬 Communication

- **GitHub Issues** - Bug reports and feature requests
- **Pull Requests** - Code contributions and discussions
- **Discussions** - General questions and ideas

## 📄 License

By contributing to Tabgeni Mobile, you agree that your contributions will be licensed under the MIT License.

## 🙏 Thank You!

Your contributions make Tabgeni better for everyone. We appreciate your time and effort!

---

**Questions?** Open an issue or reach out to the maintainers.
