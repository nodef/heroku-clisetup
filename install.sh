#!/usr/bin/env bash
id=${PWD##*/}
url="$HEROKU_CLI_URL"
logn="$HEROKU_CLI_LOGIN"
pass="$HEROKU_CLI_PASSWORD"
arch=$(cat arch.txt)
ptfm=$(cat platform.txt)
uro="https://cli-assets.heroku.com/heroku-cli/channels/stable/heroku-cli"
if [[ "$url" == "" ]]; then url="${uro}-${ptfm}-${arch}.tar.gz"; fi
if [[ $PWD == /tmp* ]]; then h=${PWD%%/node_modules*}; else h=~; fi
echo "${id}: get home directory ..."
echo "$h"

# download
if [ ! -e $h/.heroku-cli ]; then
  mkdir tmp-hero && cd tmp-hero
  echo "${id}: downloading heroku cli ..."
  echo "${url}"
  if [[ "$ptfm" == "windows" ]]; then
    powershell -command "& { iwr ${url} -OutFile heroku.tar.gz }" >/dev/null
  else
    wget -nv -O heroku.tar.gz "${url}" >/dev/null
  fi
  echo "${id}: extracting heroku.tar.gz ..."
  tar -xvzf heroku.tar.gz >/dev/null
  mv $(ls|head -n 1) $h/.heroku-cli
  rm heroku.tar.gz
  cd .. && rmdir tmp-hero
fi

# login
if [ ! -e $h/.netrc ] && [ ! -e $h/_netrc ]; then
  echo "${id}: setting login information ..."
  echo "" >netrc
  echo "machine api.heroku.com" >>netrc
  echo "  password ${pass}" >>netrc
  echo "  login ${logn}" >>netrc
  echo "machine git.heroku.com" >>netrc
  echo "  password ${pass}" >>netrc
  echo "  login ${logn}" >>netrc
  cp netrc $h/.netrc
  mv netrc $h/_netrc
fi

# expose
echo "${id}: exposing heroku at ~/heroku ..."
chmod +x index.sh
if [ ! -e $h/heroku ]; then
  cp index.sh $h/heroku
fi

# test
echo "${id}: get heroku version ..."
$h/heroku --version
