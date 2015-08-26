/* global QUnit, svgLocalstorage */

'use strict';

QUnit.module('SVG', {
	beforeEach: function() {
		localStorage.clear();
	}
});

QUnit.test('save in Local Storage and add data on DOM', function(assert) {
	var done = assert.async();

	function cb(data) {
		var svg;
		document.body.insertAdjacentHTML('afterbegin', data);
		svg = document.querySelector('svg');
		assert.equal(svg.dataset.added, 'svg-icons');
		assert.equal(svgLocalstorage.addShim, false);
		assert.equal(localStorage.getItem('SVGdata'), data);
		assert.equal(localStorage.getItem('SVGrev'), '0.1.0');
		done();
	}

	svgLocalstorage('/test/fixtures/sprite.svg', '0.1.0').then(cb);
});
