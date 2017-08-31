#!/bin/bash
url=$(cat url.txt)

# download
cd ~
mkdir heroku-tmp
cd heroku-tmp
wget ${url} -O heroku.tar.gz
tar -xvzf heroku.tar.gz
mv $(ls|head -n 1) ~/.heroku
rm heroku.tar.gz
cd ..
rmdir heroku-tmp

# login
f=".netrc"
echo "" > ${f}
echo "machine api.heroku.com" >> ${f}
echo "  password ${HEROKU_PASSWORD}" >> ${f}
echo "  login ${HEROKU_EMAIL}" >> ${f}
echo "machine git.heroku.com" >> ${f}
echo "  password ${HEROKU_PASSWORD}" >> ${f}
echo "  login ${HEROKU_EMAIL}" >> ${f}
cp .netrc _netrc
