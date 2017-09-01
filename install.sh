#!/bin/bash
id=${PWD##*/}
url="$HEROKU_CLI_URL"
lgn="$HEROKU_CLI_LOGIN"
pwd="$HEROKU_CLI_PASSWORD"
ach=$(cat arch.txt)
pfm=$(cat platform.txt)
if [[ $PWD == tmp/* ]]; then r=$PWD; else r=~; fi
uro="https://cli-assets.heroku.com/heroku-cli/channels/stable/heroku-cli"
if [[ "$url" == "" ]]; then url="${uro}-${pfm}-${ach}.tar.gz"; fi

# download
if [ ! -e $r/.heroku-cli ]; then
  mkdir tmp-hero && cd tmp-hero
  echo "${id}: downloading heroku cli ..."
  echo "${url}"
  if [[ "$pfm" == "windows" ]]; then
    powershell -command "& { iwr ${url} -OutFile heroku.tar.gz }" >/dev/null
  else
    wget -nv -O heroku.tar.gz "${url}" >/dev/null
  fi
  echo "${id}: extracting heroku.tar.gz ..."
  tar -xvzf heroku.tar.gz >/dev/null
  mv $(ls|head -n 1) $r/.heroku-cli
  rm heroku.tar.gz
  cd .. && rmdir tmp-hero
fi

# login
if [ ! -e $r/.netrc ] && [ ! -e $r/_netrc ]; then
  echo "${id}: setting login information ..."
  echo "" >netrc
  echo "machine api.heroku.com" >>netrc
  echo "  password ${pwd}" >>netrc
  echo "  login ${lgn}" >>netrc
  echo "machine git.heroku.com" >>netrc
  echo "  password ${pwd}" >>netrc
  echo "  login ${lgn}" >>netrc
  cp netrc $r/.netrc
  mv netrc $r/_netrc
fi

# expose
echo "${id}: exposing heroku at ~/heroku ..."
chmod +x index.sh
if [ ! -e $r/heroku ]; then
  cp index.sh $r/heroku
fi

# test
echo "${id}: get heroku version ..."
$r/heroku --version
