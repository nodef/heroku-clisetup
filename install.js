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
  var dtmp = 'tmp-heroku-cli-setup';
  var ptmp = path.join(phom, dtmp);
  fs.mkdirSync(ptmp, {recursive: true});
  var url  = installUrl();
  var fout = 'heroku-cli.tar.gz';
  var pout = path.join(ptmp, fout);
  process.chdir(ptmp);
  if (os.platform()!=='win32') cp.execSync(`wget -nv -O ${fout} "${url}"`, {cwd: ptmp, stdio});
  else cp.execSync(`powershell -command "& { iwr ${url} -OutFile ${fout} }"`, {cwd: ptmp, stdio});
  cp.execSync(`tar -xzf ${fout}`, {cwd: ptmp, stdio});
  fs.unlinkSync(pout);
  var dpkg = fs.readdirSync(ptmp)[0];
  var ppkg = path.join(ptmp, dpkg);
  fs.renameSync(ppkg, pcli);
  fs.rmSync(ptmp, {recursive: true});
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
  var psh  = path.join(__dirname, 'index.sh');
  var pshe = path.join(phom, 'heroku');
  fs.copyFileSync(psh, pshe);
  cp.execSync(`${pshe} --version`, {stdio});
}




function main() {
  installCli();
  setupNetrc();
  exposeCli();
}
main();
