import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Tone from 'tone';

var chromaticScale4 = [
  "C3",
  "C4",
  "C5",
  "C#3",
  "C#4",
  "C#5",
  "D3",
  "D4",
  "D5",
  "D#3",
  "D#4",
  "D#5",
  "E3",
  "E4",
  "E5",
  "F3",
  "F4",
  "F5",
  "F#3",
  "F#4",
  "F#5",
  "G3",
  "G4",
  "G5",
  "G#3",
  "G#4",
  "G#5",
  "A3",
  "A4",
  "A5",
  "A#3",
  "A#4",
  "A#5",
  "B3",
  "B4",
  "B5"
  ];
var colorWheel = ["red", "orange", "yellow", "chartreuse_green", "green", "spring_green", "cyan", "azure", "blue", "violet", "magenta", "rose"];
var intervals = ["1n", "2n", "4n", "8n", "2n", "4n", "8n"];

var pureNotes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
var octaves = ['3', '4', '5'];

var cMajorPentatonic = ["E", "G", "A", "C", "D"];

var  egyption = ["C", "D", "F", "G", "A#"];

var majorBlues = ["C", "D", "D#", "E", "G", "A"]


var color_map = {
  "C3": "red",
  "C#3": "orange",
  "D3": "yellow",
  "D#3": "chartreuse_green",
  "E3": "green",
  "F3": "spring_green",
  "F#3": "cyan",
  "G3": "azure",
  "G#3": "blue",
  "A3": "violet",
  "A#3": "magenta",
  "B3": "rose",
  "C4": "red",
  "C#4": "orange",
  "D4": "yellow",
  "D#4": "chartreuse_green",
  "E4": "green",
  "F4": "spring_green",
  "F#4": "cyan",
  "G4": "azure",
  "G#4": "blue",
  "A4": "violet",
  "A#4": "magenta",
  "B4": "rose",
  "C5": "red",
  "C#5": "orange",
  "D5": "yellow",
  "D#5": "chartreuse_green",
  "E5": "green",
  "F5": "spring_green",
  "F#5": "cyan",
  "G5": "azure",
  "G#5": "blue",
  "A5": "violet",
  "A#5": "magenta",
  "B5": "rose",
}

var color_map_2 = {
  "C": [255, 0, 0],  //"red",
  "C#": [255, 127, 0],  //"orange",
  "D": [255, 255, 0],  //"yellow",
  "D#": [127, 255, 0],  //"chartreuse_green",
  "E": [0, 255, 0],  //"green",
  "F": [0, 255, 127],  //"spring_green",
  "F#": [0, 255, 255],  //"cyan",
  "G": [0, 127, 255],  //"azure",
  "G#": [0, 0, 255],  //"blue",
  "A": [127, 0, 255],  //"violet",
  "A#": [255, 0, 255],  //"magenta",
  "B": [255, 0, 127],  //"rose",
}



function createRgbStyle(note, octave) {
  var tint_factor = .2;
  var shade_factor = .2;

  let r = color_map_2[note][0]
  let g = color_map_2[note][1]
  let b = color_map_2[note][2]

  if (octave === '3') {
    r = r + (255 - r) * tint_factor
    g = g + (255 - g) * tint_factor
    b = b + (255 - b) * tint_factor
  } else if (octave === '5') {
    r = r * (1 - shade_factor)
    g = g * (1 - shade_factor)
    b = b * (1 - shade_factor)
  }
  console.warn("rgb(" + r + ", " + g + ", " + b + ")");
  return "rgb(" + r + ", " + g + ", " + b + ")"
}


function purify(pureNote) {
  var note = pureNote.substring(0, pureNote.length-1);
  var octave = pureNote.substring(pureNote.length-1, pureNote.length);
  return [note, octave]
}


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

class App extends Component {
  constructor(){
    super();

    this.state = {
        className: 'red',
        noteName: 'Click Me',
        bg_color_style: {'backgroundColor': 'rgb(255, 255, 255)'}
    }
  }

  makeTone() {
    var self = this;
    var synth = new Tone.Synth().toMaster();
    // chromaticScale4 = shuffle(chromaticScale4);


    console.warn('console is working');

    for (let index = 0; index < 300; index++) {
      intervals = shuffle(intervals);


      var loop = new Tone.Loop(function(time){

        // RANDOM
        var ind = Math.floor(Math.random() * 12);

        const pureNote = shuffle(majorBlues)[0];
        const octave = shuffle(octaves)[0];
        const note = pureNote + octave;

        synth.triggerAttackRelease(note, intervals[2], time);
        const rgb = createRgbStyle(pureNote, octave)
        self.setState({bg_color_style: {'background-color': rgb}, noteName: note});

        /// --------


        // all in order
        // const note = chromaticScale4[index];
        // const temp = purify(note)
        // const pureNote = temp[0];
        // const octave = temp[1];
        // console.warn('pureNote', pureNote);
        // console.warn('octave', octave);
        // synth.triggerAttackRelease(note, intervals[1], time);
        // const rgb = createRgbStyle(pureNote, octave)
        // self.setState({bg_color_style: {'backgroundColor': rgb}, noteName: note});
        // --------


      },
      intervals[1]);

      loop.start(index + "m").stop( (index + 1) + "m");
    }




    Tone.Transport.start();
  }
// <img src={logo} className="app-logo" alt="logo" onClick={this.makeTone.bind(this)}/>
  render() {

    // let bg_color = this.state.className;

    return (
      <div className="app">
        <header className={'app-header'} style={this.state.bg_color_style}>
          <div className="app-logo" onClick={this.makeTone.bind(this)}>{this.state.noteName}</div>
        </header>
      </div>
    );
  }
}

export default App;
