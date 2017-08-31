var cs = require('child_process');
var os = require('os');
var fs = require('fs');

var url = process.env.HEROKU_CLI_URL;
if(!url) url = (
  `https://cli-assets.heroku.com/heroku-cli/channels/stable/heroku-cli-`+
  `${os.platform().replace('win32', 'windows')}-`+
  `${os.arch()}.tar.gz`
);
fs.writeFileSync('url.txt', url);
cs.execSync(`tr -d '\r' <install.sh >install.cmd`);
cs.execSync(`mv install.cmd install.sh`);
cs.execSync('chmod +x install.sh');
cs.execSync('./install.sh');
if(os.EOL==='\n') {
  cs.execSync(`tr -d '\r' <heroku.sh >heroku.cmd`);
  cs.execSync('rm heroku.sh');
  cs.execSync('chmod +x heroku.cmd');
}
cs.execSync('cp heroku.sh ~/heroku');
cs.execSync('~/heroku --version');
