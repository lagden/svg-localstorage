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
svgLocalStorage(window, 'svg-file.html', '123', svg => {
	console.log(svg);
});
```

### Dev

```
npm i
npm run build
npm test
```

### Can I use?

```
SVG (basic support) ✔ 93.05% ◒ 2.46% [W3C Recommendation]

  IE ✘ 5.5+ ✔ 9+²
  Edge ✔ ²
  Firefox ◒ 2+ ✔ 3+
  Chrome ✔
  Safari ◒ 3.1+ ✔ 3.2+
  Opera ✔

Web Storage - name/value pairs ✔ 92.75% ◒ 0.04% [W3C Recommendation]

  IE ✘ 5.5+ ✔ 8+
  Edge ✔
  Firefox ◒ 2+ ✔ 3.5+
  Chrome ✔
  Safari ✘ 3.1+ ✔ 4+
  Opera ✘ 9+ ✔ 10.5+
```

## License

MIT © [Thiago Lagden](http://lagden.in)
