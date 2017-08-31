#!/bin/bash
if [ -e ~/.heroku/bin/heroku ]; then
  ~/.heroku/bin/heroku "$@"
else
  ~/.heroku/bin/heroku.cmd "$@"
fi
