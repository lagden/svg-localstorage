/* global QUnit, window, svgLocalstorage */

'use strict';

QUnit.module('SVG', {
	beforeEach: function() {
		localStorage.clear();
	}
});

QUnit.test('save in localStorage', function(assert) {
	var done = assert.async();

	function cb(data) {
		assert.equal(localStorage.getItem('inlineSVGdata'), data);
		assert.equal(localStorage.getItem('inlineSVGrev'), '0.1.0');
		done();
	}

	svgLocalstorage(window, '/test/fixtures/svg.html', '0.1.0', cb);
});

QUnit.test('SVG added', function(assert) {
	var svg = document.querySelector('svg');
	assert.equal(svg.dataset.added, 'svg-icons');
});
