const shell = require("shelljs");

function execAsync(cmd, opts = {}) {
  return new Promise(function (resolve, reject) {
    // Execute the command, reject if we exit non-zero (i.e. error)
    shell.exec(cmd, opts, function (code, stdout, stderr) {
      if (code !== 0) return reject(new Error(stderr));
      return resolve(stdout);
    });
  });
}

module.exports = { execAsync };
