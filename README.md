# [bleep.live](https://bleep.live) [![GitHub license](https://img.shields.io/badge/license-GPL-blue.svg)](https://github.com/alek/bleep/blob/master/LICENSE) 
A MIDI-driven Vector Visualization Livecoding Framework

![alt text](https://raw.githubusercontent.com/alek/bleep/master/bleep.jpg)

## Installation

Getting started should be fairly straightforward. The only dependency is on [node.js](https://nodejs.org/en/download/). After installing 
node, you can use npm to download all the necessary dependencies:

```
npm install
```
and the system should be ready to use. Bleep.live works best with a MIDI controller, but the easiest way to get started is by running it in the "virtual midi" mode:

```
node bin/www --virtualmidi
```

Once the server is up and running, you can access it from your browser of choice at:

```
http://localhost:3000/
```

You will see a master controller window with a preloaded sample animation. By using qwerty/asdfgh keyboard keys you can simulate appropriate MIDI CC signals and observe changes to the rendered object.
