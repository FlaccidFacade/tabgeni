# 📱 Tabgeni Mobile - Documentation Index

Welcome to the Tabgeni Android app documentation! This directory contains everything you need to build, deploy, and maintain the Android application.

## 🗂️ Documentation Overview

### Getting Started

Start here if you're new to the project:

1. **[QUICKSTART.md](./QUICKSTART.md)** ⚡
   - Get the app running in 5 minutes
   - Quick build instructions
   - Essential commands
   - **Start here if:** You want to try the app quickly

2. **[README.md](./README.md)** 📖
   - Complete project documentation
   - Detailed setup instructions
   - Project structure overview
   - Build and test procedures
   - **Start here if:** You want comprehensive information

### Development

For contributors and developers:

3. **[CONTRIBUTING.md](./CONTRIBUTING.md)** 🤝
   - Development workflow
   - Code style guidelines
   - Pull request process
   - Testing checklist
   - **Read this if:** You want to contribute code

4. **[local.properties.example](./local.properties.example)** ⚙️
   - Local configuration template
   - Android SDK setup
   - Signing configuration
   - **Use this for:** Local development setup

### Deployment

For release managers and CI/CD:

5. **[DEPLOYMENT.md](./DEPLOYMENT.md)** 🚀
   - Complete deployment guide
   - Play Store setup
   - Release workflow
   - Version management
   - **Read this if:** You're publishing to Play Store

6. **[SECRETS_SETUP.md](./SECRETS_SETUP.md)** 🔐
   - GitHub secrets configuration
   - Keystore generation
   - Service account setup
   - Security best practices
   - **Read this if:** You're setting up CI/CD

### Maintenance

For troubleshooting and updates:

7. **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** 🔧
   - Common issues and solutions
   - Build problems
   - Runtime errors
   - CI/CD failures
   - **Read this if:** Something isn't working

8. **[CHANGELOG.md](./CHANGELOG.md)** 📝
   - Version history
   - Release notes
   - Feature additions
   - Bug fixes
   - **Read this if:** You want to see what changed

## 🎯 Quick Navigation by Task

### "I want to..."

#### Build the App
→ [QUICKSTART.md - Build in 3 Steps](./QUICKSTART.md#build-in-3-steps)

#### Set Up My Development Environment
→ [README.md - Quick Start](./README.md#-quick-start)

#### Publish to Play Store
→ [DEPLOYMENT.md - First Deployment](./DEPLOYMENT.md#first-deployment)

#### Configure CI/CD
→ [SECRETS_SETUP.md](./SECRETS_SETUP.md)

#### Fix a Build Error
→ [TROUBLESHOOTING.md - Build Issues](./TROUBLESHOOTING.md#build-issues)

#### Contribute Code
→ [CONTRIBUTING.md](./CONTRIBUTING.md)

#### Understand the Code Structure
→ [README.md - Project Structure](./README.md#-project-structure)

#### Create a Release
→ [DEPLOYMENT.md - Automated Deployments](./DEPLOYMENT.md#automated-deployments)

#### Sign an APK
→ [README.md - Signing and Release](./README.md#-signing-and-release)

#### Run Tests
→ [CONTRIBUTING.md - Testing Guidelines](./CONTRIBUTING.md#-testing-guidelines)

## 📂 Project Files

### Configuration Files

- **`build.gradle.kts`** - Root build configuration
- **`settings.gradle.kts`** - Gradle settings
- **`app/build.gradle.kts`** - App-level build config
- **`app/proguard-rules.pro`** - ProGuard rules for release
- **`Gemfile`** - Ruby dependencies for Fastlane
- **`local.properties.example`** - Local config template

### Source Code

- **`app/src/main/java/com/tabgeni/app/MainActivity.kt`** - Main activity
- **`app/src/main/AndroidManifest.xml`** - App manifest
- **`app/src/main/res/`** - Resources (layouts, strings, etc.)

### CI/CD

- **`.github/workflows/build.yml`** - CI build workflow
- **`.github/workflows/release.yml`** - Release workflow
- **`fastlane/Appfile`** - Fastlane app config
- **`fastlane/Fastfile`** - Fastlane lanes

### Scripts

- **`scripts/setup.sh`** - Development setup script
- **`scripts/sign_apk.sh`** - APK signing script
- **`scripts/check_environment.sh`** - Environment checker

## 🎓 Learning Path

### For New Developers

1. Read [QUICKSTART.md](./QUICKSTART.md) to get app running
2. Explore [README.md](./README.md) for project overview
3. Review [CONTRIBUTING.md](./CONTRIBUTING.md) before making changes
4. Keep [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) handy

### For Release Managers

1. Understand [DEPLOYMENT.md](./DEPLOYMENT.md) deployment process
2. Set up [SECRETS_SETUP.md](./SECRETS_SETUP.md) GitHub secrets
3. Follow [CHANGELOG.md](./CHANGELOG.md) for version tracking
4. Use [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for issues

### For Maintainers

1. Master [DEPLOYMENT.md](./DEPLOYMENT.md) for releases
2. Guide contributors using [CONTRIBUTING.md](./CONTRIBUTING.md)
3. Update [CHANGELOG.md](./CHANGELOG.md) for each version
4. Expand [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) with new issues

## 📊 Documentation at a Glance

| Document | Purpose | Audience | Length |
|----------|---------|----------|--------|
| QUICKSTART.md | Get started fast | Everyone | 5 min read |
| README.md | Complete reference | Developers | 20 min read |
| CONTRIBUTING.md | Development guide | Contributors | 15 min read |
| DEPLOYMENT.md | Release process | Release managers | 25 min read |
| SECRETS_SETUP.md | Security setup | DevOps | 20 min read |
| TROUBLESHOOTING.md | Problem solving | Everyone | Reference |
| CHANGELOG.md | Version history | Everyone | Reference |

## 🔍 Find Information By Topic

### Building
- Basic build: [QUICKSTART.md](./QUICKSTART.md)
- Advanced build: [README.md](./README.md)
- Build issues: [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

### Signing
- Generate keystore: [SECRETS_SETUP.md](./SECRETS_SETUP.md)
- Sign APK: [README.md](./README.md)
- Signing issues: [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

### Deployment
- First deployment: [DEPLOYMENT.md](./DEPLOYMENT.md)
- Automated deployment: [DEPLOYMENT.md](./DEPLOYMENT.md)
- Deploy issues: [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

### Development
- Setup: [README.md](./README.md), [QUICKSTART.md](./QUICKSTART.md)
- Workflow: [CONTRIBUTING.md](./CONTRIBUTING.md)
- Code structure: [README.md](./README.md)

## 💡 Tips

- 📌 **Bookmark this page** as your documentation hub
- 🔖 **Use Ctrl/Cmd+F** to search within documents
- 📱 **Test on real devices** before releasing
- 💾 **Backup your keystore** - it's irreplaceable
- 📝 **Update CHANGELOG.md** with every change
- 🤝 **Ask questions** via GitHub issues

## 🆘 Need Help?

1. Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) first
2. Search existing [GitHub Issues](https://github.com/FlaccidFacade/tabgeni/issues)
3. Read relevant documentation sections above
4. Ask a question by opening a new issue

## 📞 Support Channels

- **Documentation**: You're reading it! 📖
- **Issues**: [GitHub Issues](https://github.com/FlaccidFacade/tabgeni/issues) 🐛
- **Discussions**: [GitHub Discussions](https://github.com/FlaccidFacade/tabgeni/discussions) 💬

---

**Happy developing! 🎉**

Last updated: 2024
