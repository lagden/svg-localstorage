(function (global, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['exports', 'module'], factory);
	} else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
		factory(exports, module);
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, mod);
		global.svgLocalstorage = mod.exports;
	}
})(this, function (exports, module) {
	/* global window */

	'use strict';

	function req() {
		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		var XHR = args[0];
		var lS = args[1];
		var file = args[2];
		var revision = args[3];
		var SVGrev = args[4];
		var SVGdata = args[5];

		return new Promise(function (resolve, reject) {
			function transferComplete(event) {
				var t = event.target;
				t.removeEventListener('load', transferComplete, false);
				if (t.status >= 200 && t.status < 400) {
					var data = t.responseText;
					lS.setItem(SVGdata, data);
					lS.setItem(SVGrev, revision);
					resolve(data);
				} else {
					reject(Error(t.statusText));
				}
			}

			function transferFailed(event) {
				var t = event.target;
				t.removeEventListener('load', transferComplete, false);
				reject(Error('An error occurred while transferring the file.'));
			}

			function transferCanceled(event) {
				var t = event.target;
				t.removeEventListener('load', transferComplete, false);
				reject(Error('The transfer has been canceled by the user.'));
			}

			var request = new XHR();
			request.addEventListener('load', transferComplete, false);
			request.addEventListener('error', transferFailed, false);
			request.addEventListener('abort', transferCanceled, false);
			request.open('GET', file, true);
			request.send();
		});
	}

	function svgLocalstorage(file, revision) {
		var SVGrev = 'SVGrev';
		var SVGdata = 'SVGdata';

		var doc = window.document;
		var lS = window.localStorage;
		var XHR = window.XMLHttpRequest;

		var testA = !doc.createElementNS;
		var testB = !doc.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect;
		if (testA || testB) {
			if (svgLocalstorage.addShim === false) {
				svgLocalstorage.addShim = true;
				doc.createElement('svg');
				doc.createElement('use');
			}
		}

		if (lS.getItem(SVGrev) === revision) {
			var data = lS.getItem(SVGdata);
			if (data) {
				return Promise.resolve(data);
			}
			return Promise.reject(Error('Data not found'));
		}
		return req(XHR, lS, file, revision, SVGrev, SVGdata);
	}

	svgLocalstorage.addShim = false;

	module.exports = svgLocalstorage;
});
