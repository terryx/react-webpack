var env = process.env.npm_config_env;

if (!env) {
  console.log('Please specify an environment such as --env=production');
  return;
}

var child_process = require('child_process');

child_process.exec('npm run ' + env, function(err, stdout, stderr) {
  if (err !== null) {
    console.log('exec error: ' + err);
  }

  console.log('stdout: ' + stdout);
  return;
});
