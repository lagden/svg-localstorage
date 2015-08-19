# SVG Local Storage [![Build Status](https://travis-ci.org/lagden/svg-localstorage.svg?branch=master)](https://travis-ci.org/lagden/svg-localstorage)

> Plugin to caching SVG sprite in localstorage

## Install

Via [NPM](http://.npmjs.com/)

```
npm i svg-localstorage --save
```


### Usage

It's very simple.

```javascript
svgLocalStorage(window, 'sprite.svg', '0.1.0', function cb(data) {
	console.log('--->optional', data);
});
```

### Dev

```
npm i
npm run build
npm test
```


## License

MIT © [Thiago Lagden](http://lagden.in)
