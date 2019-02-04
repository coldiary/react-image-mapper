require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var ReactDOM = require('react-dom');
var ImageMapper = require('react-image-mapper');

var MAP = {
	name: 'my-map',
	areas: [{ name: '1', shape: 'poly', coords: [25, 33, 27, 300, 128, 240, 128, 94], preFillColor: 'green', fillColor: 'blue' }, { name: '2', shape: 'poly', coords: [219, 118, 220, 210, 283, 210, 284, 119], preFillColor: 'pink' }, { name: '3', shape: 'poly', coords: [381, 241, 383, 94, 462, 53, 457, 282], fillColor: 'yellow' }, { name: '4', shape: 'poly', coords: [245, 285, 290, 285, 274, 239, 249, 238], preFillColor: 'red' }]
};

var URL = 'https://c1.staticflickr.com/5/4052/4503898393_303cfbc9fd_b.jpg';

var App = React.createClass({
	displayName: 'App',

	getInitialState: function getInitialState() {
		return { hoveredArea: null, msg: null };
	},
	load: function load() {
		this.setState({ msg: 'Interact with image !' });
	},
	clicked: function clicked(area) {
		this.setState({ msg: 'You clicked on ' + area.shape + ' at coords ' + JSON.stringify(area.coords) + ' !' });
	},
	clickedOutside: function clickedOutside(evt) {
		var coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
		this.setState({ msg: 'You clicked on the image at coords ' + JSON.stringify(coords) + ' !' });
	},
	enterArea: function enterArea(area) {
		this.setState({ hoveredArea: area, msg: 'You entered ' + area.shape + ' at coords ' + JSON.stringify(area.coords) + ' !' });
	},
	leaveArea: function leaveArea(area) {
		this.setState({ hoveredArea: null, msg: 'You leaved ' + area.shape + ' at coords ' + JSON.stringify(area.coords) + ' !' });
	},

	getTipPosition: function getTipPosition(area) {
		if (!area) return { top: 0, left: 0 };
		// Calculate centroid
		var n = area.coords.length / 2;

		var _area$coords$reduce = area.coords.reduce(function (_ref, val, idx) {
			var y = _ref.y;
			var x = _ref.x;

			return !(idx % 2) ? { y: y, x: x + val / n } : { y: y + val / n, x: x };
		}, { y: 0, x: 0 });

		var y = _area$coords$reduce.y;
		var x = _area$coords$reduce.x;

		return { top: y + 'px', left: x + 'px' };
	},

	render: function render() {
		var _this = this;

		return React.createElement(
			'div',
			null,
			React.createElement(
				'div',
				{ style: { position: 'relative' } },
				React.createElement(ImageMapper, { src: URL, map: MAP, width: 500,
					onLoad: function () {
						return _this.load();
					},
					onClick: function (area) {
						return _this.clicked(area);
					},
					onMouseEnter: function (area) {
						return _this.enterArea(area);
					},
					onMouseLeave: function (area) {
						return _this.leaveArea(area);
					},
					onImageClick: function (evt) {
						return _this.clickedOutside(evt);
					}
				}),
				this.state.hoveredArea && React.createElement(
					'span',
					{ className: 'tooltip', style: _extends({}, this.getTipPosition(this.state.hoveredArea)) },
					this.state.hoveredArea && this.state.hoveredArea.name
				)
			),
			React.createElement(
				'pre',
				null,
				this.state.msg ? this.state.msg : null
			),
			React.createElement(
				'pre',
				null,
				React.createElement(
					'code',
					null,
					'<ImageMapper src={URL} map={MAP} width={500}\n' + '    onLoad={() => this.load()}\n' + '    onClick={area => this.clicked(area)}\n' + '    onMouseEnter={area => this.enterArea(area)}\n' + '    onMouseLeave={area => this.leaveArea(area)}\n' + '    onImageClick={evt => this.clickedOutside(evt)}\n' + '/>\n'
				)
			),
			React.createElement(
				'pre',
				null,
				React.createElement(
					'code',
					{ className: 'json' },
					'URL = "https://c1.staticflickr.com/5/4052/4503898393_303cfbc9fd_b.jpg"\n' + 'MAP = {\n' + '  name: "my-map",\n' + '  areas: [\n' + '    { name: "1", shape: "poly", coords: [25,33,27,300,128,240,128,94], preFillColor: "green", fillColor: "blue"  },\n' + '    { name: "2", shape: "poly", coords: [219,118,220,210,283,210,284,119], preFillColor: "pink"  },\n' + '    { name: "3", shape: "poly", coords: [381,241,383,94,462,53,457,282], fillColor: "yellow"  },\n' + '    { name: "4", shape: "poly", coords: [245,285,290,285,274,239,249,238], preFillColor: "red"  },\n' + '  ]\n}'
				)
			),
			'Example with custom tooltips:',
			React.createElement(
				'pre',
				null,
				React.createElement(
					'code',
					null,
					'<div className="container">\n' + '    <ImageMapper src={URL} map={MAP} width={500}\n' + '    	onLoad={() => this.load()}\n' + '    	onClick={area => this.clicked(area)}\n' + '    	onMouseEnter={area => this.enterArea(area)}\n' + '    	onMouseLeave={area => this.leaveArea(area)}\n' + '    	onImageClick={evt => this.clickedOutside(evt)}\n' + '    />\n' + '    {\n' + '    	this.state.hoveredArea &&\n' + '    	<span className="tooltip" style={{ ...this.getTipPosition(this.state.hoveredArea)}}>\n' + '    		{ this.state.hoveredArea && this.state.hoveredArea.name}\n' + '    	</span>\n' + '    }\n' + '</div>\n'
				)
			),
			React.createElement(
				'pre',
				null,
				React.createElement(
					'code',
					{ className: 'js' },
					'getTipPosition(area) {\n' + '    if (!area) return { top: 0, left: 0 };\n' + '    // Calculate centroid\n' + '    const n = area.coords.length / 2;\n' + '    const { y, x } = area.coords.reduce(({ y, x }, val, idx) => {\n' + '    	return !(idx % 2) ? { y, x: x + (val / n) } : { y: y + (val / n), x };\n' + '    }, { y: 0, x: 0 });\n' + '    return { top: `${y}px`, left: `${x}px` };\n' + '},\n'
				)
			),
			React.createElement(
				'pre',
				null,
				React.createElement(
					'code',
					{ className: 'css' },
					'.container {\n' + '    position: relative;\n' + '}\n\n' + '.tooltip {\n' + '    position: absolute;\n' + '    color: #fff;\n' + '    padding: 10px;\n' + '    background: rgba(0,0,0,0.8);\n' + '    transform: translate3d(-50%, -50%, 0);\n' + '    border-radius: 5px;\n' + '    pointer-events: none;\n' + '    zIndex: 1000;\n' + '}\n'
				)
			)
		);
	}
});

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));

},{"react":undefined,"react-dom":undefined,"react-image-mapper":undefined}]},{},[1]);
