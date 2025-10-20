#!/bin/bash

# Setup script for Tabgeni Android development environment
# This script installs necessary dependencies and sets up the project

set -e

echo "🚀 Setting up Tabgeni Android development environment..."

# Check for Java
if ! command -v java &> /dev/null; then
    echo "❌ Java is not installed. Please install JDK 17 or higher."
    exit 1
fi

JAVA_VERSION=$(java -version 2>&1 | awk -F '"' '/version/ {print $2}' | cut -d'.' -f1)
if [ "$JAVA_VERSION" -lt 17 ]; then
    echo "❌ Java version 17 or higher is required. Current version: $JAVA_VERSION"
    exit 1
fi

echo "✅ Java version: $(java -version 2>&1 | head -n 1)"

# Check for Android SDK (optional for local development)
if [ -z "$ANDROID_HOME" ]; then
    echo "⚠️  ANDROID_HOME is not set. You may need to set it for local builds."
    echo "   Example: export ANDROID_HOME=\$HOME/Android/Sdk"
else
    echo "✅ ANDROID_HOME: $ANDROID_HOME"
fi

# Navigate to mobile directory
cd "$(dirname "$0")/../tabgeni-mobile"

# Make gradlew executable
chmod +x gradlew

echo ""
echo "🔨 Building debug APK..."
./gradlew assembleDebug

echo ""
echo "✅ Setup complete!"
echo ""
echo "📱 You can now:"
echo "   - Run './gradlew assembleDebug' to build a debug APK"
echo "   - Run './gradlew assembleRelease' to build a release APK (requires signing)"
echo "   - Install the APK on a device: adb install app/build/outputs/apk/debug/app-debug.apk"
echo ""
echo "📋 Debug APK location: app/build/outputs/apk/debug/app-debug.apk"
