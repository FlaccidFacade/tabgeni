#!/bin/bash

# Script to sign an APK with a keystore
# Usage: ./sign_apk.sh <path-to-unsigned-apk> <path-to-keystore> <key-alias> <output-name>

set -e

if [ "$#" -ne 4 ]; then
    echo "Usage: $0 <path-to-unsigned-apk> <path-to-keystore> <key-alias> <output-name>"
    echo ""
    echo "Example:"
    echo "  $0 app/build/outputs/apk/release/app-release-unsigned.apk release-keystore.jks my-key-alias app-release-signed.apk"
    exit 1
fi

UNSIGNED_APK="$1"
KEYSTORE_PATH="$2"
KEY_ALIAS="$3"
OUTPUT_NAME="$4"

# Check if files exist
if [ ! -f "$UNSIGNED_APK" ]; then
    echo "❌ Error: APK file not found: $UNSIGNED_APK"
    exit 1
fi

if [ ! -f "$KEYSTORE_PATH" ]; then
    echo "❌ Error: Keystore file not found: $KEYSTORE_PATH"
    exit 1
fi

# Check for required tools
if ! command -v jarsigner &> /dev/null; then
    echo "❌ Error: jarsigner not found. Please ensure JDK is installed."
    exit 1
fi

if ! command -v zipalign &> /dev/null; then
    echo "❌ Error: zipalign not found. Please ensure Android SDK build-tools are installed."
    echo "   Add to PATH: \$ANDROID_HOME/build-tools/<version>/"
    exit 1
fi

echo "🔐 Signing APK..."
echo "   Input: $UNSIGNED_APK"
echo "   Keystore: $KEYSTORE_PATH"
echo "   Alias: $KEY_ALIAS"

# Sign the APK
echo ""
echo "Enter keystore password:"
jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 \
    -keystore "$KEYSTORE_PATH" "$UNSIGNED_APK" "$KEY_ALIAS"

# Align the APK
echo ""
echo "📦 Aligning APK..."
zipalign -v 4 "$UNSIGNED_APK" "$OUTPUT_NAME"

echo ""
echo "✅ Signed and aligned APK created: $OUTPUT_NAME"
echo ""
echo "🔍 Verify signature:"
echo "   jarsigner -verify -verbose -certs $OUTPUT_NAME"
