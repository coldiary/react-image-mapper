'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var ImageMapper = (function (_Component) {
	_inherits(ImageMapper, _Component);

	function ImageMapper(props) {
		var _this = this;

		_classCallCheck(this, ImageMapper);

		_get(Object.getPrototypeOf(ImageMapper.prototype), 'constructor', this).call(this, props);
		['drawrect', 'drawcircle', 'drawpoly', 'initCanvas'].forEach(function (f) {
			return _this[f] = _this[f].bind(_this);
		});
		var absPos = { position: 'absolute', top: 0, left: 0 };
		this.styles = {
			container: { position: 'relative' },
			canvas: _extends({}, absPos, { pointerEvents: 'none', zIndex: 2 }),
			img: _extends({}, absPos, { zIndex: 1, userSelect: 'none' }),
			map: props.onClick && { cursor: 'pointer' } || undefined
		};
	}

	_createClass(ImageMapper, [{
		key: 'drawrect',
		value: function drawrect(coord) {
			coord = coord.split(',');
			var _coord = coord;

			var _coord2 = _slicedToArray(_coord, 4);

			var left = _coord2[0];
			var top = _coord2[1];
			var right = _coord2[2];
			var bot = _coord2[3];

			this.ctx.strokeRect(left, top, right - left, bot - top);
			this.ctx.fillRect(left, top, right - left, bot - top);
		}
	}, {
		key: 'drawcircle',
		value: function drawcircle(coords) {
			coords = coords.split(',');
			this.ctx.beginPath();
			this.ctx.arc(coords[0], coords[1], coords[2], 0, 2 * Math.PI);
			this.ctx.closePath();
			this.ctx.stroke();
			this.ctx.fill();
		}
	}, {
		key: 'drawpoly',
		value: function drawpoly(coords) {
			var _this2 = this;

			coords = coords.split(',').reduce(function (a, v, i, s) {
				return i % 2 ? a : [].concat(_toConsumableArray(a), [s.slice(i, i + 2)]);
			}, []);
			this.ctx.beginPath();
			var first = coords.unshift();
			this.ctx.moveTo(first[0], first[1]);
			coords.forEach(function (c) {
				return _this2.ctx.lineTo(c[0], c[1]);
			});
			this.ctx.closePath();
			this.ctx.stroke();
			this.ctx.fill();
		}
	}, {
		key: 'initCanvas',
		value: function initCanvas() {
			if (this.props.width) this.img.width = this.props.width;
			if (this.props.height) this.img.height = this.props.height;
			this.canvas.width = this.props.width || this.img.clientWidth;
			this.canvas.height = this.props.height || this.img.clientHeight;
			this.container.style.width = (this.props.width || this.img.clientWidth) + 'px';
			this.container.style.height = (this.props.height || this.img.clientHeight) + 'px';
			this.ctx = this.canvas.getContext('2d');
			this.ctx.fillStyle = this.props.fillColor;
			this.ctx.strokeStyle = this.props.strokeColor;
			this.ctx.lineWidth = this.props.lineWidth;
			if (this.props.onLoad) this.props.onLoad();
		}
	}, {
		key: 'hoverOn',
		value: function hoverOn(area, index, event) {
			var shape = event.target.getAttribute('shape');
			if (this.props.active && this['draw' + shape]) this['draw' + shape](event.target.getAttribute('coords'));
			if (this.props.onMouseEnter) this.props.onMouseEnter(area, index, event);
		}
	}, {
		key: 'hoverOff',
		value: function hoverOff(area, index, event) {
			if (this.props.active) this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			if (this.props.onMouseLeave) this.props.onMouseLeave(area, index, event);
		}
	}, {
		key: 'click',
		value: function click(area, index, event) {
			if (this.props.onClick) {
				event.preventDefault();
				this.props.onClick(area, index, event);
			}
		}
	}, {
		key: 'renderAreas',
		value: function renderAreas() {
			var _this3 = this;

			return this.props.map.areas.map(function (area, index) {
				return _react2['default'].createElement('area', { key: area._id || index, shape: area.shape, coords: area.coords.join(','),
					onMouseEnter: _this3.hoverOn.bind(_this3, area, index),
					onMouseLeave: _this3.hoverOff.bind(_this3, area, index),
					onClick: _this3.click.bind(_this3, area, index), href: area.href });
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _this4 = this;

			return _react2['default'].createElement(
				'div',
				{ style: this.styles.container, ref: function (node) {
						return _this4.container = node;
					} },
				_react2['default'].createElement('img', { style: this.styles.img, src: this.props.src, useMap: '#' + this.props.map.name, alt: '',
					ref: function (node) {
						return _this4.img = node;
					}, onLoad: this.initCanvas,
					onClick: this.props.onImageClick }),
				_react2['default'].createElement('canvas', { ref: function (node) {
						return _this4.canvas = node;
					}, style: this.styles.canvas }),
				_react2['default'].createElement(
					'map',
					{ name: this.props.map.name, style: this.styles.map },
					this.renderAreas()
				)
			);
		}
	}]);

	return ImageMapper;
})(_react.Component);

exports['default'] = ImageMapper;

ImageMapper.defaultProps = {
	active: true,
	fillColor: 'rgba(255, 255, 255, 0.5)',
	lineWidth: 1,
	map: {
		areas: [],
		name: 'image-map-' + Math.random()
	},
	strokeColor: 'rgba(0, 0, 0, 0.5)'
};

ImageMapper.propTypes = {
	active: _propTypes2['default'].bool,
	fillColor: _propTypes2['default'].string,
	height: _propTypes2['default'].number,
	lineWidth: _propTypes2['default'].number,
	map: _propTypes2['default'].shape({
		areas: _propTypes2['default'].arrayOf(_propTypes2['default'].shape({
			area: _propTypes2['default'].shape({
				coords: _propTypes2['default'].arrayOf(_propTypes2['default'].number),
				href: _propTypes2['default'].string,
				shape: _propTypes2['default'].string
			})
		})),
		name: _propTypes2['default'].string
	}),
	onClick: _propTypes2['default'].func,
	onImageClick: _propTypes2['default'].func,
	onLoad: _propTypes2['default'].func,
	onMouseEnter: _propTypes2['default'].func,
	onMouseLeave: _propTypes2['default'].func,
	src: _propTypes2['default'].string.isRequired,
	strokeColor: _propTypes2['default'].string,
	width: _propTypes2['default'].number
};
module.exports = exports['default'];