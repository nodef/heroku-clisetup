var cp = require('child_process');

console.log(cp.execSync(`~/heroku addons --app heroku-clisetup`).toString());
