#!/usr/bin/env bash

cd dist || exit
echo "Deploying to GitHub Pages..."

# Optionally write CNAME if CNAME_DOMAIN is provided
if [ -n "$CNAME_DOMAIN" ]; then
  echo "$CNAME_DOMAIN" > CNAME
  echo "Go to https://$CNAME_DOMAIN" > README.md
fi

git config --global user.email "chapter-39@vasa.me"
git config --global user.name "Chapter 39"
git config --global init.defaultBranch "main"

git init
# Delete local gh-pages branch if it exists to avoid orphan branch creation failure
if git show-ref --verify --quiet refs/heads/gh-pages; then
  git branch -D gh-pages
fi
git checkout --orphan gh-pages
git add .
git commit -m "Deploy to GitHub Pages"
git remote add origin https://"${GITHUB_ACTOR}":"${NODE_AUTH_TOKEN}"@github.com/"${GITHUB_REPOSITORY}".git
git push origin gh-pages --force

# git branch -M gh-pages
# git remote add origin https://github.com/vasagrujic/eaten.fit.git
# git push -u origin gh-pages

echo "Deployment complete."
exit
