import React, { Component } from 'react';
import '../index.css';
import Header from "./Header";
import Gallery from "./Gallery";

class App extends Component {

  state = {
    players: [
      {

      },
      {

      }
    ]
  };

  render() {
    return (
      <div className="App">
        <Header />
        <Gallery />
      </div>
    );
  }
}

export default App;
