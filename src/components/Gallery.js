import React from 'react';
import GalleryItem from "./GalleryItem";
import NotFound from "./NotFound";

const Gallery = (props, {match}) =>  { //no this for functional components

	const results = props.pictures;
	let pictures;
// takes pictures array and creates a GalleryItem for each picture in the array
	if(results.length > 0) {
		pictures = results.map(result => <GalleryItem url={`https://farm${result.farm}.staticflickr.com/${result.server}/${result.id}_${result.secret}.jpg`} key={result.id} /> ) 
  } else {
  	pictures = <NotFound />
  }

	return (
  <div className="photo-container">
    <h2>Results</h2>
    <ul>
    	{pictures}
    </ul>
	</div>
	);
}

export default Gallery;