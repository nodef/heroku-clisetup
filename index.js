const path = require('path');
const cp = require('child_process');
const os = require('os');
const fs = require('fs');

const E     = process.env;
const stdio = [0, 1, 2];
const URL   = E['HEROKU_CLI_URL'];
const LOGN  = E['HEROKU_CLI_LOGIN'];
const PASS  = E['HEROKU_CLI_PASSWORD'];
const URO   = 'https://cli-assets.heroku.com/heroku-cli/channels/stable/heroku-cli';
const NETRC = `\n`+
  `machine api.heroku.com\n`+
  `  password ${PASS}\n`+
  `  login ${LOGN}\n`+
  `machine git.heroku.com\n`+
  `  password ${PASS}\n`+
  `  login ${LOGN}\n`;




function installUrl() {
  var arch     = os.arch();
  var platform = os.platform().replace('win32', 'windows');
  return URL||`${URO}-${platform}-${arch}.tar.gz`;
}

function installCli() {
  var phom = os.homedir();
  var pcli = path.join(phom, '.heroku-cli');
  if (fs.existsSync(pcli)) return;
  var rtmp = path.join(phom, '.heroku-cli-');  // avoid cross-dev rename!
  var ptmp = fs.mkdtempSync(rtmp);
  var url  = installUrl();
  var fout = 'heroku-cli.tar.gz';
  var pout = path.join(ptmp, fout);
  if (os.platform()!=='win32') cp.execSync(`wget -nv -O ${pout} "${url}"`, {stdio});
  else cp.execSync(`powershell -command "& { iwr ${url} -OutFile ${pout} }"`, {stdio});
  cp.execSync(`tar -xzf ${pout} -C ${ptmp}`, {stdio});
  fs.unlinkSync(pout);
  var dpkg = fs.readdirSync(ptmp)[0];
  var ppkg = path.join(ptmp, dpkg);
  fs.renameSync(ppkg, pcli);
  fs.rmSync(ptmp, {recursive: true, maxRetries: 4});
}

function setupNetrc() {
  var phom = os.homedir();
  var pu   = path.join(phom, '_netrc');
  var pd   = path.join(phom, '.netrc');
  if (fs.existsSync(pu) || fs.existsSync(pd)) return;
  fs.writeFileSync(pu, NETRC);
  fs.writeFileSync(pd, NETRC);
}

function exposeCli() {
  var phom = os.homedir();
  var pwin = os.platform()==='win32';
  var fsh  = pwin? 'index.cmd' : 'index.sh';
  var psh  = path.join(__dirname, fsh);
  var fshe = pwin? 'heroku.cmd' : 'heroku';
  var pshe = path.join(phom, fshe);
  fs.copyFileSync(psh, pshe);
  cp.execSync(`chmod +x ${pshe}`);
  cp.execSync(`${pshe} --version`, {stdio});
}

function existsCli() {
  var phom = os.homedir();
  var pwin = os.platform()==='win32';
  var fshe = pwin? 'heroku.cmd' : 'heroku';
  var pshe = path.join(phom, fshe);
  return fs.existsSync(pshe);
}




function herokuCliSetup() {
  if (existsCli()) return;
  installCli();
  setupNetrc();
  exposeCli();
}
module.exports = herokuCliSetup;
if (require.main===module) herokuCliSetup();
