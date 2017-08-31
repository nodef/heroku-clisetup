#!/bin/bash
if [ -e ~/.netrc ]; then
  cat ~/.netrc
elif [ -e ~/_netrc ]; then
  cat ~/_netrc
else
  exit 2
fi
~/heroku addons --app heroku-clisetup
