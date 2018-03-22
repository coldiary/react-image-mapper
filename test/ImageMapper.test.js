import React from 'react';
import { expect } from 'chai';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-14';
import ImageMapper from '../src/ImageMapper';

configure({ adapter: new Adapter() });

const URL = 'https://c1.staticflickr.com/5/4052/4503898393_303cfbc9fd_b.jpg';
const MAP = {
	name: 'my-map',
	areas: [
		{ shape: 'poly', coords: [25,33,27,300,128,240,128,94] },
		{ shape: 'poly', coords: [219,118,220,210,283,210,284,119] },
		{ shape: 'poly', coords: [381,241,383,94,462,53,457,282] },
		{ shape: 'poly', coords: [245,285,290,285,274,239,249,238] },
	]
};

const render = (props) => {
	const wrapper = mount(<ImageMapper src={URL} map={MAP} {...props} />);
	const instance = wrapper.instance();
	instance.canvas = { getContext: () => ({}) };
	instance.initCanvas();

	return instance;
};

describe('ImageMapper', () => {
	describe('when width prop is provided', () => {
		it('container width should be equal to width prop', () => {
			const instance = render({ width: 100 });
			const containerStyles = instance.container.style;
			
			expect(containerStyles).to.have.property('width');
			expect(containerStyles.width).to.equal('100px');
		});

		it('canvas width should be equal to width prop', () => {
			const instance = render({ width: 100 });
			const canvas = instance.canvas;
			
			expect(canvas).to.have.property('width');
			expect(canvas.width).to.equal(100);
		});

		it('image width should be equal to width prop', () => {
			const instance = render({ width: 100 });
			const img = instance.img;
			
			expect(img).to.have.property('width');
			expect(img.width).to.equal(100);
		});
	});

	describe('when height prop is provided', () => {
		it('container height should be equal to height prop', () => {
			const instance = render({ height: 100 });
			const containerStyles = instance.container.style;
			
			expect(containerStyles).to.have.property('height');
			expect(containerStyles.height).to.equal('100px');
		});

		it('canvas height should be equal to height prop', () => {
			const instance = render({ height: 100 });
			const canvas = instance.canvas;
			
			expect(canvas).to.have.property('height');
			expect(canvas.height).to.equal(100);
		});

		it('img height should be equal to height prop', () => {
			const instance = render({ height: 100 });
			const img = instance.img;
			
			expect(img).to.have.property('height');
			expect(img.height).to.equal(100);
		});
	});

	describe('when onClick prop is provided', () => {
		it('map styles should have "cursor:pointer"', () => {
			const wrapper = mount(<ImageMapper src={URL} map={MAP} onClick={() => {}} />);
			const mapStyles = wrapper.find('map').get(0).props.style;

			expect(mapStyles).to.have.property('cursor');
			expect(mapStyles.cursor).to.equal('pointer');
		});
	});
});
