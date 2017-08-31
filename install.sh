#!/bin/bash
url=$(cat url.txt)
if [ -e ~/.netrc ]; then done="1"; fi
if [ -e ~/_netrc ]; then done="1"; fi

# download
if [[ "${done}" != "1" ]]; then
  cd ~
  mkdir heroku-tmp
  cd heroku-tmp
  wget ${url} -O heroku.tar.gz
  tar -xvzf heroku.tar.gz
  mv $(ls|head -n 1) ~/.heroku
  rm heroku.tar.gz
  cd ..
  rmdir heroku-tmp
fi

# login
if [[ "${done}" != "1" ]]; then
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
if [ -e index.txt ]; then
  echo '#!/bin/bash' >index.sh
  echo 'heroku "$@"' >>index.sh
fi
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
~/heroku --version
