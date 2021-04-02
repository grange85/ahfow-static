#!/bin/zsh
set -euo pipefail

echo "Deploying A Head Full of Wishes static/legacy content"

source _cloudfront-distribution-id

# upload to s3
echo "sync content..."
aws s3 sync --size-only --delete --exclude '.sass-cache'  deploy/ s3://static.fullofwishes.co.uk

# invalidate cloudfront
aws cloudfront create-invalidation --distribution-id $CDN_DISTRIBUTION_ID --paths "/*"


echo "A Head Full of Wishes static/legacy content successfully deployed."