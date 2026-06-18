# JaspuraHub WordPress Theme - Installation & Upload Guide

## Quick Start Overview

This guide will help you download the JaspuraHub WordPress theme from GitHub and install it on your WordPress website.

---

## Method 1: Manual Installation (Recommended for Beginners)

### Step 1: Download the Theme from GitHub

#### Option A: Download as ZIP (Easiest)

1. Go to: https://github.com/jetkingallahabad/raj
2. Click the green **"Code"** button
3. Select **"Download ZIP"**
4. This will download the entire repository as a ZIP file

![Download ZIP](https://docs.github.com/assets/cb-25670/images/help/repository/code-button.png)

#### Option B: Download Only the Theme Folder

1. Navigate to the `wordpress-theme/jaspurahub/` folder in the repository
2. You can use a GitHub downloader tool like:
   - **DownGit**: https://downgit.github.io/ (paste the folder URL)
   - **GitHub Desktop**: Clone the repository and extract the theme folder

### Step 2: Extract the Files

1. Locate the downloaded ZIP file on your computer
2. Right-click and select **"Extract All"** (Windows) or **"Unzip"** (Mac)
3. Navigate to the extracted folder

**If you downloaded the entire repo:**
- Find the `wordpress-theme/jaspurahub/` folder
- This is your theme folder

**If you downloaded just the theme:**
- You should see a folder named `jaspurahub`

### Step 3: Upload Theme via WordPress Admin (Easiest)

1. **Log in to your WordPress Dashboard**
   - Go to: `yourwebsite.com/wp-admin/`
   - Enter your username and password

2. **Go to Appearance > Themes**
   - In the left sidebar, click **Appearance**
   - Click **Themes**

3. **Upload the Theme**
   - Click the **"Add New"** button at the top
   - Click **"Upload Theme"** button
   - Click **"Choose File"**
   - Select the **jaspurahub.zip** file (or create a ZIP from the extracted folder)
   - Click **"Install Now"**

4. **Activate the Theme**
   - Once installed, click **"Activate"**
   - You're done! The theme is now active

---

## Method 2: FTP/SFTP Upload (For Experienced Users)

### Step 1: Connect via FTP

1. **Download an FTP client** (if you don't have one):
   - FileZilla (free): https://filezilla-project.org/
   - Cyberduck
   - WinSCP

2. **Get FTP credentials from your hosting provider**
   - Host: (provided by your hosting)
   - Username: (provided by your hosting)
   - Password: (provided by your hosting)
   - Port: Usually 21 (or 22 for SFTP)

3. **Connect to your server**
   - Open your FTP client
   - Enter the credentials
   - Click "Connect"

### Step 2: Upload Theme Files

1. **Navigate to the themes folder**
   - Local path: `public_html/wp-content/themes/`
   - Or: `www/wp-content/themes/`
   - (Depends on your hosting provider)

2. **Upload the jaspurahub folder**
   - Drag and drop the `jaspurahub` folder into the themes directory
   - Or right-click and "Upload"
   - Wait for the upload to complete

3. **Verify the upload**
   - Check that all files are uploaded
   - You should see a `jaspurahub` folder in the themes directory

### Step 3: Activate the Theme

1. **Log in to WordPress Admin**
2. **Go to Appearance > Themes**
3. **Find "JaspuraHub"** and click **"Activate"**

---

## Method 3: Using Git (For Developers)

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/jetkingallahabad/raj.git

# Navigate to the theme
cd raj/wordpress-theme/jaspurahub
```

### Step 2: Copy to WordPress

```bash
# Copy the theme to your WordPress installation
cp -r . /path/to/wordpress/wp-content/themes/jaspurahub

# Or on Windows (PowerShell):
Copy-Item -Path "jaspurahub" -Destination "C:\path\to\wordpress\wp-content\themes\jaspurahub" -Recurse
```

### Step 3: Activate the Theme

1. Log in to WordPress Admin
2. Go to Appearance > Themes
3. Activate JaspuraHub

---

## Method 4: cPanel File Manager (Shared Hosting)

### Step 1: Upload via File Manager

1. **Log in to cPanel**
   - Go to your hosting provider's cPanel
   - Usually: `yourhosting.com/cpanel`

2. **Open File Manager**
   - Click "File Manager"
   - Navigate to: `public_html/wp-content/themes/`

3. **Upload the Theme ZIP**
   - Click "Upload"
   - Select `jaspurahub.zip`
   - Wait for upload to complete

### Step 2: Extract the ZIP

1. **Right-click on the ZIP file**
2. **Select "Extract"**
3. **Confirm extraction**

### Step 3: Activate the Theme

1. Log in to WordPress Admin
2. Go to Appearance > Themes
3. Activate JaspuraHub

---

## Troubleshooting

### Theme Won't Upload

**Problem:** "Unable to process request" error

**Solutions:**
1. Check file size - theme should be under 25MB
2. Increase upload limit in `wp-config.php`:
   ```php
   define('WP_MEMORY_LIMIT', '256M');
   define('WP_MAX_MEMORY_LIMIT', '512M');
   ```
3. Use FTP method instead

### Theme Shows Errors After Activation

**Problem:** Blank page or error messages

**Solutions:**
1. Ensure PHP version is 8.0 or higher
2. Check WordPress version is 6.0 or higher
3. Enable debug mode in `wp-config.php`:
   ```php
   define('WP_DEBUG', true);
   define('WP_DEBUG_LOG', true);
   define('WP_DEBUG_DISPLAY', false);
   ```
4. Check error logs in `/wp-content/debug.log`

### Theme Doesn't Appear in Themes List

**Problem:** Uploaded theme not showing in Appearance > Themes

**Solutions:**
1. Verify folder name is exactly `jaspurahub` (lowercase)
2. Check `style.css` file exists in the root folder
3. Ensure `style.css` has proper header comment block
4. Check file permissions (should be 755 for folders, 644 for files)

### Blank Page After Activation

**Problem:** Website shows blank white page

**Solutions:**
1. Temporarily switch to default WordPress theme
2. Check error logs
3. Ensure all template files are present
4. Verify Tailwind CSS and Font Awesome CDN links are accessible

---

## Initial Setup After Installation

### Step 1: Set Up Menus

1. Go to **Appearance > Menus**
2. Click **"Create a new menu"**
3. Name it "Main Menu"
4. Add pages/posts to the menu
5. Check "Display location" for **Primary Menu**
6. Click **"Save Menu"**

### Step 2: Upload Logo

1. Go to **Appearance > Customize**
2. Click **"Site Identity"**
3. Click **"Logo"**
4. Upload your company logo
5. Click **"Publish"**

### Step 3: Customize Colors

1. Go to **Appearance > Customize**
2. Click **"JaspuraHub Settings"**
3. Set:
   - **Primary Color** (main brand color)
   - **Accent Color** (hover/highlight color)
   - **Site Tagline** (e.g., "Digital Marketing Agency")
4. Click **"Publish"**

### Step 4: Create Home Page

1. Go to **Pages > Add New**
2. Title: "Home"
3. Click **"Publish"**
4. Go to **Settings > Reading**
5. Select **"A static page"** for Homepage
6. Choose "Home" as the Homepage
7. Click **"Save Changes"**

### Step 5: Create Content

**Create Services:**
- Go to **Services > Add New**
- Add title, description, featured image
- Fill in "Service Details" meta box (icon, color)
- Publish

**Create Portfolio:**
- Go to **Portfolio > Add New**
- Add title, description, featured image
- Assign portfolio category
- Publish

**Create Testimonials:**
- Go to **Testimonials > Add New**
- Add testimonial text
- Fill in author name, title, rating
- Upload client photo as featured image
- Publish

**Create Team Members:**
- Go to **Team Members > Add New**
- Add member name, bio
- Fill in position, email, social links (JSON format)
- Upload photo as featured image
- Publish

---

## Recommended WordPress Plugins

These plugins work great with JaspuraHub:

1. **Yoast SEO** - SEO optimization
   - Install from Plugins > Add New
   - Search "Yoast SEO"
   - Click Install and Activate

2. **WP Forms** - Contact forms
   - Search "WP Forms Lite"
   - Click Install and Activate

3. **WP Super Cache** - Performance optimization
   - Search "WP Super Cache"
   - Click Install and Activate

4. **Akismet Anti-Spam** - Comment spam prevention
   - Included with WordPress
   - Just activate and add API key

5. **Google Site Kit** - Google Analytics integration
   - Search "Google Site Kit"
   - Click Install and Activate

---

## System Requirements

✅ **Minimum Requirements:**
- WordPress 6.0 or higher
- PHP 8.0 or higher
- MySQL 5.7 or higher
- Modern web browser (Chrome, Firefox, Safari, Edge)

✅ **Recommended:**
- WordPress 6.2 or higher
- PHP 8.1 or higher
- MySQL 8.0 or higher
- 50MB disk space for theme + content
- 1GB RAM minimum

---

## File Permissions

If you upload via FTP, ensure correct permissions:

```bash
# Folder permissions
chmod 755 /wp-content/themes/jaspurahub
chmod 755 /wp-content/themes/jaspurahub/template-parts
chmod 755 /wp-content/themes/jaspurahub/assets

# File permissions
chmod 644 /wp-content/themes/jaspurahub/style.css
chmod 644 /wp-content/themes/jaspurahub/functions.php
chmod 644 /wp-content/themes/jaspurahub/*.php
```

---

## Getting Help

If you encounter issues:

1. **Check WordPress documentation**: https://wordpress.org/support/
2. **Check theme README**: See `README.md` in theme folder
3. **Check conversion guide**: See `CONVERSION_GUIDE.md` for technical details
4. **Enable debugging**: Follow troubleshooting section above
5. **Contact support**: Reach out to your hosting provider or WordPress support

---

## Next Steps

✅ Install the theme
✅ Configure basic settings
✅ Set up menus and logo
✅ Create initial content
✅ Customize colors
✅ Install recommended plugins
✅ Set up backups
✅ Launch your website!

For more details on theme features and customization, see **README.md**
