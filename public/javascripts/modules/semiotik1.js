//
// Line-based op art inspired by
// https://www.instagram.com/p/B0Ak5dTBIVj/
//

import Module from '../lib/module.js'

class Semiotik1 extends Module {

	constructor() {
		super({	// init params mapping
			"r": ["cc_1", 20],
			"max_width": ["cc_2", 10],
			"width": ["cc_3", 10],
			"gap": ["cc_4", 127/2],
			"size": ["cc_5", 72/4],
			"weight": ["cc_6", 100],
			"grid_columns": ["cc_7", 24],
			"grid_rows": ["cc_8", 14],
			"letter_spacing": ["cc_9", 0],
			"r2": ["cc_10", 0],
			"g2": ["cc_11", 0],
			"b2": ["cc_12", 0],
			"animate": ["cc_13", 0],
			"opacity1": ["cc_14", 100],
			"opacity2": ["cc_15", 100],
			"count2": ["cc_16", 16]
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

	renderPattern1() {
		this.renderGrid()
		for (var i=1; i<this.params["grid_columns"]; i++) {
			for (var j=0; j<this.params["grid_rows"]; j++) {
				var start = getGridCoordinates([i,j], this.params["grid_columns"], this.params["grid_rows"], xmax, ymax) 
				var end = getGridCoordinates([i,j+1], this.params["grid_columns"], this.params["grid_rows"], xmax, ymax) 	
				// drawCircle(coord, 2, "#fff", this.getDomID())
				// if (j%2 == 0) {
					drawLine(start, end, "#fff", Math.random()*this.params["max_width"], this.getDomID())
				// }
			}
		}
	}


	renderPattern2() {
		// this.renderGrid()
		for (var i=1; i<this.params["grid_columns"]; i++) {
			for (var j=0; j<this.params["grid_rows"]; j++) {
				var start = getGridCoordinates([i,j], this.params["grid_columns"], this.params["grid_rows"], xmax, ymax) 
				var end = getGridCoordinates([i,j+1], this.params["grid_columns"], this.params["grid_rows"], xmax, ymax) 	
				// drawCircle(coord, 2, "#fff", this.getDomID())
				// if (j%2 == 0) {
					drawLine(start, end, "#fff", i+j, this.getDomID())
				// }
			}
		}
	}

	renderPattern3() {
		// this.renderGrid()
		for (var i=1; i<this.params["grid_columns"]; i++) {
			for (var j=0; j<this.params["grid_rows"]; j++) {
				var start = getGridCoordinates([i,j], this.params["grid_columns"], this.params["grid_rows"], xmax, ymax) 
				var end = getGridCoordinates([i,j+1], this.params["grid_columns"], this.params["grid_rows"], xmax, ymax) 	
				if (j%(Math.ceil(Math.random()*5)) == 0) {
					drawLine(start, end, "#fff", i+j, this.getDomID())
				}
			}
		}
	}

	renderPattern4() {
		// this.renderGrid()
		for (var i=1; i<this.params["grid_columns"]; i++) {
			for (var j=0; j<this.params["grid_rows"]; j++) {
				var start = getGridCoordinates([i,j], this.params["grid_columns"], this.params["grid_rows"], xmax, ymax) 
				var end = getGridCoordinates([i,j+1], this.params["grid_columns"], this.params["grid_rows"], xmax, ymax) 	
				if ((i+j)%2 == 0) {
					drawLine(start, end, "#fff", this.params["max_width"], this.getDomID())
				}
			}
		}
	}

	renderPattern5() {
		// this.renderGrid()
		for (var i=1; i<this.params["grid_columns"]; i++) {
			for (var j=0; j<this.params["grid_rows"]; j++) {
				var start = getGridCoordinates([i,j], this.params["grid_columns"], this.params["grid_rows"], xmax, ymax) 
				var end = getGridCoordinates([i+1,j], this.params["grid_columns"], this.params["grid_rows"], xmax, ymax) 	
				if ((i+j)%2 == 0) {
					drawLine(start, end, "#fff", this.params["max_width"], this.getDomID())
				}
			}
		}
	}

	renderPattern6() {
		// this.renderGrid()
		for (var i=1; i<this.params["grid_columns"]; i++) {
			for (var j=0; j<this.params["grid_rows"]; j++) {
				var start = getGridCoordinates([i,j], this.params["grid_columns"], this.params["grid_rows"], xmax, ymax) 
				var end = getGridCoordinates([i+1,j], this.params["grid_columns"], this.params["grid_rows"], xmax, ymax) 
				if (Math.random() < 0.5) {
					drawCircle(start, this.params["r"], "#fff", this.getDomID())
				} else {
					if ((i+j)%2 == 0) {
						drawLine(start, end, "#fff", this.params["max_width"], this.getDomID())
					}
				}
			}
		}
	}


	render() {	

		this.setBackgroundColor(getParametricColor(this.params,2))
		// var coord = getGridCoordinates(pos, this.params["grid_columns"], this.params["grid_rows"], xmax, ymax) 

		//this.renderGrid()

		// var count = Math.ceil(Math.random()*5)
		var count = 1

		switch(count) {
			case 1:
				this.renderPattern1()
				break;
			case 2:
				this.renderPattern2()							
				break;
			case 3:
				this.renderPattern3()
				break
			case 4:
				this.renderPattern5()
				break
			case 5:
				this.renderPattern5()
				break;
			case 6:
				this.renderPattern6()
				break;
		}

		// this.renderPattern1()
		// this.renderPattern2()
		// this.renderPattern3()
		// this.renderPattern4()
		// this.renderPattern5()


		// this.renderPattern6()


		// var nCircles = this.params["count"]
		// var maxR = this.params["r"]*10

		// for (var i=0; i<nCircles; i++) {
		// 	var r = maxR*(i/nCircles)
		// 	var segLen = r*Math.PI/2 
		// 	circle({
		// 		cx: xmax/2,
		// 		cy: ymax/2,
		// 		r: r,
		// 		stroke: "#fff",	
		// 		"stroke-dasharray": segLen + " " + segLen*this.params["gap"]/127,
		// 		fill: "none",
		// 		"transform": "rotate(" + Math.random()*360 + " " + xmax/2 + " " + ymax/2 + ")",
		// 		style: "stroke-width:" + this.params["width"]
		// 	}, this.getDomID());	
		// }

		// this.renderGrid()
		// this.renderTitle([3,4])
		// this.renderBody([3,9])
		// this.renderBody([6,9])
		// this.renderBody([9,9])
		// this.renderBody([12,9])


	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		
		if ((event != null) && ["cc_10", "cc_11", "cc_12", "cc_15"].includes(event.knob)) {
			this.setBackgroundColor(getParametricColor(this.params,2))
		} else {
			this.clear()
			this.render()
		}
	}

}

export default Semiotik1;
