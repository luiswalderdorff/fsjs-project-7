import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import '../index.css';
import Header from "./Header";
import Gallery from "./Gallery";
import NotFound from "./NotFound";
import apiKey from "../config.js";

class App extends Component {

  constructor() { //What does a constructor do again?
    super(); // ?
    this.state = {
      pictures: [],
      loading: true,
      catPictures: [],
      dogPictures: [],
      owlPictures: [],
      query: ""
    };
  } 

  componentDidMount() {
    this.performSearch();
    this.catSearch();
    this.dogSearch();
    this.owlSearch();
  }

//gets api and saves it to state
  performSearch = (query = "cats") => {
    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`) //replace tags with variable for whatever is selected
      .then(response => response.json())
      .then(response => {
        this.setState({ pictures: response.photos.photo, query: query})
      })
      .catch(error => {
          console.log('Error fetching and parsing data', error);
      });
  }

  catSearch = () => {
    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=cats&per_page=24&format=json&nojsoncallback=1`) 
      .then(response => response.json())
      .then(response => {
        this.setState({ catPictures: response.photos.photo})
      })
      .catch(error => {
          console.log('Error fetching and parsing data', error);
      });
  }

  dogSearch = () => {
    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=dogs&per_page=24&format=json&nojsoncallback=1`) //replace tags with variable for whatever is selected
      .then(response => response.json())
      .then(response => {
        this.setState({ dogPictures: response.photos.photo})
      })
      .catch(error => {
          console.log('Error fetching and parsing data', error);
      });
  }

  owlSearch = () => {
    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=owls&per_page=24&format=json&nojsoncallback=1`) //replace tags with variable for whatever is selected
      .then(response => response.json())
      .then(response => {
        this.setState({ owlPictures: response.photos.photo})
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
          <Switch> 
            <Route exact path="/" render={ () => <Redirect to ="/cats" />} />
            <Route path="/cats" render={ () => <Gallery pictures={this.state.catPictures} />} />
            <Route path="/dogs" render={ () => <Gallery pictures={this.state.dogPictures} />} />
            <Route path="/owls" render={ () => <Gallery pictures={this.state.owlPictures} />} />
            <Route path={`/${this.state.query}`} render={ () => <Gallery pictures={this.state.pictures} />} />
            <Route component={NotFound} />
            </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
