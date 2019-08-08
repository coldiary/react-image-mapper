"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactFastCompare = require("react-fast-compare");

var _reactFastCompare2 = _interopRequireDefault(_reactFastCompare);

var ImageMapper = (function (_Component) {
	_inherits(ImageMapper, _Component);

	function ImageMapper(props) {
		var _this = this;

		_classCallCheck(this, ImageMapper);

		_get(Object.getPrototypeOf(ImageMapper.prototype), "constructor", this).call(this, props);
		["drawrect", "drawcircle", "drawpoly", "initCanvas", "renderPrefilledAreas"].forEach(function (f) {
			return _this[f] = _this[f].bind(_this);
		});
		var absPos = { position: "absolute", top: 0, left: 0 };
		this.styles = {
			container: { position: "relative" },
			canvas: _extends({}, absPos, { pointerEvents: "none", zIndex: 2 }),
			img: _extends({}, absPos, { zIndex: 1, userSelect: "none" }),
			map: props.onClick && { cursor: "pointer" } || undefined
		};
		// Props watched for changes to trigger update
		this.watchedProps = ["active", "fillColor", "height", "imgWidth", "lineWidth", "src", "strokeColor", "width"];
	}

	_createClass(ImageMapper, [{
		key: "shouldComponentUpdate",
		value: function shouldComponentUpdate(nextProps) {
			var _this2 = this;

			var propChanged = this.watchedProps.some(function (prop) {
				return _this2.props[prop] !== nextProps[prop];
			});
			return !(0, _reactFastCompare2["default"])(this.props.map, this.state.map) || propChanged;
		}
	}, {
		key: "componentWillMount",
		value: function componentWillMount() {
			this.updateCacheMap();
		}
	}, {
		key: "updateCacheMap",
		value: function updateCacheMap() {
			this.setState({ map: JSON.parse(JSON.stringify(this.props.map)) }, this.initCanvas);
		}
	}, {
		key: "componentDidUpdate",
		value: function componentDidUpdate() {
			this.updateCacheMap();
			this.initCanvas();
		}
	}, {
		key: "drawrect",
		value: function drawrect(coords, fillColor, lineWidth, strokeColor) {
			var _coords = _slicedToArray(coords, 4);

			var left = _coords[0];
			var top = _coords[1];
			var right = _coords[2];
			var bot = _coords[3];

			this.ctx.fillStyle = fillColor;
			this.ctx.lineWidth = lineWidth;
			this.ctx.strokeStyle = strokeColor;
			this.ctx.strokeRect(left, top, right - left, bot - top);
			this.ctx.fillRect(left, top, right - left, bot - top);
			this.ctx.fillStyle = this.props.fillColor;
		}
	}, {
		key: "drawcircle",
		value: function drawcircle(coords, fillColor, lineWidth, strokeColor) {
			this.ctx.fillStyle = fillColor;
			this.ctx.beginPath();
			this.ctx.lineWidth = lineWidth;
			this.ctx.strokeStyle = strokeColor;
			this.ctx.arc(coords[0], coords[1], coords[2], 0, 2 * Math.PI);
			this.ctx.closePath();
			this.ctx.stroke();
			this.ctx.fill();
			this.ctx.fillStyle = this.props.fillColor;
		}
	}, {
		key: "drawpoly",
		value: function drawpoly(coords, fillColor, lineWidth, strokeColor) {
			var _this3 = this;

			coords = coords.reduce(function (a, v, i, s) {
				return i % 2 ? a : [].concat(_toConsumableArray(a), [s.slice(i, i + 2)]);
			}, []);

			this.ctx.fillStyle = fillColor;
			this.ctx.beginPath();
			this.ctx.lineWidth = lineWidth;
			this.ctx.strokeStyle = strokeColor;
			var first = coords.unshift();
			this.ctx.moveTo(first[0], first[1]);
			coords.forEach(function (c) {
				return _this3.ctx.lineTo(c[0], c[1]);
			});
			this.ctx.closePath();
			this.ctx.stroke();
			this.ctx.fill();
			this.ctx.fillStyle = this.props.fillColor;
		}
	}, {
		key: "initCanvas",
		value: function initCanvas() {
			if (this.props.width) this.img.width = this.props.width;

			if (this.props.height) this.img.height = this.props.height;

			this.canvas.width = this.props.width || this.img.clientWidth;
			this.canvas.height = this.props.height || this.img.clientHeight;
			this.container.style.width = (this.props.width || this.img.clientWidth) + "px";
			this.container.style.height = (this.props.height || this.img.clientHeight) + "px";
			this.ctx = this.canvas.getContext("2d");
			this.ctx.fillStyle = this.props.fillColor;
			//this.ctx.strokeStyle = this.props.strokeColor;

			if (this.props.onLoad) this.props.onLoad();

			this.renderPrefilledAreas();
		}
	}, {
		key: "hoverOn",
		value: function hoverOn(area, index, event) {
			var shape = event.target.getAttribute("shape");

			if (this.props.active && this["draw" + shape]) {
				this["draw" + shape](event.target.getAttribute("coords").split(","), area.fillColor, area.lineWidth || this.props.lineWidth, area.strokeColor || this.props.strokeColor);
			}
			if (this.props.onMouseEnter) this.props.onMouseEnter(area, index, event);
		}
	}, {
		key: "hoverOff",
		value: function hoverOff(area, index, event) {
			if (this.props.active) {
				this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
				this.renderPrefilledAreas();
			}

			if (this.props.onMouseLeave) this.props.onMouseLeave(area, index, event);
		}
	}, {
		key: "click",
		value: function click(area, index, event) {
			if (this.props.onClick) {
				event.preventDefault();
				this.props.onClick(area, index, event);
			}
		}
	}, {
		key: "imageClick",
		value: function imageClick(event) {
			if (this.props.onImageClick) {
				event.preventDefault();
				this.props.onImageClick(event);
			}
		}
	}, {
		key: "mouseMove",
		value: function mouseMove(area, index, event) {
			if (this.props.onMouseMove) {
				this.props.onMouseMove(area, index, event);
			}
		}
	}, {
		key: "imageMouseMove",
		value: function imageMouseMove(area, index, event) {
			if (this.props.onImageMouseMove) {
				this.props.onImageMouseMove(area, index, event);
			}
		}
	}, {
		key: "scaleCoords",
		value: function scaleCoords(coords) {
			var _props = this.props;
			var imgWidth = _props.imgWidth;
			var width = _props.width;

			// calculate scale based on current 'width' and the original 'imgWidth'
			var scale = width && imgWidth && imgWidth > 0 ? width / imgWidth : 1;
			return coords.map(function (coord) {
				return coord * scale;
			});
		}
	}, {
		key: "renderPrefilledAreas",
		value: function renderPrefilledAreas() {
			var _this4 = this;

			this.state.map.areas.map(function (area) {
				if (!area.preFillColor) return;
				_this4["draw" + area.shape](_this4.scaleCoords(area.coords), area.preFillColor, area.lineWidth || _this4.props.lineWidth, area.strokeColor || _this4.props.strokeColor);
			});
		}
	}, {
		key: "computeCenter",
		value: function computeCenter(area) {
			if (!area) return [0, 0];

			var scaledCoords = this.scaleCoords(area.coords);

			switch (area.shape) {
				case "circle":
					return [scaledCoords[0], scaledCoords[1]];
				case "poly":
				case "rect":
				default:
					{
						var _ret = (function () {
							// Calculate centroid
							var n = scaledCoords.length / 2;

							var _scaledCoords$reduce = scaledCoords.reduce(function (_ref, val, idx) {
								var y = _ref.y;
								var x = _ref.x;

								return !(idx % 2) ? { y: y, x: x + val / n } : { y: y + val / n, x: x };
							}, { y: 0, x: 0 });

							var y = _scaledCoords$reduce.y;
							var x = _scaledCoords$reduce.x;

							return {
								v: [x, y]
							};
						})();

						if (typeof _ret === "object") return _ret.v;
					}
			}
		}
	}, {
		key: "renderAreas",
		value: function renderAreas() {
			var _this5 = this;

			return this.state.map.areas.map(function (area, index) {
				var scaledCoords = _this5.scaleCoords(area.coords);
				var center = _this5.computeCenter(area);
				var extendedArea = _extends({}, area, { scaledCoords: scaledCoords, center: center });
				return _react2["default"].createElement("area", {
					key: area._id || index,
					shape: area.shape,
					coords: scaledCoords.join(","),
					onMouseEnter: _this5.hoverOn.bind(_this5, extendedArea, index),
					onMouseLeave: _this5.hoverOff.bind(_this5, extendedArea, index),
					onMouseMove: _this5.mouseMove.bind(_this5, extendedArea, index),
					onClick: _this5.click.bind(_this5, extendedArea, index),
					href: area.href
				});
			});
		}
	}, {
		key: "render",
		value: function render() {
			var _this6 = this;

			return _react2["default"].createElement(
				"div",
				{ style: this.styles.container, ref: function (node) {
						return _this6.container = node;
					} },
				_react2["default"].createElement("img", {
					style: this.styles.img,
					src: this.props.src,
					useMap: "#" + this.state.map.name,
					alt: "",
					ref: function (node) {
						return _this6.img = node;
					},
					onLoad: this.initCanvas,
					onClick: this.imageClick.bind(this),
					onMouseMove: this.imageMouseMove.bind(this)
				}),
				_react2["default"].createElement("canvas", { ref: function (node) {
						return _this6.canvas = node;
					}, style: this.styles.canvas }),
				_react2["default"].createElement(
					"map",
					{ name: this.state.map.name, style: this.styles.map },
					this.renderAreas()
				)
			);
		}
	}]);

	return ImageMapper;
})(_react.Component);

exports["default"] = ImageMapper;

ImageMapper.defaultProps = {
	active: true,
	fillColor: "rgba(255, 255, 255, 0.5)",
	lineWidth: 1,
	map: {
		areas: [],
		name: "image-map-" + Math.random()
	},
	strokeColor: "rgba(0, 0, 0, 0.5)"
};

ImageMapper.propTypes = {
	active: _propTypes2["default"].bool,
	fillColor: _propTypes2["default"].string,
	height: _propTypes2["default"].number,
	imgWidth: _propTypes2["default"].number,
	lineWidth: _propTypes2["default"].number,
	src: _propTypes2["default"].string.isRequired,
	strokeColor: _propTypes2["default"].string,
	width: _propTypes2["default"].number,

	onClick: _propTypes2["default"].func,
	onMouseMove: _propTypes2["default"].func,
	onImageClick: _propTypes2["default"].func,
	onImageMouseMove: _propTypes2["default"].func,
	onLoad: _propTypes2["default"].func,
	onMouseEnter: _propTypes2["default"].func,
	onMouseLeave: _propTypes2["default"].func,

	map: _propTypes2["default"].shape({
		areas: _propTypes2["default"].arrayOf(_propTypes2["default"].shape({
			area: _propTypes2["default"].shape({
				coords: _propTypes2["default"].arrayOf(_propTypes2["default"].number),
				href: _propTypes2["default"].string,
				shape: _propTypes2["default"].string,
				preFillColor: _propTypes2["default"].string,
				fillColor: _propTypes2["default"].string
			})
		})),
		name: _propTypes2["default"].string
	})
};
module.exports = exports["default"];