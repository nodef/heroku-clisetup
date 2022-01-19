#!/usr/bin/env bash
bin=$(dirname "$0")/.heroku-cli/bin
if [ -e $bin/heroku ]; then
  $bin/heroku "$@"
else
  $bin/heroku.cmd "$@"
fi
