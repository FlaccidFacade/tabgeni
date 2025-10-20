# 🔐 GitHub Secrets Setup Guide

This guide explains how to configure the GitHub secrets required for building, signing, and publishing the Tabgeni Android app to the Google Play Store.

## Required Secrets

The following secrets must be configured in your GitHub repository settings:

| Secret Name | Description | Required For |
|-------------|-------------|--------------|
| `ANDROID_KEYSTORE_BASE64` | Base64-encoded signing keystore | Release builds |
| `KEYSTORE_PASSWORD` | Password for the keystore file | Release builds |
| `KEY_ALIAS` | Alias of the signing key within the keystore | Release builds |
| `KEY_PASSWORD` | Password for the specific signing key | Release builds |
| `PLAY_STORE_JSON` | Google Play Console service account JSON | Play Store deployment |

## Step-by-Step Setup

### 1. Generate a Signing Keystore

First, create a keystore file for signing your Android app:

```bash
keytool -genkey -v -keystore release-keystore.jks \
  -alias tabgeni-key \
  -keyalg RSA -keysize 2048 -validity 10000
```

You'll be prompted for:
- **Keystore password**: Create a strong password (save this for `KEYSTORE_PASSWORD`)
- **Key password**: Create another strong password (save this for `KEY_PASSWORD`)
- **Distinguished Name fields**: Your name, organization, etc.

**Important Security Notes:**
- ⚠️ **Never commit the keystore file to version control**
- 💾 **Backup the keystore in a secure location** (losing it means you can't update your app)
- 🔒 **Store passwords securely** (use a password manager)
- 📋 **Document the key alias** (default shown above is `tabgeni-key`)

### 2. Encode the Keystore to Base64

Convert your keystore to Base64 format for GitHub Secrets:

```bash
# On Linux/Mac:
base64 -i release-keystore.jks -o keystore-base64.txt

# On Windows (PowerShell):
[Convert]::ToBase64String([IO.File]::ReadAllBytes("release-keystore.jks")) > keystore-base64.txt
```

The output file `keystore-base64.txt` will contain a long string. This is the value for `ANDROID_KEYSTORE_BASE64`.

### 3. Create a Google Play Console Service Account

To automate Play Store uploads, you need a service account:

#### 3.1 Set Up API Access

1. Go to [Google Play Console](https://play.google.com/console)
2. Select your app (or create it first with package name `com.tabgeni.app`)
3. Navigate to **Setup → API access**
4. If you don't have a Google Cloud project linked:
   - Click **Create new Google Cloud project**
   - Follow the prompts to link it

#### 3.2 Create Service Account

1. Click **Create new service account**
2. Follow the link to Google Cloud Console
3. In Google Cloud Console:
   - Click **+ CREATE SERVICE ACCOUNT**
   - **Service account name**: `tabgeni-playstore-deployer`
   - **Service account ID**: Auto-generated (or customize)
   - Click **CREATE AND CONTINUE**
   - Skip granting roles (we'll set them in Play Console)
   - Click **DONE**

#### 3.3 Generate Service Account Key

1. Find your new service account in the list
2. Click on it to open details
3. Go to the **KEYS** tab
4. Click **ADD KEY → Create new key**
5. Choose **JSON** format
6. Click **CREATE**
7. The JSON file will download automatically - **keep this secure!**

#### 3.4 Grant Permissions in Play Console

1. Return to Play Console → **Setup → API access**
2. Find your service account in the list
3. Click **Grant access**
4. Under **App permissions**, select your app
5. Under **Account permissions**, grant at least:
   - ✅ **View app information and download bulk reports**
   - ✅ **Manage production releases**
   - ✅ **Manage testing track releases** (for internal, alpha, beta tracks)
6. Click **Invite user** (or **Apply**)
7. Confirm the invitation

### 4. Add Secrets to GitHub

Now add all secrets to your GitHub repository:

#### 4.1 Navigate to Secrets Settings

1. Go to your GitHub repository
2. Click **Settings** (top menu)
3. In the left sidebar, expand **Secrets and variables**
4. Click **Actions**
5. Click **New repository secret**

#### 4.2 Add Each Secret

Add the following secrets one by one:

**`ANDROID_KEYSTORE_BASE64`**
```
# Copy the entire contents of keystore-base64.txt
# Should be a very long string with no line breaks
```

**`KEYSTORE_PASSWORD`**
```
# The password you created for the keystore file
# Example: MySecureKeystorePassword123!
```

**`KEY_ALIAS`**
```
# The alias you used when creating the keystore
# If you followed the guide above: tabgeni-key
```

**`KEY_PASSWORD`**
```
# The password for the specific key
# Example: MySecureKeyPassword456!
```

**`PLAY_STORE_JSON`**
```json
# Copy the ENTIRE contents of the service account JSON file downloaded from Google Cloud
# It should look like this (this is just an example, yours will be different):
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "abc123...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "tabgeni-playstore-deployer@your-project.iam.gserviceaccount.com",
  "client_id": "123456789",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/..."
}
```

## Verification

### Test the Secrets

To verify your secrets are configured correctly:

1. **Create a test release tag:**
   ```bash
   git tag v0.1.0-test
   git push origin v0.1.0-test
   ```

2. **Monitor the workflow:**
   - Go to **Actions** tab in your GitHub repository
   - Watch the "Android Release" workflow execute
   - Check for errors in the build logs

3. **Verify Play Console upload:**
   - Go to Google Play Console
   - Navigate to **Release → Testing → Internal testing**
   - Look for your new release

4. **Clean up test release:**
   ```bash
   # Delete tag locally
   git tag -d v0.1.0-test
   
   # Delete tag remotely
   git push --delete origin v0.1.0-test
   ```

### Common Issues

#### "Invalid keystore format"
- Ensure the Base64 string has no line breaks
- Verify you encoded the correct `.jks` file
- Check the keystore password is correct

#### "Service account does not have permission"
- Verify service account permissions in Play Console
- Ensure the correct JSON file is used
- Check if the app exists in Play Console with correct package name

#### "Could not find any *.apk or *.aab files"
- Check that the build completed successfully
- Verify the build paths in the workflow match your project structure
- Look for Gradle build errors earlier in the logs

#### "First upload must be done manually"
- Google requires the first APK/AAB to be uploaded manually via Play Console
- After the first manual upload, automation will work for subsequent versions

## Security Best Practices

### DO:
✅ Store keystore backups in a secure, encrypted location  
✅ Use a password manager for keystore passwords  
✅ Rotate service account keys periodically  
✅ Limit service account permissions to minimum required  
✅ Use separate keystores for debug and release builds  
✅ Document the key alias and store it securely  

### DON'T:
❌ Commit keystore files to Git  
❌ Share keystore passwords in plain text  
❌ Use the same passwords across multiple services  
❌ Store keystore on shared network drives  
❌ Email or message keystore files  
❌ Use simple or guessable passwords  

## Keystore Recovery

If you lose your keystore:

### Option 1: Find a Backup
- Check secure backup locations
- Look for encrypted storage
- Ask team members who may have copies

### Option 2: Contact Google (New Apps Only)
- For apps enrolled in **App Signing by Google Play**
- Google manages the upload key, you can reset it
- This only works if you enrolled when publishing

### Option 3: Start Over (Last Resort)
- Create a new app with a different package name
- Users will need to reinstall (can't update existing installs)
- Lose all existing ratings and reviews
- **Avoid this at all costs!**

## Additional Resources

- [Android App Signing Documentation](https://developer.android.com/studio/publish/app-signing)
- [Google Play Console Help](https://support.google.com/googleplay/android-developer)
- [Using Secrets in GitHub Actions](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Fastlane Supply (Play Store)](https://docs.fastlane.tools/actions/supply/)

## Support

If you encounter issues:

1. Check the **Actions** tab for detailed error logs
2. Review this document for common issues
3. Consult the [Android README](./README.md) for troubleshooting
4. Open an issue in the repository with error details

---

**Remember**: Your keystore and passwords are critical. Treat them like your bank password! 🔐
