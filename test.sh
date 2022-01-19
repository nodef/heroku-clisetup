#!/usr/bin/env bash
id=${PWD##*/}

echo "${id}: read .netrc / _netrc ..."
if [ -e ~/.netrc ]; then
  cat ~/.netrc
elif [ -e ~/_netrc ]; then
  cat ~/_netrc
else
  exit 2
fi
echo

echo "${id}: list apps ..."
~/heroku apps
