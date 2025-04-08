Setup Heroku CLI without requiring Sudo.

<br>

```bash
# add as a dependency to your app
npm install --save heroku-clisetup

# set app environment variable for package url (optional)
HEROKU_CLI_URL=https://cli-assets.heroku.com/heroku-cli/channels/stable/heroku-cli-REPLACEME_OS-REPLACE_ME_ARCH.tar.gz

# set app environment variables for login to heroku
# this information is stored in your ~/.netrc or ~/_netrc
HEROKU_CLI_LOGIN=youremail@domain.com
HEROKU_CLI_PASSWORD=your_password
```

```javascript
const cp = require('child_process');
const herokuCliSetup = require('heroku-clisetup');

// Install Heroku CLI.
herokuCliSetup();

// Use heroku cli from your script.
cp.execSync(`~/heroku --version`, {stdio: [0, 1, 2]});
```

![](https://ga-beacon.deno.dev/G-RC63DPBH3P:SH3Eq-NoQ9mwgYeHWxu7cw/github.com/nodef/heroku-clisetup)
