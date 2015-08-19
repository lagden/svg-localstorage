/* global window */

'use strict';

function svgLocalstorage(file, revision, cbr = undefined) {
	cbr = (typeof cbr === 'function') ? cbr : () => false;
	let request;
	let data;
	let isListening = false;
	const [SVGrev, SVGdata] = ['SVGrev', 'SVGdata'];
	const doc = window.document;
	const lS = window.localStorage;
	const XHR = window.XMLHttpRequest;
	const add = () => {
		doc.body.insertAdjacentHTML('afterbegin', data);
		if (isListening) {
			doc.removeEventListener('DOMContentLoaded', add);
			isListening = false;
		}
	};
	const insert = () => {
		if (doc.body) {
			add();
		} else {
			isListening = true;
			doc.addEventListener('DOMContentLoaded', add);
		}
	};

	const testA = !doc.createElementNS;
	const testB = !doc.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect;
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
		request.onload = () => {
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

export default svgLocalstorage;
