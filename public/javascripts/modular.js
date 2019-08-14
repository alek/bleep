// list and maping of modules should be done here
// import * as Test from './modules/test.js'

import Sample from './modules/sample.js'
import DNA from './modules/dna.js'
import Picelj from './modules/picelj.js'
import VectorSpace from './modules/vectorspace.js'
import Sunset from './modules/sunset.js'
import Grid1 from './modules/grid1.js'
import Bounce from './modules/bounce.js'
import Abstract1 from './modules/abstract1.js'
import Abstract2 from './modules/abstract2.js'
import Abstract3 from './modules/abstract3.js'
import Abstract4 from './modules/abstract4.js'
import Field1 from './modules/field1.js'
import International1 from './modules/international1.js'
import International2 from './modules/international2.js'
import International3 from './modules/international3.js'
import Minimal1 from './modules/minimal1.js'
import Minimal2 from './modules/minimal2.js'
import Minimal3 from './modules/minimal3.js'
import Piqued1 from './modules/piqued1.js'
import Piqued2 from './modules/piqued2.js'
import Lines1 from './modules/lines1.js'
import Lines2 from './modules/lines2.js'
import Semiotik1 from './modules/semiotik1.js'
import Semiotik2 from './modules/semiotik2.js'
import Semiotik3 from './modules/semiotik3.js'
import Semiotik4 from './modules/semiotik4.js'
import Semiotik5 from './modules/semiotik5.js'
import Semiotik6 from './modules/semiotik6.js'
import Semiotik7 from './modules/semiotik7.js'
import MMLogo from './modules/mm_logo.js'
import Github1 from './modules/github1.js'

// const modules = [Test, DNA]
// const modules = [DNA]
// const modules = [new Foo()]
// const modules = [new Sample()]
// const modules = [new DNA(), new Sample()]
// const modules = [new DNA()]
// const modules = [new Abstract1(), new DNA(), new Bounce(), new International2()]

// const modules = [new International3()]
const modules = ["DNA", "VectorSpace", "Sunset","Bounce", "Abstract1", "Abstract2", "Abstract3", "Abstract4", 
				 "Field1", "International1", "International2", "International3", "Minimal1", "Minimal2", "Minimal3", "Piqued1", "Piqued2",
				 "Lines1", "Lines2"]

// var moduleQueue = [new Semiotik2(), new Semiotik1()]
var moduleQueue = [new Github1()]

var stateUpdateEnabled = true
var clockCount = 0
var activeModule = moduleQueue[0]

var isMaster = false

var initQueue = function() {
	// init moduleQueue
	for (var i=0; i<moduleQueue.length; i++) {
		var scale = 1.0
		moduleQueue[i].setConfig({
			"xmax": xmax*scale,
			"ymax": ymax*scale,
			"scale": scale,
			"domID": "graph"
		})
		moduleQueue[i].init();
	}

	activeModule.render();
}

var updateState = function() {
	if (stateUpdateEnabled) {
		var nextModule = Math.floor(Math.random()*moduleQueue.length)
		moduleQueue[nextModule].update()
		// modules[nextModule].render()
		activeModule = moduleQueue[nextModule]
	}
}

//
// handle midi event received via websocket
//
var setupMidiStateUpdate = function(socket, channel) {
	socket.on('control', function(data) {
		if (isMaster) {
			handleMidiUpdate(data)
			channel.postMessage(JSON.stringify({'midi': data}))		
		}
	});
}

var handleMidiUpdate = function(data) {
	
	var midi = MidiController.getInstance();
	if (data["data"]["_type"] == "cc") {
		midi.data[data["data"]["controller"]] = data["data"]["value"]
		data["data"]["knob"] = midi.getReverseMapping()[data["data"]["controller"]]	// add label for virtualmidi compatibility
		activeModule.update(data["data"])
		// activeModule.render()
	} else if (data["data"]["_type"] == "clock") {	// clock triggers state update
		if (clockCount++%5 == 0) { // clock divider
 			updateState();
 		}
	}	
}

//
// virtual midi: update state based on keyboard event
//
var setupVirtualMidiUpdateHandler = function(channel) {
	$("body").keydown(function(e) {
		if (isMaster) {
			handleVirtualMidiEvent(e.keyCode)	// render directly
			channel.postMessage(JSON.stringify({'virtualmidi': e.keyCode})) 	// + send to broadcast channel
		}
	});
}

var handleVirtualMidiEvent = function(keyCode) {
	var midi = MidiController.getInstance();
	var valueMap = midi.getKeyboardMap();
	if (keyCode in valueMap) {
		var knob = valueMap[keyCode][0]
		var direction = valueMap[keyCode][1]
		if (midi.getValue(knob) == null) {
			midi.setValue(knob, 1)
		} else {
			if (direction == "up") {
				midi.setValue(knob, Math.min(midi.getValue(knob) + 1, 128))	
			} else {
				midi.setValue(knob, Math.max(midi.getValue(knob) - 1, 0))	
			}
		}
		activeModule.update({ controller: midi.getMidiChannel(knob), value: midi.getValue(knob, 0), knob: knob})
	}
}

var toggleSlave = function() {
	isMaster = false
	// slave screens should be cleared out
	$(".sidebar").remove()
	$(".footer").remove()
}

//
// Bootstrap
//
$( document ).ready(function() {

	toggleSlave()

	isMaster = $("#master-toggle").is(":checked")

	$('#master-force').on('change', 'input[type=checkbox]', function(e) {
        if (this.checked) {
        	isMaster = true						// set node as master
        	bc.postMessage('master_token')		// broadcast a token that moves others to slave mode

        	// broadcast the reset token at regular interval
        	// to deauth new masters on the channel
        	setInterval(function() {
        		bc.postMessage('master_token')
        	}, 1000);
        }
    });

	// setup a broadcast channel + master selection

	// console.log(activeModule.midiMappings)


	// render midi mappings for current module

	for (var knob in activeModule.midiMappings) {
		var mapping = activeModule.midiMappings[knob]
		$("#midi-mapping").append("<li class='module-select'><h3>" + knob +  "</h3>" + " " + mapping[0] + "</li>")
	}


	// render available mmodules	

	// for (var i=0; i<modules.length; i++) {
	// 	$("#module-list").append("<li class='module-select'><a href='#'>" + modules[i] + "</a></li>")
	// }


 //    $('.module-select').click(function(a) {
 //    	var instance = eval("new " + this.textContent + "()");
 //    	moduleQueue = []
 //    	moduleQueue.push(instance)
 //    	// moduleQueue = [new Abstract1()]
 //    	initQueue()
 //    })

	var bc = new BroadcastChannel('modular_manifestation')

	bc.onmessage = function (ev) { 
		if (ev.data == 'master_token') {
			toggleSlave()
		} else {
			var data = JSON.parse(ev.data)
			if (data['midi'] != null) {
				handleMidiUpdate(data['midi'])
			} else if (data['virtualmidi'] != null) {
				handleVirtualMidiEvent(data['virtualmidi'])
			}

		}
	}

	// websocket setup
	var socket = io.connect('http://localhost:3000')
	
	socket.on('server', function (data) {
		socket.emit('client', { time: new Date() })
		setupMidiStateUpdate(socket, bc)
	})

	// command message thing
	socket.on('command', function (data) {
		if (data["input"] == "virtualmidi") {
			setupVirtualMidiUpdateHandler(bc)
		}
	})

	// midi events
	// socket.on()

	initQueue()


})
