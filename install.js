var os = require('os');
var fs = require('fs');

fs.writeFileSync('arch.txt', os.arch());
fs.writeFileSync('platform.txt', os.platform().replace('win32', 'windows'));
