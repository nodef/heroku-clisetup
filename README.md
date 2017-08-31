# heroku-clisetup

[![NPM](https://nodei.co/npm/heroku-clisetup.png)](https://nodei.co/npm/heroku-clisetup/)

Setup Heroku CLI without requiring Sudo.

```bash
# add as a dependency to your package
npm install --save heroku-clisetup

# set app environment variable for package url (optional)
HEROKU_CLI_URL=https://cli-assets.heroku.com/heroku-cli/channels/stable/heroku-cli-REPLACEME_OS-REPLACE_ME_ARCH.tar.gz

# set app environment variables for login in cli
# this information is stored in your ~/.netrc or ~/_netrc
HEROKU_CLI_LOGIN=youremail@domain.com
HEROKU_CLI_PASSWORD=your_password

# use heroku cli from you script as
# or use it from app using child_process
~/heroku --version
```
