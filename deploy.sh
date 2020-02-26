#!/bin/bash
set -o errexit

# Must have aws cli installed
aws --version

# Build
npm run build

# Deploy to s3
aws s3 sync build s3://zinc.argv.io --acl public-read --delete --profile personal
