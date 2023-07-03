import { Component } from "react";
import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";
import PixabayService from "services/PixabayService";

class ImageGallery extends Component{
    state = {
        
    }

    pixabayService = new PixabayService();

    componentDidMount() {
        this.onLoadPictures();
        console.log('done');
    }

    onLoadPictures = () => {
        this.fetchPixabay()
            .then(res => console.log(res));
    }


    render() {
        return(
            <ul className="gallery">
    
            </ul>
        )
    }
}

export default ImageGallery;