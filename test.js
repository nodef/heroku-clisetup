var cp = require('child_process');
var os = require('os');

var id = path.basename(__dirname);
if(os.EOL==='\n') {
  console.log(`${id}: preparing test script ...`);
  cp.execSync(`tr -d '\r' <test.sh >test.cmd`);
  cp.execSync(`mv test.cmd test.sh`);
  cp.execSync('chmod +x test.sh');
}
console.log(`${id}: start test script ...`);
cp.execSync(`bash test.sh`, {'stdio': [0, 1, 2]});
