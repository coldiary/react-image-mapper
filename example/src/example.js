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
	render () {
		return (
			<div>
				<ImageMapper src={URL} map={MAP} width={500}/>
				<pre><code>{'<ImageMapper src={URL} map={MAP} width={500}/>'}</code></pre>
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
