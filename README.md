

This repository contains a React Native application and a Chrome extension.

## Setup in the Codex environment

Run the provided setup script to install dependencies before network access is disabled:

```bash
./codex-setup.sh
```

This installs the Node.js dependencies listed in `package.json` if they are not already present.

## Cookie banner test environment

Run the generator script to create a collection of sample pages that include
common cookie banner styles.

```bash
python3 test_env/generate_test_env.py
```

Open `test_env/index.html` in Chrome with the extension loaded to quickly test
how the blocker handles different banner implementations.
