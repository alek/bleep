var xmax = window.innerWidth
var ymax = window.innerHeight

var addSVG = function(tag, attrs) {
	var el= document.createElementNS('http://www.w3.org/2000/svg', tag);
	for (var k in attrs) {
		el.setAttribute(k, attrs[k]);
	}
	return el;
}

path = function(params, domID) {
	document.getElementById(domID).appendChild(addSVG("path", params));
}

text = function(params, text, domID) {
	document.getElementById(domID).appendChild(addSVG('text', params)).appendChild(document.createTextNode(text.substring(0,120)))
}

circle = function(params, domID) {
	document.getElementById(domID).appendChild(addSVG("circle", params));
}

rect = function(params, domID) {
	document.getElementById(domID).appendChild(addSVG("rect", params));	
}

line = function(params, domID) {
	document.getElementById(domID).appendChild(addSVG("line", params));	
}

polygon = function(params, domID) {
	document.getElementById(domID).appendChild(addSVG("polygon", params));	
}

rndx = function() {
	return Math.floor(Math.random()*xmax);
}

rndy = function() {
	return Math.floor(Math.random()*ymax);
}

rndcoord = function() {
	return [rndx(), rndy()];
}

randomID = function() {
	return Math.floor(Math.random()*Number.MAX_SAFE_INTEGER);
}

drawCircle = function(coord, r, fill, domID, id) {
		circle({
			cx: coord[0],
			cy: coord[1],
			r: r,
			stroke: "#fff",
			fill: fill,
			"transform": "rotate(0 0 0)",
			style: "stroke-width:0",
			id: (id == null) ? randomID(): id
		}, domID);	
}

drawCircleOutline = function(coord, r, fill, width, domID, id) {
		circle({
			cx: coord[0],
			cy: coord[1],
			r: r,
			stroke: fill,
			fill: "none",
			"transform": "rotate(0 0 0)",
			style: "stroke-width:" + width,
			id: (id == null) ? randomID(): id
		}, domID);	
}


drawRectangle = function(coord, width, height, fill, domID) {
		rect({
			x: coord[0],
			y: coord[1],
			width: width,
			height: height,
			stroke: "#fff",
			fill: fill,
			style: "stroke-width:0"
		}, domID);	
}

drawLine = function(start, end, stroke, width, domID) {
	if (width == null) {
		width = 1;
	}
	line({
		x1: start[0],
		y1: start[1],
		x2: end[0],
		y2: end[1],
		stroke: stroke,
		"transform": "rotate(0 0 0)",
		"stroke-width": width
	}, domID);
}

drawText = function(coord, content, size, fill,weight, spacing, fontFamily, domID) {
	text( { 
		x: coord[0],
		y: coord[1],
		"fill": fill,
		"transform": "rotate(0 50 100)",
		"style": "font-size:" + size + ";text-align:center;alignment-baseline:middle;text-anchor:middle;opacity:1.0;font-family:" + fontFamily + ";sans-serif;font-weight:" + weight + ";letter-spacing:" + spacing + "px;"
	}, content, domID); 
}

drawPolygon = function(coords, fill, domID) {
	polygon( {
		points: coords.join(" "),
		style: "fill:" + fill +";stroke:#fff;stroke-width:0"
	}, domID)
}

drawPath = function(coords, stroke, weight, domID) {
	path( {
		d: "M" + coords.map(x => x.join(" ")).join(" L") + "",
		style: "fill:none;stroke:" + stroke + ";stroke-width:" + weight
	}, domID)
}
// util methods

function toRadians (angle) {
  return angle * (Math.PI / 180);
}

function toDegrees (angle) {
  return angle * (180 / Math.PI);
}


