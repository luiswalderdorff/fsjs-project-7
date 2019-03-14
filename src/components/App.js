import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import '../index.css';
import Header from "./Header";
import Gallery from "./Gallery";
import NoURL from "./NoURL";
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
    this.setState({ loading: true})
    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`) //replace tags with variable for whatever is selected
      .then(response => response.json())
      .then(response => {
        this.setState({ pictures: response.photos.photo, query: query, loading: false})
      })
      .catch(error => {
          console.log('Error fetching and parsing data', error);
      });
  }

  // presearches for the Cats, Owls, and Dogs NavLink
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
            {
              (this.state.loading)
              ? <p>Loading...</p>
              : <Route exact path="/:query" render={ () => <Gallery pictures={this.state.pictures} />} /> /*fires when the url is localhost:3000/text/moretext*/
            }
{            <Route component={NoURL} />
}          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
