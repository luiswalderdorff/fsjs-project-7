import React, { Component } from 'react';
import { Route, NavLink, Redirect, BrowserRouter } from "react-router-dom";
import '../index.css';
import Header from "./Header";
import Gallery from "./Gallery";
import apiKey from "../config.js";

class App extends Component {

  state = {
    pictures: []
  };

  componentDidMount() {
    this.performSearch();
  }

  performSearch = (query = "cats") => {
    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`) //replace tags with variable for whatever is selected
      .then(response => response.json())
      .then(responseData => console.log(responseData.photos.photo))
      .then(response => {
        this.setState({ pictures: response})
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
          <Gallery />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
