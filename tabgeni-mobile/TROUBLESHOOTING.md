# 🔧 Troubleshooting Guide - Tabgeni Android

Common issues and solutions when building, deploying, or running the Tabgeni Android app.

## Table of Contents

- [Build Issues](#build-issues)
- [Signing Issues](#signing-issues)
- [Deployment Issues](#deployment-issues)
- [Runtime Issues](#runtime-issues)
- [CI/CD Issues](#cicd-issues)
- [Play Store Issues](#play-store-issues)

---

## Build Issues

### Gradle Build Fails with "Plugin not found"

**Error:**
```
Plugin [id: 'com.android.application'] was not found
```

**Solution:**
1. Ensure you have internet connectivity (Gradle needs to download dependencies)
2. Check `build.gradle.kts` has correct plugin configuration
3. Try cleaning and rebuilding:
   ```bash
   ./gradlew clean
   ./gradlew assembleDebug --refresh-dependencies
   ```

### "Java version is too old"

**Error:**
```
Android Gradle plugin requires Java 17
```

**Solution:**
1. Install JDK 17 or higher from [Adoptium](https://adoptium.net/)
2. Set JAVA_HOME:
   ```bash
   export JAVA_HOME=/path/to/jdk-17
   ```
3. Verify:
   ```bash
   java -version
   ```

### "ANDROID_HOME not set"

**Error:**
```
SDK location not found
```

**Solution:**
1. **Option A**: Set ANDROID_HOME environment variable:
   ```bash
   export ANDROID_HOME=$HOME/Android/Sdk
   ```

2. **Option B**: Create `local.properties`:
   ```bash
   cd tabgeni-mobile
   cp local.properties.example local.properties
   # Edit local.properties and set sdk.dir
   ```

### Gradle Daemon Issues

**Error:**
```
Gradle build daemon disappeared unexpectedly
```

**Solution:**
```bash
# Stop all Gradle daemons
./gradlew --stop

# Clear Gradle cache
rm -rf ~/.gradle/caches/

# Rebuild
./gradlew assembleDebug
```

### Out of Memory During Build

**Error:**
```
OutOfMemoryError: Java heap space
```

**Solution:**
Create or edit `gradle.properties`:
```properties
org.gradle.jvmargs=-Xmx4096m -XX:MaxMetaspaceSize=512m
```

---

## Signing Issues

### "Invalid keystore format"

**Error:**
```
java.io.IOException: Invalid keystore format
```

**Solution:**
1. Verify keystore file is correct format (JKS or PKCS12)
2. Check keystore wasn't corrupted during transfer
3. Regenerate keystore if necessary:
   ```bash
   keytool -genkey -v -keystore release-keystore.jks \
     -alias tabgeni-key -keyalg RSA -keysize 2048 -validity 10000
   ```

### "Incorrect keystore password"

**Error:**
```
keystore password was incorrect
```

**Solution:**
1. Verify password is correct
2. Try listing keystore to test password:
   ```bash
   keytool -list -v -keystore release-keystore.jks
   ```
3. If password forgotten, keystore cannot be recovered - must create new one

### "Cannot find alias"

**Error:**
```
Alias 'my-alias' does not exist
```

**Solution:**
1. List all aliases in keystore:
   ```bash
   keytool -list -keystore release-keystore.jks
   ```
2. Use the correct alias name
3. Note: Alias names are case-sensitive

### Base64 Encoding Issues

**Problem:** Base64-encoded keystore doesn't work in GitHub Actions

**Solution:**
1. Ensure no line breaks in Base64 string:
   ```bash
   # Correct (single line)
   base64 -w 0 release-keystore.jks > keystore.txt
   
   # On Mac:
   base64 -i release-keystore.jks | tr -d '\n' > keystore.txt
   ```
2. Copy entire string to GitHub Secret
3. Test decoding locally:
   ```bash
   echo "$BASE64_STRING" | base64 -d > test-keystore.jks
   keytool -list -keystore test-keystore.jks
   ```

---

## Deployment Issues

### Fastlane Upload Fails

**Error:**
```
Google Api Error: forbidden
```

**Solution:**
1. Check service account has correct permissions in Play Console
2. Required permissions:
   - View app information
   - Manage production releases
   - Manage testing track releases
3. Verify JSON credentials are current and complete
4. Ensure app exists in Play Console with correct package name

### "First upload must be manual"

**Error:**
```
Cannot upload to a version that has not been created
```

**Solution:**
This is expected behavior. First upload MUST be done manually:
1. Build signed AAB
2. Go to Play Console
3. Upload AAB manually to chosen track
4. After first upload, automation will work

### Version Code Already Used

**Error:**
```
Version code 1 has already been used
```

**Solution:**
1. Increment `versionCode` in `app/build.gradle.kts`:
   ```kotlin
   versionCode = 2  // Increase this number
   ```
2. Commit and rebuild
3. **Important:** versionCode must always increase, never reuse

### AAB/APK Not Found

**Error:**
```
Could not find any *.aab files
```

**Solution:**
1. Verify build completed successfully
2. Check build output path:
   ```bash
   ls -la app/build/outputs/bundle/release/
   ```
3. Review build logs for errors
4. Ensure correct path in Fastlane/GitHub Actions config

---

## Runtime Issues

### App Crashes on Launch

**Symptoms:** App immediately closes after opening

**Solution:**
1. Check logcat for crash details:
   ```bash
   adb logcat | grep -E "AndroidRuntime|Tabgeni"
   ```
2. Common causes:
   - **Missing permission**: Check AndroidManifest.xml has INTERNET permission
   - **WebView initialization error**: Verify WebView is properly configured
   - **Theme issues**: Check styles.xml exists and is valid

### WebView Shows Blank Page

**Symptoms:** App opens but displays white/blank screen

**Solution:**
1. Verify internet connection
2. Test URL in browser: https://tabgeni.app
3. Check JavaScript is enabled in MainActivity
4. Review network security config:
   ```bash
   cat app/src/main/res/xml/network_security_config.xml
   ```
5. Check logcat for network errors:
   ```bash
   adb logcat | grep -E "WebView|chromium"
   ```

### "net::ERR_CLEARTEXT_NOT_PERMITTED"

**Error in logcat:**
```
net::ERR_CLEARTEXT_NOT_PERMITTED
```

**Solution:**
This means the app is trying to load HTTP (not HTTPS). Verify:
1. URL in MainActivity is `https://tabgeni.app` (not http://)
2. Network security config allows HTTPS
3. No mixed content (HTTP resources on HTTPS page)

### Back Button Doesn't Work

**Symptoms:** Back button exits app instead of navigating

**Solution:**
1. Verify OnBackPressedCallback is properly configured in MainActivity
2. Check implementation:
   ```kotlin
   onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
       override fun handleOnBackPressed() {
           if (webView.canGoBack()) {
               webView.goBack()
           } else {
               isEnabled = false
               onBackPressedDispatcher.onBackPressed()
           }
       }
   })
   ```

### App Crashes on Rotation

**Symptoms:** App crashes when rotating device

**Solution:**
1. Add to AndroidManifest.xml activity:
   ```xml
   android:configChanges="orientation|screenSize|keyboardHidden"
   ```
2. Or save/restore WebView state in activity lifecycle

---

## CI/CD Issues

### GitHub Actions Build Fails

**Error:** Workflow fails during build step

**Solution:**
1. Check Actions tab for detailed error logs
2. Common issues:
   - **Missing dependencies**: Ensure all dependencies downloadable
   - **Timeout**: Increase timeout in workflow if needed
   - **Cache corruption**: Clear GitHub Actions cache
3. Test build locally first:
   ```bash
   ./gradlew assembleDebug --no-daemon
   ```

### Secrets Not Available

**Error:**
```
Environment variable 'KEYSTORE_PASSWORD' is not set
```

**Solution:**
1. Verify secrets are configured in GitHub:
   - Settings → Secrets and variables → Actions
2. Check secret names match exactly (case-sensitive)
3. Ensure secrets have values (not empty)
4. Re-create secret if needed

### Workflow Not Triggering

**Problem:** Pushing tag doesn't trigger release workflow

**Solution:**
1. Verify workflow file is on main branch
2. Check tag format matches trigger pattern:
   ```yaml
   on:
     push:
       tags:
         - 'v*.*.*'
   ```
3. Ensure tag follows pattern: `v1.0.0`, `v1.2.3`, etc.
4. Push tag explicitly:
   ```bash
   git push origin v1.0.0
   ```

### Fastlane Installation Fails in CI

**Error:**
```
Could not find gem 'fastlane'
```

**Solution:**
1. Ensure Gemfile exists in repository
2. Check Ruby version in workflow matches Gemfile
3. Clear Bundler cache in GitHub Actions
4. Verify Gemfile syntax is correct

---

## Play Store Issues

### Review Rejected

**Reason:** Various policy violations

**Solution:**
1. Read rejection email carefully
2. Common issues:
   - **Privacy policy missing**: Add privacy policy URL in store listing
   - **Permissions not justified**: Explain why app needs each permission
   - **Content rating incorrect**: Update content rating questionnaire
   - **Broken functionality**: Test thoroughly before submission
3. Fix issues and resubmit

### "Package name already exists"

**Error:**
```
Package name 'com.tabgeni.app' already in use
```

**Solution:**
- Package names are globally unique on Play Store
- If taken, you must choose a different package name:
  1. Update package in AndroidManifest.xml
  2. Update package in build.gradle.kts
  3. Rename package directory structure
  4. Update import statements

### App Not Appearing in Search

**Problem:** App published but can't find it in Play Store

**Solution:**
1. Wait 2-4 hours after publishing for indexing
2. Search using exact package name
3. Check app is in Production track (not Internal/Alpha/Beta)
4. Verify app is available in your country
5. Check age restrictions don't exclude your account

### Users Can't Update

**Problem:** Update available but users can't install it

**Solution:**
1. Ensure using same signing key for all versions
2. Check versionCode increased
3. Verify APK/AAB uploaded successfully
4. Check rollout percentage (may be staged rollout)
5. Look for crashes in new version preventing rollout

---

## Getting More Help

### Enable Debug Logging

Add to MainActivity:
```kotlin
if (BuildConfig.DEBUG) {
    WebView.setWebContentsDebuggingEnabled(true)
}
```

### Collect Device Logs

```bash
# Full logcat
adb logcat > logcat.txt

# Filtered for Tabgeni
adb logcat | grep Tabgeni > tabgeni-logs.txt

# Clear log and reproduce issue
adb logcat -c
# Reproduce issue
adb logcat -d > issue-logs.txt
```

### Report Issues

When reporting bugs on GitHub, include:

1. **Device information**:
   ```bash
   adb shell getprop ro.build.version.release  # Android version
   adb shell getprop ro.product.model          # Device model
   ```

2. **App version**:
   - Check version in app or build.gradle.kts

3. **Steps to reproduce**:
   - Detailed sequence of actions

4. **Expected vs actual behavior**

5. **Logs**:
   - Relevant logcat output

6. **Screenshots/recordings**:
   - Visual evidence if applicable

### Useful Commands

```bash
# Check app is installed
adb shell pm list packages | grep tabgeni

# Clear app data
adb shell pm clear com.tabgeni.app

# Reinstall app
adb install -r app/build/outputs/apk/debug/app-debug.apk

# Force stop app
adb shell am force-stop com.tabgeni.app

# Launch app
adb shell am start -n com.tabgeni.app/.MainActivity

# Check app permissions
adb shell dumpsys package com.tabgeni.app | grep permission
```

---

## Resources

- [Android Developer Docs](https://developer.android.com/docs)
- [Gradle Documentation](https://docs.gradle.org/)
- [Fastlane Docs](https://docs.fastlane.tools/)
- [Play Console Help](https://support.google.com/googleplay/android-developer)
- [GitHub Actions Docs](https://docs.github.com/en/actions)

---

**Still need help?** Open an issue on GitHub with detailed information about your problem.
