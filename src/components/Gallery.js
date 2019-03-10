import React from 'react';
import GalleryItem from "./GalleryItem";
import NotFound from "./NotFound";

const Gallery = props =>  { //no this for functional components

	const results = props.pictures;
	let pictures;

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