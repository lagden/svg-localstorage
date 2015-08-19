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

	function svgLocalstorage(file, revision) {
		var cbr = arguments.length <= 2 || arguments[2] === undefined ? undefined : arguments[2];

		cbr = typeof cbr === 'function' ? cbr : function () {
			return false;
		};
		var request = undefined;
		var data = undefined;
		var isListening = false;
		var SVGrev = 'SVGrev';
		var SVGdata = 'SVGdata';

		var doc = window.document;
		var lS = window.localStorage;
		var XHR = window.XMLHttpRequest;
		var add = function add() {
			doc.body.insertAdjacentHTML('afterbegin', data);
			if (isListening) {
				doc.removeEventListener('DOMContentLoaded', add);
				isListening = false;
			}
		};
		var insert = function insert() {
			if (doc.body) {
				add();
			} else {
				isListening = true;
				doc.addEventListener('DOMContentLoaded', add);
			}
		};

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
			data = lS.getItem(SVGdata);
			if (data) {
				insert();
				cbr(data);
			}
		} else {
			request = new XHR();
			request.open('GET', file, true);
			request.onload = function () {
				if (request.status >= 200 && request.status < 400) {
					data = request.responseText;
					lS.setItem(SVGdata, data);
					lS.setItem(SVGrev, revision);
					insert();
					cbr(data);
				}
			};
			request.send();
		}
	}

	svgLocalstorage.addShim = false;

	module.exports = svgLocalstorage;
});
