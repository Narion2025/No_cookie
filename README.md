

This repository contains a small Chrome extension that automatically removes
cookie consent banners from webpages.

## Setup in the Codex environment

Run the provided setup script to install dependencies (if any) before network
access is disabled:

```bash
./codex-setup.sh
```

The script installs the Node.js dependencies listed in `package.json` when such a
file exists. If no `package.json` is present (as is the case for this simple
extension) the installation step is skipped.

### Loading the extension

1. Open Chrome and navigate to `chrome://extensions`.
2. Enable **Developer mode**.
3. Click **Load unpacked** and select this directory.
4. The extension's popup allows you to manually trigger the cookie banner
   removal on the active tab.
