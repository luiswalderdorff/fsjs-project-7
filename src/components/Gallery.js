import React, { Component } from 'react';
import GalleryItem from "./GalleryItem";
class Gallery extends Component {

  render() {
    return (
      <div class="photo-container">
        <h2>Results</h2>
        <GalleryItem />
      </div>
    );
  }
}

export default Gallery;
