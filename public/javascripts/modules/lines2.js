//
// Simple grid-based typographic randomization
//

import Module from '../lib/module.js'

class Lines2 extends Module {

	constructor() {
		super({	// init params mapping
			"r": ["cc_1", 20],
			"r1": ["cc_2", 127],
			"g1": ["cc_3", 127],
			"b1": ["cc_4", 127],
			"size": ["cc_5", 72/4],
			"weight": ["cc_6", 40],
			"grid_columns": ["cc_7", 24],
			"grid_rows": ["cc_8", 14],
			"line_end": ["cc_9", 70],
			"r2": ["cc_10", 0/2],
			"g2": ["cc_11", 0/2],
			"b2": ["cc_12", 0/2],
			"animate": ["cc_13", 0],
			"opacity1": ["cc_14", 128],
			"opacity2": ["cc_15", 128],
			"count": ["cc_16", 16]
		})
	}

	renderGrid() {
		for (var i=0; i<this.params["grid_columns"]; i++) {
			for (var j=0; j<this.params["grid_rows"]; j++) {
				var coord = getGridCoordinates([i,j], this.params["grid_columns"], this.params["grid_rows"], xmax, ymax) 
				drawCircle(coord, 2, "#fff", this.getDomID())
			}
		}
	}		


	render() {	
		this.setBackgroundColor(getParametricColor(this.params,2))		
		// this.renderGrid()
		for (var i=0; i<this.params["grid_rows"]; i++) {
			var start = Math.floor(Math.random()*this.params["grid_columns"]*(this.params["line_end"]/127))
			var startCoord = getGridCoordinates([start,i], this.params["grid_columns"], this.params["grid_rows"], xmax, ymax) 
			var endCoord = getGridCoordinates([this.params["grid_columns"],i], this.params["grid_columns"], this.params["grid_rows"], xmax, ymax) 
			drawLine(startCoord, endCoord, getParametricColor(this.params,1), Math.random()*this.params["weight"], this.getDomID())

		}
	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		
		if ((event != null) && ["cc_10", "cc_11", "cc_12", "cc_15"].includes(event.knob)) {
			this.setBackgroundColor(getParametricColor(this.params,2))
		} else if ((event != null) && event.knob == "cc_6") {
			var lines = document.getElementsByTagName('line');
			console.log(lines[0])
			// console.log(lines[0].transform.baseVal[0].matrix)
			// lines[0].transform.baseVal[0].angle = Math.random()*360
		 	for (var i=0; i<lines.length; i++) {
		 		lines[i].attributes["stroke-width"].value = this.params["weight"]
		 		lines[i].transform.baseVal[0].matrix['f'] += (64-this.params["weight"])/1000
		 		// lines[i].transform.baseVal[0].matrix['a'] = Math.random()
		 		// lines[i].transform.baseVal[0].matrix['b'] = Math.random()
		 	}		 	
		} else {
			this.clear()
			this.render()
		}
	}

}

export default Lines2;
