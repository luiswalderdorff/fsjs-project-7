import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import '../index.css';
import Header from "./Header";
import Gallery from "./Gallery";
import apiKey from "../config.js";

class App extends Component {

  constructor() { //What does a constructor do again?
    super(); // ?
    this.state = {
      pictures: [],
      loading: true
    };
  } 

  componentDidMount() {
    this.performSearch();
  }

//gets api and saves it to state
  performSearch = (query = "cats") => {
    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`) //replace tags with variable for whatever is selected
      .then(response => response.json())
      .then(response => {
        this.setState({ pictures: response.photos.photo})
      })
      .catch(error => {
          console.log('Error fetching and parsing data', error);
      });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header onSearch={this.performSearch}/>
          <Gallery pictures={this.state.pictures}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
