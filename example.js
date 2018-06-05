require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var ImageMapper = require('react-image-mapper');

var MAP = {
	name: 'my-map',
	areas: [{ shape: 'poly', coords: [25, 33, 27, 300, 128, 240, 128, 94] }, { shape: 'poly', coords: [219, 118, 220, 210, 283, 210, 284, 119] }, { shape: 'poly', coords: [381, 241, 383, 94, 462, 53, 457, 282] }, { shape: 'poly', coords: [245, 285, 290, 285, 274, 239, 249, 238] }]
};

var URL = 'https://c1.staticflickr.com/5/4052/4503898393_303cfbc9fd_b.jpg';

var App = React.createClass({
	displayName: 'App',

	getInitialState: function getInitialState() {
		return { msg: null };
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
		this.setState({ msg: 'You entered ' + area.shape + ' at coords ' + JSON.stringify(area.coords) + ' !' });
	},
	leaveArea: function leaveArea(area) {
		this.setState({ msg: 'You leaved ' + area.shape + ' at coords ' + JSON.stringify(area.coords) + ' !' });
	},
	render: function render() {
		var _this = this;

		return React.createElement(
			'div',
			null,
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
					'\n<ImageMapper src={URL} map={MAP} width={500}\n\tonLoad={() => this.load()}\n\tonClick={area => this.clicked(area)}\n\tonMouseEnter={area => this.enterArea(area)}\n\tonMouseLeave={area => this.leaveArea(area)}\n\tonImageClick={evt => this.clickedOutside(evt)}\n/>\n\t\t\t\t'
				)
			),
			React.createElement(
				'pre',
				null,
				React.createElement(
					'code',
					{ className: 'json' },
					'URL = "https://c1.staticflickr.com/5/4052/4503898393_303cfbc9fd_b.jpg"\n' + 'MAP = {\n' + '  name: "my-map",\n' + '  areas: [\n' + '    { shape: "poly", coords: [25,33,27,300,128,240,128,94] },\n' + '    { shape: "poly", coords: [219,118,220,210,283,210,284,119] },\n' + '    { shape: "poly", coords: [381,241,383,94,462,53,457,282] },\n' + '    { shape: "poly", coords: [245,285,290,285,274,239,249,238] },\n' + '  ]\n}'
				)
			)
		);
	}
});

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));

},{"react":undefined,"react-dom":undefined,"react-image-mapper":undefined}]},{},[1]);
