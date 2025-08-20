#!/usr/bin/env bash

cd dist || exit

echo 'chapter-39.vasa.me' > CNAME
echo 'Go to [chapter-39.vasa.me](https://chapter-39.vasa.me)' > README.md

git config --global user.email "chapter-39@vasa.me"
git config --global user.name "Chapter-39"

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

exit
