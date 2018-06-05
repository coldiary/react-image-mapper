var React = require('react');
var ReactDOM = require('react-dom');
var ImageMapper = require('react-image-mapper');

var MAP = {
	name: 'my-map',
	areas: [
		{shape: 'poly', coords: [25,33,27,300,128,240,128,94]},
		{shape: 'poly', coords: [219,118,220,210,283,210,284,119]},
		{shape: 'poly', coords: [381,241,383,94,462,53,457,282]},
		{shape: 'poly', coords: [245,285,290,285,274,239,249,238]},
	]
};

var URL = 'https://c1.staticflickr.com/5/4052/4503898393_303cfbc9fd_b.jpg';

var App = React.createClass({
	getInitialState() {
		return { msg: null };
	},
	load() {
		this.setState({ msg: 'Interact with image !' });
	},
	clicked(area) {
		this.setState({ msg: `You clicked on ${area.shape} at coords ${JSON.stringify(area.coords)} !` });
	},
	clickedOutside(evt) {
		const coords = {x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
		this.setState({ msg: `You clicked on the image at coords ${JSON.stringify(coords)} !` });
	},
	enterArea(area) {
		this.setState({ msg: `You entered ${area.shape} at coords ${JSON.stringify(area.coords)} !` });
	},
	leaveArea(area) {
		this.setState({ msg: `You leaved ${area.shape} at coords ${JSON.stringify(area.coords)} !` });
	},
	render () {
		return (
			<div>
				<ImageMapper src={URL} map={MAP} width={500}
					onLoad={() => this.load()}
					onClick={area => this.clicked(area)}
					onMouseEnter={area => this.enterArea(area)}
					onMouseLeave={area => this.leaveArea(area)}
					onImageClick={evt => this.clickedOutside(evt)}
				/>
				<pre>{this.state.msg ? this.state.msg : null}</pre>
				<pre><code>{`
<ImageMapper src={URL} map={MAP} width={500}
	onLoad={() => this.load()}
	onClick={area => this.clicked(area)}
	onMouseEnter={area => this.enterArea(area)}
	onMouseLeave={area => this.leaveArea(area)}
	onImageClick={evt => this.clickedOutside(evt)}
/>
				`}</code></pre>
				<pre><code className="json">{
					'URL = "https://c1.staticflickr.com/5/4052/4503898393_303cfbc9fd_b.jpg"\n' +
					'MAP = {\n' +
					'  name: "my-map",\n' +
					'  areas: [\n' +
					'    { shape: "poly", coords: [25,33,27,300,128,240,128,94] },\n' +
					'    { shape: "poly", coords: [219,118,220,210,283,210,284,119] },\n' +
					'    { shape: "poly", coords: [381,241,383,94,462,53,457,282] },\n' +
					'    { shape: "poly", coords: [245,285,290,285,274,239,249,238] },\n' +
					'  ]\n}'
				}</code></pre>
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
