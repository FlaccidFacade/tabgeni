#!/bin/bash

# Check environment for Android development
# This script verifies that all necessary tools are installed

set -e

echo "🔍 Checking Android development environment..."
echo ""

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ERRORS=0
WARNINGS=0

# Check Java
echo "Checking Java..."
if command -v java &> /dev/null; then
    JAVA_VERSION=$(java -version 2>&1 | awk -F '"' '/version/ {print $2}' | cut -d'.' -f1)
    if [ "$JAVA_VERSION" -ge 17 ]; then
        echo -e "${GREEN}✓${NC} Java $JAVA_VERSION is installed"
        java -version 2>&1 | head -1
    else
        echo -e "${RED}✗${NC} Java $JAVA_VERSION is installed but version 17+ is required"
        ERRORS=$((ERRORS + 1))
    fi
else
    echo -e "${RED}✗${NC} Java is not installed"
    echo "  Install from: https://adoptium.net/"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# Check Gradle
echo "Checking Gradle..."
if [ -f "$(dirname "$0")/../tabgeni-mobile/gradlew" ]; then
    echo -e "${GREEN}✓${NC} Gradle wrapper found"
    cd "$(dirname "$0")/../tabgeni-mobile"
    ./gradlew --version | head -5
else
    echo -e "${RED}✗${NC} Gradle wrapper not found"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# Check Android SDK
echo "Checking Android SDK..."
if [ -n "$ANDROID_HOME" ]; then
    echo -e "${GREEN}✓${NC} ANDROID_HOME is set: $ANDROID_HOME"
    if [ -d "$ANDROID_HOME" ]; then
        echo -e "${GREEN}✓${NC} Android SDK directory exists"
    else
        echo -e "${RED}✗${NC} ANDROID_HOME points to non-existent directory"
        ERRORS=$((ERRORS + 1))
    fi
elif [ -n "$ANDROID_SDK_ROOT" ]; then
    echo -e "${YELLOW}⚠${NC}  ANDROID_SDK_ROOT is set but ANDROID_HOME is preferred"
    WARNINGS=$((WARNINGS + 1))
else
    echo -e "${YELLOW}⚠${NC}  ANDROID_HOME is not set"
    echo "  This is optional for CI/CD but required for local development"
    echo "  Set it in your shell profile (.bashrc, .zshrc, etc.):"
    echo "    export ANDROID_HOME=\$HOME/Android/Sdk"
    WARNINGS=$((WARNINGS + 1))
fi
echo ""

# Check ADB
echo "Checking ADB..."
if command -v adb &> /dev/null; then
    echo -e "${GREEN}✓${NC} ADB is installed"
    adb --version | head -1
    
    # Check for connected devices
    DEVICE_COUNT=$(adb devices | grep -v "List of devices" | grep -v "^$" | wc -l)
    if [ "$DEVICE_COUNT" -gt 0 ]; then
        echo -e "${GREEN}✓${NC} $DEVICE_COUNT device(s) connected"
        adb devices
    else
        echo -e "${YELLOW}⚠${NC}  No devices connected"
        echo "  Connect a device or start an emulator to test the app"
        WARNINGS=$((WARNINGS + 1))
    fi
else
    echo -e "${YELLOW}⚠${NC}  ADB is not in PATH"
    echo "  ADB is useful for installing and debugging the app"
    WARNINGS=$((WARNINGS + 1))
fi
echo ""

# Check for local.properties
echo "Checking local configuration..."
if [ -f "$(dirname "$0")/../tabgeni-mobile/local.properties" ]; then
    echo -e "${GREEN}✓${NC} local.properties exists"
else
    echo -e "${YELLOW}⚠${NC}  local.properties not found"
    echo "  Copy local.properties.example and configure for your environment:"
    echo "    cd tabgeni-mobile"
    echo "    cp local.properties.example local.properties"
    WARNINGS=$((WARNINGS + 1))
fi
echo ""

# Summary
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ $ERRORS -eq 0 ]; then
    if [ $WARNINGS -eq 0 ]; then
        echo -e "${GREEN}✓ Environment is ready for Android development!${NC}"
    else
        echo -e "${YELLOW}⚠ Environment is mostly ready with $WARNINGS warning(s)${NC}"
        echo "You can proceed, but consider addressing the warnings above"
    fi
    echo ""
    echo "Next steps:"
    echo "  1. cd tabgeni-mobile"
    echo "  2. ./gradlew assembleDebug"
    echo "  3. adb install app/build/outputs/apk/debug/app-debug.apk"
    exit 0
else
    echo -e "${RED}✗ Environment check failed with $ERRORS error(s) and $WARNINGS warning(s)${NC}"
    echo ""
    echo "Please address the errors above before building the Android app"
    exit 1
fi
