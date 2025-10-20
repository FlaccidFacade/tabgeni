# 🚀 Deployment Guide - Tabgeni Android App

Complete guide for deploying Tabgeni to the Google Play Store using CI/CD automation.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Initial Setup](#initial-setup)
3. [First Deployment](#first-deployment)
4. [Automated Deployments](#automated-deployments)
5. [Manual Deployment](#manual-deployment)
6. [Version Management](#version-management)
7. [Rollback Procedures](#rollback-procedures)
8. [Monitoring](#monitoring)

## Prerequisites

### Required Accounts

- ✅ **GitHub Account** - With admin access to the repository
- ✅ **Google Play Developer Account** - [$25 one-time fee](https://play.google.com/console/signup)
- ✅ **Google Cloud Project** - For service account (free)

### Required Files

- ✅ **Signing Keystore** - Generated following [SECRETS_SETUP.md](./SECRETS_SETUP.md)
- ✅ **Service Account JSON** - From Google Play Console API access

## Initial Setup

### Step 1: Create App in Play Console

1. Go to [Google Play Console](https://play.google.com/console)
2. Click **Create app**
3. Fill in app details:
   - **App name**: Tabgeni
   - **Default language**: English (United States)
   - **App type**: Application
   - **Free or paid**: Free
4. Accept declarations and click **Create app**

### Step 2: Configure Store Listing

Navigate to **Main store listing** and fill in:

#### Required Information

**App details:**
- **Short description** (80 chars max):
  ```
  Music analysis tool with chord detection, tabs, and backing tracks for musicians.
  ```

- **Full description** (4000 chars max):
  ```
  Tabgeni is a comprehensive music analysis tool designed for guitarists, pianists, and musicians of all levels.

  KEY FEATURES:
  🎤 Audio Upload & Recording - Upload audio files or record directly
  🔍 Song Identification - Automatic recognition of songs
  🎹 Music Analysis - Detect BPM (tempo) and musical key
  📝 Tabs & Chords - Access guitar tabs and chord progressions
  🎸 Backing Tracks - Find backing tracks on YouTube
  💾 Personal Library - Save and manage your analyzed songs
  
  Whether you're learning new songs, jamming with friends, or practicing your instrument, Tabgeni provides the tools you need to analyze and understand music.

  Perfect for:
  - Guitar players learning new songs
  - Piano students studying chord progressions
  - Musicians creating setlists
  - Band members preparing for practice
  - Music teachers and students

  Visit tabgeni.app to get started!
  ```

**Graphics:**
- **App icon**: 512 x 512 px (high-res icon)
- **Feature graphic**: 1024 x 500 px
- **Screenshots**: At least 2 (required), max 8
  - Phone screenshots: 16:9 or 9:16 aspect ratio
  - Recommended: 1080 x 1920 px or 1920 x 1080 px

**Categorization:**
- **App category**: Music & Audio
- **Tags**: music, guitar, tabs, chords, bpm

**Contact details:**
- **Email**: Your support email
- **Website**: https://tabgeni.app
- **Privacy policy**: Link to your privacy policy

### Step 3: Set Up Content Rating

1. Navigate to **Content rating**
2. Fill out the questionnaire
3. Select appropriate ratings
4. Submit for rating

### Step 4: Configure Target Audience

1. Navigate to **Target audience and content**
2. Select **Target age**: 3+ (or appropriate age)
3. Complete ads declaration
4. Save changes

### Step 5: Set Up GitHub Secrets

Follow [SECRETS_SETUP.md](./SECRETS_SETUP.md) to configure:
- `ANDROID_KEYSTORE_BASE64`
- `KEYSTORE_PASSWORD`
- `KEY_ALIAS`
- `KEY_PASSWORD`
- `PLAY_STORE_JSON`

## First Deployment

The **first upload to Play Store must be done manually**.

### Step 1: Build Signed Release

```bash
cd tabgeni-mobile

# Set up signing (one time)
export KEYSTORE_FILE="/path/to/your/keystore.jks"
export KEYSTORE_PASSWORD="your_password"
export KEY_ALIAS="your_alias"
export KEY_PASSWORD="your_key_password"

# Build signed AAB
./gradlew bundleRelease \
  -Pandroid.injected.signing.store.file=$KEYSTORE_FILE \
  -Pandroid.injected.signing.store.password=$KEYSTORE_PASSWORD \
  -Pandroid.injected.signing.key.alias=$KEY_ALIAS \
  -Pandroid.injected.signing.key.password=$KEY_PASSWORD
```

### Step 2: Manual Upload to Play Console

1. Go to Play Console → **Production** (or **Testing** for initial release)
2. Click **Create new release**
3. Upload the AAB:
   ```
   tabgeni-mobile/app/build/outputs/bundle/release/app-release.aab
   ```
4. Fill in **Release notes**:
   ```
   Initial release of Tabgeni for Android!
   
   Features:
   - Song analysis with BPM and key detection
   - Guitar tabs and chord progressions
   - Backing track finder
   - Personal music library
   - Direct access to tabgeni.app
   ```
5. **Save** and **Review release**
6. **Start rollout to Production** (or chosen track)

### Step 3: Wait for Review

- Initial review typically takes **1-7 days**
- You'll receive an email when approved
- App will be available on Play Store after approval

## Automated Deployments

Once the first version is published, use GitHub Actions for all subsequent releases.

### Deployment Process

```bash
# 1. Update version in app/build.gradle.kts
# Increment versionCode and versionName

# 2. Commit changes
git add tabgeni-mobile/app/build.gradle.kts
git commit -m "Bump version to 1.1.0"
git push origin main

# 3. Create and push version tag
git tag v1.1.0
git push origin v1.1.0
```

### What Happens Next

The GitHub Actions workflow automatically:

1. ✅ Checks out code
2. ✅ Sets up Java environment
3. ✅ Decodes signing keystore
4. ✅ Builds signed APK and AAB
5. ✅ Uploads AAB to Play Store (internal track)
6. ✅ Creates GitHub release with APK
7. ✅ Archives build artifacts

### Promoting Releases

Releases go to **Internal track** by default. Promote them:

1. Go to Play Console → **Testing → Internal testing**
2. Find your release
3. Click **Promote release**
4. Choose track:
   - **Closed testing** (Alpha/Beta)
   - **Open testing** (Beta)
   - **Production**
5. Add release notes
6. **Review and rollout**

## Manual Deployment

If GitHub Actions is unavailable, use Fastlane:

### Setup

```bash
cd tabgeni-mobile

# Install dependencies
bundle install

# Place service account JSON
cp /path/to/play-store-credentials.json fastlane/play-store-credentials.json
```

### Deploy

```bash
# Build and deploy to internal track
bundle exec fastlane deploy_internal

# Or deploy to production
bundle exec fastlane deploy_production
```

## Version Management

### Versioning Strategy

Follow [Semantic Versioning](https://semver.org/):

- **Major** (X.0.0): Breaking changes, major new features
- **Minor** (1.X.0): New features, backward compatible
- **Patch** (1.0.X): Bug fixes, minor improvements

### Updating Version

Edit `tabgeni-mobile/app/build.gradle.kts`:

```kotlin
defaultConfig {
    applicationId = "com.tabgeni.app"
    minSdk = 24
    targetSdk = 34
    versionCode = 2        // Increment by 1 for each release
    versionName = "1.1.0"  // Semantic version
}
```

**Important**: `versionCode` must always increase!

### Version History

| Version | versionCode | Date | Changes |
|---------|-------------|------|---------|
| 1.0.0 | 1 | 2024-XX-XX | Initial release |
| 1.1.0 | 2 | TBD | Feature additions |

## Rollback Procedures

### Immediate Rollback (Play Console)

If critical issues are discovered:

1. Go to Play Console → **Production**
2. Find previous working version
3. Click **⋮ → Create new release from this release**
4. **Review** and **Start rollout**
5. Previous version will be restored

### Halt Rollout

To stop an ongoing staged rollout:

1. Go to current release
2. Click **Halt rollout**
3. Review issues
4. Either:
   - Resume rollout (if false alarm)
   - Roll back to previous version

### Fix Forward

For non-critical issues:

1. Fix the issue in code
2. Create new version (increment versionCode)
3. Deploy normally
4. Users auto-update to fixed version

## Monitoring

### Key Metrics to Track

#### Play Console Dashboard

- **Installs**: Total and active devices
- **Ratings**: Average rating and count
- **Crashes**: Crash-free users percentage
- **ANRs**: App Not Responding rate
- **Reviews**: User feedback

#### GitHub Actions

- **Build success rate**: Monitor CI/CD health
- **Build duration**: Track performance
- **Artifact retention**: Ensure artifacts available

### Setting Up Alerts

#### Play Console Alerts

1. Go to **Alerts**
2. Configure notifications for:
   - Crash rate increases
   - ANR rate increases
   - Rating drops
   - Security issues

#### GitHub Alerts

1. Go to repository → **Settings → Notifications**
2. Enable notifications for:
   - Failed workflow runs
   - Security advisories

### Crash Reporting

View crash reports:
1. Play Console → **Quality → Android vitals**
2. Check **Crashes & ANRs**
3. Filter by version
4. Review stack traces

### User Feedback

Monitor reviews:
1. Play Console → **Reviews**
2. Filter by rating
3. Respond to negative reviews
4. Address common issues

## Troubleshooting Deployment

### Common Issues

#### "Version code already used"
```
Solution: Increment versionCode in build.gradle.kts
```

#### "Invalid signature"
```
Solution: 
1. Verify keystore file is correct
2. Check passwords in GitHub Secrets
3. Ensure using same keystore as initial release
```

#### "Service account lacks permissions"
```
Solution:
1. Check service account permissions in Play Console
2. Ensure "Manage releases" permission granted
3. Verify JSON credentials are current
```

#### "AAB file not found"
```
Solution:
1. Check build logs for errors
2. Verify Gradle build completed successfully
3. Ensure correct path in workflow
```

### Getting Help

- 📖 **Documentation**: Review README.md and other guides
- 🐛 **GitHub Issues**: Report bugs and problems
- 💬 **Discussions**: Ask questions
- 📧 **Email**: Contact maintainers

## Checklist for Each Release

Before tagging a new version:

- [ ] Version numbers updated (versionCode and versionName)
- [ ] CHANGELOG updated with changes
- [ ] All tests passing
- [ ] App tested on multiple devices
- [ ] Release notes prepared
- [ ] No known critical bugs
- [ ] Screenshots updated (if UI changed)
- [ ] Store listing updated (if needed)

## Security Considerations

- 🔐 Keep keystore secure and backed up
- 🔑 Rotate service account keys annually
- 🚫 Never commit secrets to Git
- ✅ Use GitHub Secrets for CI/CD
- 📝 Maintain access control lists
- 🔒 Use HTTPS only in app

## Resources

- [Google Play Console](https://play.google.com/console)
- [Android Publishing Guide](https://developer.android.com/studio/publish)
- [Play Console Help](https://support.google.com/googleplay/android-developer)
- [Fastlane Supply](https://docs.fastlane.tools/actions/supply/)
- [GitHub Actions Docs](https://docs.github.com/en/actions)

---

**Good luck with your deployment! 🚀**

For additional help, see [SECRETS_SETUP.md](./SECRETS_SETUP.md), [README.md](./README.md), or open an issue.
