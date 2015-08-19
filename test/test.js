/* global QUnit, svgLocalstorage */

'use strict';

QUnit.module('SVG', {
	beforeEach: function() {
		localStorage.clear();
	}
});

QUnit.test('save in localStorage', function(assert) {
	var done = assert.async();

	function cb(data) {
		assert.equal(localStorage.getItem('SVGdata'), data);
		assert.equal(localStorage.getItem('SVGrev'), '0.1.0');
		done();
	}

	svgLocalstorage('/test/fixtures/sprite.svg', '0.1.0', cb);
});

QUnit.test('SVG added', function(assert) {
	var svg = document.querySelector('svg');
	assert.equal(svg.dataset.added, 'svg-icons');
	assert.equal(svgLocalstorage.addShim, false);
});
