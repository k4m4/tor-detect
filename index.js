'use strict'
const fs          = require('fs')
const path        = require('path')
const arrify      = require('arrify');
const pAny        = require('p-any');
const pTimeout    = require('p-timeout');
const ipRegex     = require('ip-regex');

const fetchIPs    = require('./fetch-ips')
fetchIPs.fetch();

const listPath = path.join(__dirname, 'ips.json')
const ips = JSON.parse(fs.readFileSync(listPath, 'utf8')).map(validateIP)

function validateIP (str) {
  var ip = str.trim();
  if (!ipRegex().test(ip)) {
    return;
  }
  return ip;
}

function isTor (target) {
  var address = validateIP(target);
  if (!address) {
    return false
  }
  return ips.some((ip) => target.indexOf(ip) > -1);
}

module.exports = (dests, opts) => {
  opts = opts || {};
  opts.timeout = typeof opts.timeout === 'number' ? opts.timeout : 5000;

  const p = pAny(arrify(dests).map(isTor));
  return pTimeout(p, opts.timeout).catch(() => false);
};