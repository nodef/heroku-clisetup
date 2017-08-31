var cp = require('child_process');
var os = require('os');
var fs = require('fs');
var http = require('http');

var url = process.env.HEROKU_CLI_URL;
if(!url) url = (
  `https://cli-assets.heroku.com/heroku-cli/channels/stable/heroku-cli-`+
  `${os.platform().replace('win32', 'windows')}-`+
  `${os.arch()}.tar.gz`
);
if(os.EOL==='\n') {
  fs.unlinkSync('index.cmd');
  fs.writeFileSync('url.txt', url);
  cp.execSync(`tr -d '\r' <install.sh >install.cmd`);
  cp.execSync(`mv install.cmd install.sh`);
  cp.execSync('chmod +x install.sh');
}
var file = fs.createWriteStream('heroku.tar.gz');
var req = http.get(url, (res) => {
  res.pipe(file);
  res.on('end', () => cp.execSync('bash install.sh', {'stdio': [0, 1, 2]}));
});
