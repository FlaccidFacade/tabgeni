# Changelog

All notable changes to the Tabgeni Android app will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial Android WebView application
- Full support for tabgeni.app web functionality
- JavaScript and DOM storage enabled
- Network security configuration (HTTPS only)
- Back button navigation within WebView
- ProGuard optimization for release builds

### Security
- HTTPS-only connections enforced
- Clear text traffic disabled
- Network security config implemented

## [1.0.0] - TBD

### Added
- Initial release of Tabgeni for Android
- WebView wrapper for https://tabgeni.app
- Native Android app icon and branding
- Basic WebView configuration:
  - JavaScript enabled
  - DOM storage enabled
  - Database enabled
  - Zoom controls (hidden)
  - Wide viewport support
- CI/CD workflows:
  - GitHub Actions for automated builds
  - Fastlane for Play Store deployment
- Comprehensive documentation:
  - Setup and build instructions
  - Secrets configuration guide
  - Deployment procedures
  - Contributing guidelines

### Features
- 🎤 Audio upload and recording support
- 🔍 Song identification
- 🎹 Music analysis (BPM, key detection)
- 📝 Tabs and chords display
- 🎸 Backing track integration
- 💾 Personal music library
- 🔐 Secure HTTPS-only connection

---

## Version History Format

### Types of Changes
- **Added** - New features
- **Changed** - Changes in existing functionality
- **Deprecated** - Soon-to-be removed features
- **Removed** - Removed features
- **Fixed** - Bug fixes
- **Security** - Security improvements

### Version Numbers
- **Major.Minor.Patch** (e.g., 1.2.3)
- Major: Breaking changes or significant new features
- Minor: New features, backward compatible
- Patch: Bug fixes and minor improvements

---

[Unreleased]: https://github.com/FlaccidFacade/tabgeni/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/FlaccidFacade/tabgeni/releases/tag/v1.0.0
