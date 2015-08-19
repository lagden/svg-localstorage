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
	'use strict';

	function svgLocalstorage(window, file, revision) {
		var cbr = arguments.length <= 3 || arguments[3] === undefined ? undefined : arguments[3];

		cbr = typeof cbr === 'function' ? cbr : function () {
			return false;
		};
		var request = undefined;
		var data = undefined;
		var isListening = false;
		var document = window.document;
		var localStorage = window.localStorage;
		var XMLHttpRequest = window.XMLHttpRequest;
		var add = function add() {
			document.body.insertAdjacentHTML('afterbegin', data);
			if (isListening) {
				document.removeEventListener('DOMContentLoaded', add);
				isListening = false;
			}
		};
		var insert = function insert() {
			if (document.body) {
				add();
			} else {
				isListening = true;
				document.addEventListener('DOMContentLoaded', add);
			}
		};

		if (localStorage.getItem('inlineSVGrev') === revision) {
			data = localStorage.getItem('inlineSVGdata');
			if (data) {
				insert();
				cbr(data);
			}
		} else {
			request = new XMLHttpRequest();
			request.open('GET', file, true);
			request.onload = function () {
				if (request.status >= 200 && request.status < 400) {
					data = request.responseText;
					localStorage.setItem('inlineSVGdata', data);
					localStorage.setItem('inlineSVGrev', revision);
					insert();
					cbr(data);
				}
			};
			request.send();
		}
	}

	module.exports = svgLocalstorage;
});
