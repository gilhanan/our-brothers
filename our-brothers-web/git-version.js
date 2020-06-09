const fs = require('fs');
const rxjs = require('rxjs');

const Observable = rxjs.Observable;

let exec = require('child_process').exec;

const revision = new Observable(s => {
  exec('git rev-parse --short HEAD', function(error, stdout, stderr) {
    if (error !== null) {
      console.log('git error: ' + error + stderr);
    }
    s.next(stdout.toString().trim());
    s.complete();
  });
});

const branch = new Observable(s => {
  exec('git rev-parse --abbrev-ref HEAD', function(error, stdout, stderr) {
    if (error !== null) {
      console.log('git error: ' + error + stderr);
    }
    s.next(stdout.toString().trim());
    s.complete();
  });
});

rxjs.combineLatest(revision, branch).subscribe(([revision, branch]) => {
  const now = new Date()
    .toISOString()
    .split('.')[0]
    .replace('T', ' ');

  const versions = {
    version: process.env.npm_package_version,
    revision: revision,
    branch: branch,
    date: now
  };

  console.log(JSON.stringify(versions));

  const content = JSON.stringify(versions);

  fs.writeFileSync('src/environments/versions.json', content, { encoding: 'utf8' });
});
