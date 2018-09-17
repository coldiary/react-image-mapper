var React = require('react');
var ReactDOM = require('react-dom');
var ImageMapper = require('react-image-mapper');

var MAP = {
	name: 'my-map',
	areas: [
		{name: '1', shape: 'poly', coords: [25,33,27,300,128,240,128,94]},
		{name: '2', shape: 'poly', coords: [219,118,220,210,283,210,284,119]},
		{name: '3', shape: 'poly', coords: [381,241,383,94,462,53,457,282]},
		{name: '4', shape: 'poly', coords: [245,285,290,285,274,239,249,238]},
	]
};

var URL = 'https://c1.staticflickr.com/5/4052/4503898393_303cfbc9fd_b.jpg';

var App = React.createClass({
	getInitialState() {
		return { hoveredArea: null, msg: null };
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
		this.setState({ hoveredArea: area, msg: `You entered ${area.shape} at coords ${JSON.stringify(area.coords)} !` });
	},
	leaveArea(area) {
		this.setState({ hoveredArea: null, msg: `You leaved ${area.shape} at coords ${JSON.stringify(area.coords)} !` });
	},

	getTipPosition(area) {
		if (!area) return { top: 0, left: 0 };
		// Calculate centroid
		const n = area.coords.length / 2;
		const { y, x } = area.coords.reduce(({ y, x }, val, idx) => {
			return !(idx % 2) ? { y, x: x + (val / n) } : { y: y + (val / n), x };
		}, { y: 0, x: 0 });
		return { top: `${y}px`, left: `${x}px` };
	},

	render () {
		return (
			<div>
				<div style={{ position: 'relative' }}>
					<ImageMapper src={URL} map={MAP} width={500}
						onLoad={() => this.load()}
						onClick={area => this.clicked(area)}
						onMouseEnter={area => this.enterArea(area)}
						onMouseLeave={area => this.leaveArea(area)}
						onImageClick={evt => this.clickedOutside(evt)}
					/>
					{
						this.state.hoveredArea &&
						<span className="tooltip" style={{ ...this.getTipPosition(this.state.hoveredArea)}}>
							{ this.state.hoveredArea && this.state.hoveredArea.name}
						</span>
					}
				</div>
				<pre>{this.state.msg ? this.state.msg : null}</pre>
				<pre><code>{
					'<ImageMapper src={URL} map={MAP} width={500}\n' +
					'    onLoad={() => this.load()}\n' +
					'    onClick={area => this.clicked(area)}\n' +
					'    onMouseEnter={area => this.enterArea(area)}\n' +
					'    onMouseLeave={area => this.leaveArea(area)}\n' +
					'    onImageClick={evt => this.clickedOutside(evt)}\n' +
					'/>\n'
				}</code></pre>
				<pre><code className="json">{
					'URL = "https://c1.staticflickr.com/5/4052/4503898393_303cfbc9fd_b.jpg"\n' +
					'MAP = {\n' +
					'  name: "my-map",\n' +
					'  areas: [\n' +
					'    { name: "1", shape: "poly", coords: [25,33,27,300,128,240,128,94] },\n' +
					'    { name: "2", shape: "poly", coords: [219,118,220,210,283,210,284,119] },\n' +
					'    { name: "3", shape: "poly", coords: [381,241,383,94,462,53,457,282] },\n' +
					'    { name: "4", shape: "poly", coords: [245,285,290,285,274,239,249,238] },\n' +
					'  ]\n}'
				}</code></pre>
				Example with custom tooltips:
				<pre><code>{
					'<div className="container">\n' +
					'    <ImageMapper src={URL} map={MAP} width={500}\n' +
					'    	onLoad={() => this.load()}\n' +
					'    	onClick={area => this.clicked(area)}\n' +
					'    	onMouseEnter={area => this.enterArea(area)}\n' +
					'    	onMouseLeave={area => this.leaveArea(area)}\n' +
					'    	onImageClick={evt => this.clickedOutside(evt)}\n' +
					'    />\n' +
					'    {\n' +
					'    	this.state.hoveredArea &&\n' +
					'    	<span className="tooltip" style={{ ...this.getTipPosition(this.state.hoveredArea)}}>\n' +
					'    		{ this.state.hoveredArea && this.state.hoveredArea.name}\n' +
					'    	</span>\n' +
					'    }\n' +
					'</div>\n'
				}</code></pre>
				<pre><code className="js">{
					'getTipPosition(area) {\n' +
					'    if (!area) return { top: 0, left: 0 };\n' +
					'    // Calculate centroid\n' +
					'    const n = area.coords.length / 2;\n' +
					'    const { y, x } = area.coords.reduce(({ y, x }, val, idx) => {\n' +
					'    	return !(idx % 2) ? { y, x: x + (val / n) } : { y: y + (val / n), x };\n' +
					'    }, { y: 0, x: 0 });\n' +
					'    return { top: `${y}px`, left: `${x}px` };\n' +
					'},\n'
				}</code></pre>
				<pre><code className="css">{
					'.container {\n' +
					'    position: relative;\n' +
					'}\n\n' +
					'.tooltip {\n' +
					'    position: absolute;\n' +
					'    color: #fff;\n' +
					'    padding: 10px;\n' +
					'    background: rgba(0,0,0,0.8);\n' +
					'    transform: translate3d(-50%, -50%, 0);\n' +
					'    border-radius: 5px;\n' +
					'    pointer-events: none;\n' +
					'    zIndex: 1000;\n' +
					'}\n'
				}</code></pre>
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
