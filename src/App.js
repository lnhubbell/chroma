import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Tone from 'tone';

var chromaticScale4 = ["C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4"];

var theClass = 'zero-color';

class App extends Component {
  constructor(){
    super();

    this.state = {
        className: 'zero-color'
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
      if (self.state.className === 'zero-color') {
        self.setState({className: 'first-color'});
        console.warn('first');
      } else if (self.state.className === 'first-color') {
        self.setState({className: 'second-color'});
        console.warn('second');
      } else if (self.state.className === 'second-color') {
        self.setState({className: 'third-color'});
        console.warn('third');
      } else if (self.state.className === 'third-color') {
        self.setState({className: 'zero-color'});
        console.warn('zero');
      }
    }, "4n", 0, "12m");




    Tone.Transport.start();
  }

  render() {
    console.warn(theClass);
    // this.className = theClass;
    let bg_color = this.state.className;
    // this.makeTone();
    return (
      <div className="App">
        <header className={bg_color}>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>

            <button onClick={this.makeTone.bind(this)}>Make tone</button>

        </header>
      </div>
    );
  }
}

export default App;
