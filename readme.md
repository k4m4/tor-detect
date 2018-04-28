# tor-detect [![Build Status](https://travis-ci.org/k4m4/tor-detect.svg?branch=master)](https://travis-ci.org/k4m4/tor-detect)

> Detect whether an IP address belongs to a Tor exit node.

## Install

```
~ ❯❯❯ npm install --save tor-detect
```


## Usage

```js
const torDetect = require('tor-detect');

torDetect('176.31.45.3').then(tor => {
	console.log(tor);
	//=> true
});

torDetect('8.8.8.8').then(tor => {
	console.log(tor);
	//=> false
});
```


## API

### torDetect(targets, [options])

Returns a `Promise` for a `boolean` which is `true` if any of the `targets` belong to Tor.

#### targets

Type: `string` `Array`

#### options

##### timeout

Type: `number`

Timeout in milliseconds after which a request is considered failed. Default: `5000`.

## Credits

- [check.torproject.org](https://check.torproject.org/cgi-bin/TorBulkExitList.py?ip=1.1.1.1) - A list of all Tor exit nodes from the past 16 hours that can contact 1.1.1.1 on port 80
- [dan.me.uk](https://www.dan.me.uk/torlist/) - A page containing a full TOR nodelist.

## Related

- [tor-detect.now](https://github.com/k4m4/tor-detect.now) - A minimal service to check whether a visitor is running behing Tor (coming soon).

## License

MIT © [Nikolaos Kamarinakis](https://nikolaskama.me/)