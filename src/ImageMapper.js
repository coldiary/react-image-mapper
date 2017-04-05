import React, { Component, PropTypes } from 'react';

export default class ImageMapper extends Component {
	constructor(props) {
		super(props);
		['drawrect', 'drawcircle', 'drawpoly', 'initCanvas'].forEach(f => this[f] = this[f].bind(this));
		let absPos = { position: 'absolute', top: 0, left: 0 };
		this.styles = {
			container: { position: 'relative' },
			canvas: {...absPos, pointerEvents: 'none', zIndex: 2 },
			img: {...absPos, zIndex: 1, userSelect: 'none' }
		};
	}

	drawrect(coord) {
		coord = coord.split(',');
		let [left, top, right, bot] = coord;
		this.context.strokeRect(left, top, right - left, bot - top);
		this.context.fillRect(left, top, right - left, bot - top);
	}

	drawcircle(coords) {
		coords = coords.split(',');
		this.context.beginPath();
		this.context.arc(coords[0], coords[1], coords[2], 0, 2 * Math.PI);
		this.context.closePath();
		this.context.stroke();
		this.context.fill();
	}

	drawpoly(coords) {
		coords = coords.split(',');
		let n = coords.length;
		this.context.beginPath();
		this.context.moveTo(coords[0], coords[1]);
		for (let i = 2; i < n; i += 2)
			this.context.lineTo(coords[i], coords[i + 1]);
		this.context.closePath();
		this.context.stroke();
		this.context.fill();
	}

	componentDidMount() {
		this.initCanvas();
	}

	initCanvas() {
		if (this.props.width)
			this.img.width = this.props.width;
		this.canvas.width = this.img.clientWidth;
		this.canvas.height = this.img.clientHeight;
		this.container.style.width = this.img.clientWidth + 'px';
		this.container.style.height = this.img.clientHeight + 'px';
		this.context = this.canvas.getContext('2d');
		this.context.fillStyle = this.props.fillColor;
		this.context.strokeStyle = this.props.strokeColor;
		this.context.lineWidth = this.props.lineWidth;
		if (this.props.onLoad)
			this.props.onLoad();
	}

	hoverOn(area, index, event) {
		const shape = event.target.getAttribute('shape');
		if (this.props.active && this['draw' + shape])
			this['draw' + shape](event.target.getAttribute('coords'));
		if (this.props.onMouseEnter)
			this.props.onMouseEnter(area, index, event);
	}

	hoverOff(area, index, event) {
		if (this.props.active)
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		if (this.props.onMouseLeave)
			this.props.onMouseLeave(area, index, event);
	}

	click(area, index, event) {
		if (this.props.onClick) {
			event.preventDefault();
			this.props.onClick(area, index, event);
		}
	}

	renderAreas() {
		return this.props.map.areas.map((area, index) => (
			<area key={area._id || index} shape={area.shape} coords={area.coords.join(',')}
				  onMouseEnter={this.hoverOn.bind(this, area, index)}
				  onMouseLeave={this.hoverOff.bind(this, area, index)}
				  onClick={this.click.bind(this, area, index)} href={area.href} />
		));
	}

	render() {
		return (
			<div style={this.styles.container} ref={node => this.container = node}>
				<img style={this.styles.img} src={this.props.src} useMap={this.props.map.name} alt=""
					 ref={node => this.img = node} onLoad={this.initCanvas}
					 onClick={this.props.onImageClick} />
				<canvas ref={node => this.canvas = node} style={this.styles.canvas} />
				<map name={this.props.map.name}>{ this.renderAreas() }</map>
			</div>
		);
	}
}

ImageMapper.defaultProps = {
	active: true,
	fillColor: 'rgba(255, 255, 255, 0.5)',
	lineWidth: 1,
	map: {
		areas: [],
		name: 'image-map-' + Math.random(),
	},
	strokeColor: 'rgba(0, 0, 0, 0.5)',
};

ImageMapper.propTypes = {
	active: PropTypes.bool,
	fillColor: PropTypes.string,
	height: PropTypes.number,
	lineWidth: PropTypes.number,
	map: PropTypes.shape({
		areas: PropTypes.arrayOf(PropTypes.shape({
			area: PropTypes.shape({
				coords: PropTypes.arrayOf(PropTypes.number),
				href: PropTypes.string,
				shape: PropTypes.string,
			})
		})),
		name: PropTypes.string,
	}),
	onClick: PropTypes.func,
	onImageClick: PropTypes.func,
	onLoad: PropTypes.func,
	onMouseEnter: PropTypes.func,
	onMouseLeave: PropTypes.func,
	src: PropTypes.string.isRequired,
	strokeColor: PropTypes.string,
	width: PropTypes.number,
};
