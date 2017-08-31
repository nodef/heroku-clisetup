var cp = require('child_process');
var os = require('os');
var fs = require('fs');
var path = require('path');
var https = require('https');

var id = path.basename(__dirname);
var url = process.env.HEROKU_CLI_URL;
if(!url) url = (
  `https://cli-assets.heroku.com/heroku-cli/channels/stable/heroku-cli-`+
  `${os.platform().replace('win32', 'windows')}-`+
  `${os.arch()}.tar.gz`
);
if(os.EOL==='\n') {
  console.log(`${id}: preparing install script ...`);
  fs.unlinkSync('index.cmd');
  fs.writeFileSync('url.txt', url);
  cp.execSync(`tr -d '\r' <install.sh >install.cmd`);
  cp.execSync(`mv install.cmd install.sh`);
  cp.execSync('chmod +x install.sh');
}
if(fs.existsSync(`${os.homedir()}/.heroku`)) {
  console.log(`${id}: heroku cli is availble`);
  console.log(`${id}: starting install script ...`);
  cp.execSync('bash install.sh', {'stdio': [0, 1, 2]});
}
else {
  console.log(`${id}: heroku cli is downloading ...`);
  console.log(`${id}: ${url}`);
  var file = fs.createWriteStream('heroku.tar.gz');
  var req = https.get(url, (res) => {
    res.pipe(file);
    res.on('end', () => {
      console.log(`${id}: starting install script ...`);
      cp.execSync('bash install.sh', {'stdio': [0, 1, 2]});
    });
  });
}
