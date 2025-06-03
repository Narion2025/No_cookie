#!/bin/bash

# Fail on first error
set -e

# Install npm dependencies only if node_modules is missing or outdated
if [ ! -d node_modules ]; then
  echo "Installing npm dependencies..."
  npm install
else
  echo "node_modules already exists, skipping npm install"
fi

# Additional setup steps for the Chrome extension can be added here
# For example: build steps or preparing manifest