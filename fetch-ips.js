'use strict';
const fs      = require('fs');
const path    = require('path');
const fetch   = require('node-fetch');

const urls = {
  torproject: 'https://check.torproject.org/cgi-bin/TorBulkExitList.py?ip=1.1.1.1',
  dan: 'https://www.dan.me.uk/torlist/'
}

function write (path, text) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, text, (err) => err ? reject(err) : resolve());
  });
}

function fetchIPs (url) {
  return fetch(url)
    .then(res => res.text())
    .then(text => text.split('\n').filter(Boolean));
}

module.exports = {
    fetch: function() {
      Promise.all([fetchIPs(urls.torproject), fetchIPs(urls.dan)])
        .then((ips) => { 
          const [torproject, dan] = ips;
          if (torproject.length === 0 || dan.length === 0) {
            throw new Error('a list was empty');
          }
          const outPath = path.join(__dirname, 'ips.json');
          const json = JSON.stringify([...torproject, ...dan], null, '  ');
          return write(outPath, json);
        })
        .catch((err) => console.error(err.stack))
      }
}