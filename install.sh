#!/bin/bash
id="${PWD##*/}"

# download
if [ ! -e ~/.heroku ]; then
  mkdir ~/heroku-tmp
  mv heroku.tar.gz ~/heroku-tmp/
  pushd ~/heroku-tmp >/dev/null
  echo "${id}: extracting heroku.tar.gz ..."
  tar -xvzf heroku.tar.gz >/dev/null
  mv $(ls|head -n 1) ~/.heroku
  rm heroku.tar.gz
  cd ..
  rmdir heroku-tmp
  popd >/dev/null
fi

# login
if [ ! -e ~/.netrc ] && [ ! -e ~/_netrc ]; then
  echo "${id}: setting login information ..."
  echo "${id}: login: ${HEROKU_CLI_LOGIN}"
  echo "${id}: password: ${HEROKU_CLI_PASSWORD}"
  f=".netrc"
  echo "" >${f}
  echo "machine api.heroku.com" >>${f}
  echo "  password ${HEROKU_CLI_PASSWORD}" >>${f}
  echo "  login ${HEROKU_CLI_LOGIN}" >>${f}
  echo "machine git.heroku.com" >>${f}
  echo "  password ${HEROKU_CLI_PASSWORD}" >>${f}
  echo "  login ${HEROKU_CLI_LOGIN}" >>${f}
  cp .netrc _netrc
fi

# expose
echo "${id}: exposing heroku at ~/heroku ..."
if [ ! -e index.cmd ]; then
  tr -d '\r' <index.sh >index.cmd
  rm index.sh
  mv index.cmd index.sh
fi
chmod +x index.sh
if [ ! -e ~/heroku ]; then
  cp index.sh ~/heroku
fi

# test
echo "${id}: get heroku version ..."
~/heroku --version
