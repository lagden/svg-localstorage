'use strict';

function svgLocalstorage(window, file, revision, cbr = undefined) {
	cbr = (typeof cbr === 'function') ? cbr : () => false;
	let request;
	let data;
	let isListening = false;
	const document = window.document;
	const localStorage = window.localStorage;
	const XMLHttpRequest = window.XMLHttpRequest;
	const add = () => {
		document.body.insertAdjacentHTML('afterbegin', data);
		if (isListening) {
			document.removeEventListener('DOMContentLoaded', add);
			isListening = false;
		}
	};
	const insert = () => {
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
		request.onload = () => {
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

export default svgLocalstorage;
