import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Tone from 'tone';

var chromaticScale4 = ["C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4"];
var colorWheel = ["red", "orange", "yellow", "chartreuse_green", "green", "spring_green", "cyan", "azure", "blue", "violet", "magenta", "rose"];

class App extends Component {
  constructor(){
    super();

    this.state = {
        className: 'red'
    }
}


  makeTone() {
    var self = this;
    var synth = new Tone.Synth().toMaster();

    console.warn('console is working');

    for (let index = 0; index < chromaticScale4.length; index++) {
      const note = chromaticScale4[index];

      var loop = new Tone.Loop(function(time){
        synth.triggerAttackRelease(note, "8n", time);
      }, "4n");
      loop.start(index + "m").stop( (index + 1) + "m");
    }

    Tone.Transport.scheduleRepeat(function(time){
      console.warn('in the callback', self.state.className);

      let currentIndex = colorWheel.indexOf(self.state.className);
      if (currentIndex === 11) { currentIndex = -1;}
      currentIndex++;
      self.setState({className: colorWheel[currentIndex]});

    }, "4n", 0, "12m");




    Tone.Transport.start();
  }

  render() {

    let bg_color = this.state.className;

    return (
      <div className="app">
        <header className={'app-header ' + bg_color}>
          <img src={logo} className="app-logo" alt="logo" onClick={this.makeTone.bind(this)}/>
        </header>
      </div>
    );
  }
}

export default App;
