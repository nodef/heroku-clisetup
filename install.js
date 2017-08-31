var cp = require('child_process');
var os = require('os');
var fs = require('fs');

var url = process.env.HEROKU_CLI_URL;
if(!url) url = (
  `https://cli-assets.heroku.com/heroku-cli/channels/stable/heroku-cli-`+
  `${os.platform().replace('win32', 'windows')}-`+
  `${os.arch()}.tar.gz`
);
fs.writeFileSync('url.txt', url);
if(os.EOL==='\n') fs.unlinkSync('heroku.cmd');
try {
  cs.execSync(`heroku --version`);
  fs.writeFileSync('heroku.txt', '1');
}
catch(e) {}
cp.execSync(`tr -d '\r' <install.sh >install.cmd`);
cp.execSync(`mv install.cmd install.sh`);
cp.execSync('chmod +x install.sh');
cp.execSync('bash install.sh', {'stdio': [0, 1, 2]});
