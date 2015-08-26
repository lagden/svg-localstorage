/* global window */

'use strict';

function req(...args) {
	const [XHR, lS, file, revision, SVGrev, SVGdata] = args;
	return new Promise((resolve, reject) => {
		function transferComplete(event) {
			const t = event.target;
			t.removeEventListener('load', transferComplete, false);
			if (t.status >= 200 && t.status < 400) {
				const data = t.responseText;
				lS.setItem(SVGdata, data);
				lS.setItem(SVGrev, revision);
				resolve(data);
			} else {
				reject(Error(t.statusText));
			}
		}

		function transferFailed(event) {
			const t = event.target;
			t.removeEventListener('load', transferComplete, false);
			reject(Error('An error occurred while transferring the file.'));
		}

		function transferCanceled(event) {
			const t = event.target;
			t.removeEventListener('load', transferComplete, false);
			reject(Error('The transfer has been canceled by the user.'));
		}

		const request = new XHR();
		request.addEventListener('load', transferComplete, false);
		request.addEventListener('error', transferFailed, false);
		request.addEventListener('abort', transferCanceled, false);
		request.open('GET', file, true);
		request.send();
	});
}

function svgLocalstorage(file, revision) {
	const [SVGrev, SVGdata] = ['SVGrev', 'SVGdata'];
	const doc = window.document;
	const lS = window.localStorage;
	const XHR = window.XMLHttpRequest;

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
		const data = lS.getItem(SVGdata);
		if (data) {
			return Promise.resolve(data);
		}
		return Promise.reject(Error('Data not found'));
	}
	return req(XHR, lS, file, revision, SVGrev, SVGdata);
}

svgLocalstorage.addShim = false;

export default svgLocalstorage;
