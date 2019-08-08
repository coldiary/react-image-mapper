var React = require("react");
var ReactDOM = require("react-dom");
var ImageMapper = require("react-image-mapper");

var MAP = {
	name: "my-map",
	areas: [
		{
			name: "1",
			shape: "poly",
			coords: [25, 33, 27, 300, 128, 240, 128, 94],
			preFillColor: "green",
			fillColor: "#0000ff"
		},
		{
			name: "2",
			shape: "poly",
			coords: [219, 118, 220, 210, 283, 210, 284, 119],
			preFillColor: "pink",
			lineWidth: 10,
			strokeColor: "#0000ff"
		},
		{
			name: "3",
			shape: "poly",
			coords: [381, 241, 383, 94, 462, 53, 457, 282],
			preFillColor: "yellow", // this is mandatory for stroke color to work
			lineWidth: 10,
			strokeColor: "#6afd09"
		},
		{
			name: "4",
			shape: "poly",
			coords: [245, 285, 290, 285, 274, 239, 249, 238],
			preFillColor: "red"
		},
		{
			name: "5",
			shape: "circle",
			coords: [170, 100, 25],
			preFillColor: "rgb(255,255,255,0.3)",
			lineWidth: 2
		},
		{
			name: "6",
			shape: "rect",
			coords: [270, 100, 200, 50],
			lineWidth: 2,
			preFillColor: "rgba(255, 255, 255, 0.3)",
			strokeColor: "#6afd09"
		}
	]
};

var URL = "https://c1.staticflickr.com/5/4052/4503898393_303cfbc9fd_b.jpg";

var App = React.createClass({
	getInitialState() {
		return { hoveredArea: null, msg: null, moveMsg: null };
	},
	load() {
		this.setState({ msg: "Interact with image !" });
	},
	clicked(area) {
		this.setState({
			msg: `You clicked on ${area.shape} at coords ${JSON.stringify(
				area.coords
			)} !`
		});
	},
	clickedOutside(evt) {
		const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
		this.setState({
			msg: `You clicked on the image at coords ${JSON.stringify(coords)} !`
		});
	},
	moveOnImage(evt) {
		const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
		this.setState({
			moveMsg: `You moved on the image at coords ${JSON.stringify(coords)} !`
		});
	},
	enterArea(area) {
		this.setState({
			hoveredArea: area,
			msg: `You entered ${area.shape} ${area.name} at coords ${JSON.stringify(
				area.coords
			)} !`
		});
	},
	leaveArea(area) {
		this.setState({
			hoveredArea: null,
			msg: `You leaved ${area.shape} ${area.name} at coords ${JSON.stringify(
				area.coords
			)} !`
		});
	},
	moveOnArea(area, evt) {
		const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
		this.setState({
			moveMsg: `You moved on ${area.shape} ${
				area.name
			} at coords ${JSON.stringify(coords)} !`
		});
	},

	getTipPosition(area) {
		return { top: `${area.center[1]}px`, left: `${area.center[0]}px` };
	},

	render() {
		return (
			<div className="grid">
				<div className="presenter">
					<div style={{ position: "relative" }}>
						<ImageMapper
							src={URL}
							map={MAP}
							width={500}
							onLoad={() => this.load()}
							onClick={area => this.clicked(area)}
							onMouseEnter={area => this.enterArea(area)}
							onMouseLeave={area => this.leaveArea(area)}
							onMouseMove={(area, _, evt) => this.moveOnArea(area, evt)}
							onImageClick={evt => this.clickedOutside(evt)}
							onImageMouseMove={evt => this.moveOnImage(evt)}
							lineWidth={4}
							strokeColor={"white"}
						/>
						{this.state.hoveredArea && (
							<span
								className="tooltip"
								style={{ ...this.getTipPosition(this.state.hoveredArea) }}
							>
								{this.state.hoveredArea && this.state.hoveredArea.name}
							</span>
						)}
					</div>
					<pre className="message">
						{this.state.msg ? this.state.msg : null}
					</pre>
					<pre>{this.state.moveMsg ? this.state.moveMsg : null}</pre>
				</div>
				<div className="source">
					<h2>Example with custom tooltips :</h2>
					<p>(message logic is not present, to keep it clear)</p>
					<pre>
						<code>
							{'<div className="container">\n' +
								"    <ImageMapper src={URL} map={MAP} width={500}\n" +
								"    	onLoad={() => this.load()}\n" +
								"    	onClick={area => this.clicked(area)}\n" +
								"    	onMouseEnter={area => this.enterArea(area)}\n" +
								"    	onMouseLeave={area => this.leaveArea(area)}\n" +
								"    	onMouseMove={(area, _, evt) => this.moveOnArea(area, evt)}\n" +
								"    	onImageClick={evt => this.clickedOutside(evt)}\n" +
								"    	onImageMouseMove={evt => this.moveOnImage(evt)}\n" +
								"		lineWidth={4}\n" +
								"		strokeColor={\"white\"}\n" +
								"    />\n" +
								"    {\n" +
								"    	this.state.hoveredArea &&\n" +
								'    	<span className="tooltip"\n' +
								"    	    style={{ ...this.getTipPosition(this.state.hoveredArea)}}>\n" +
								"    		{ this.state.hoveredArea && this.state.hoveredArea.name}\n" +
								"    	</span>\n" +
								"    }\n" +
								"</div>\n"}
						</code>
					</pre>
					<pre>
						<code className="json">
							{'URL = "https://c1.staticflickr.com/5/4052/4503898393_303cfbc9fd_b.jpg"\n' +
								"MAP = {\n" +
								'  name: "my-map",\n' +
								"  areas: [\n" +
								'    { name: "1", shape: "poly", coords: [25,33,27,300,128,240,128,94], preFillColor: "green", fillColor: "#0000ff", },\n' +
								'    { name: "2", shape: "poly", coords: [219,118,220,210,283,210,284,119], preFillColor: "pink", lineWidth: 10, strokeColor: "#0000ff" },\n' +
								'    { name: "3", shape: "poly", coords: [381,241,383,94,462,53,457,282], preFillColor: "yellow", /*this is mandatory for stroke color to work*/ lineWidth: 10, strokeColor: "#6afd09" },\n' +
								'    { name: "4", shape: "poly", coords: [245,285,290,285,274,239,249,238], preFillColor: "red"  },\n' +
								'    { name: "5", shape: "circle", coords: [170, 100, 25 ], preFillColor: "rgb(255,255,255,0.3)", lineWidth: 2 },\n' +
								'    { name: "6", shape: "rect", coords: [270, 100, 200, 50], lineWidth: 2, preFillColor: "rgba(255, 255, 255, 0.3)", strokeColor: "#6afd09" }\n' +
								"  ]\n}"}
						</code>
					</pre>
					Handler details : &nbsp;
					<span
						onClick={() =>
							this.setState({ codeDetails: !this.state.codeDetails })
						}
					>
						{this.state.codeDetails ? "[-]" : "[+]"}
					</span>
					<pre>
						<code
							className="js"
							style={{ display: this.state.codeDetails ? "block" : "none" }}
						>
							{"enterArea(area) {\n" +
								"    this.setState({ hoveredArea: area });\n" +
								"}\n\n" +
								"leaveArea(area) {\n" +
								"    this.setState({ hoveredArea: null });\n" +
								"}\n\n" +
								"getTipPosition(area) {\n" +
								"    return { top: `${area.center[1]}px`, left: `${area.center[0]}px` };\n" +
								"}\n\n"}
						</code>
					</pre>
					Styling details : &nbsp;
					<span
						onClick={() =>
							this.setState({ stylindDetails: !this.state.stylindDetails })
						}
					>
						{this.state.stylindDetails ? "[-]" : "[+]"}
					</span>
					<pre>
						<code
							className="css"
							style={{ display: this.state.stylindDetails ? "block" : "none" }}
						>
							{".container {\n" +
								"    position: relative;\n" +
								"}\n\n" +
								".tooltip {\n" +
								"    position: absolute;\n" +
								"    color: #fff;\n" +
								"    padding: 10px;\n" +
								"    background: rgba(0,0,0,0.8);\n" +
								"    transform: translate3d(-50%, -50%, 0);\n" +
								"    border-radius: 5px;\n" +
								"    pointer-events: none;\n" +
								"    z-index: 1000;\n" +
								"}\n"}
						</code>
					</pre>
				</div>
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById("app"));
