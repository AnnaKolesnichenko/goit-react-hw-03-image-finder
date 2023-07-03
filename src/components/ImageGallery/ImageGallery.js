import { Component } from "react";
// import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";
import fetchPixabay from "services/PixabayService";

class ImageGallery extends Component{
    state = {
        modal: {isOpen: false, visibleData: null},
        images: [],
        loading: true,
        error: false
    }


    async componentDidMount() {
        try {
            const images = await fetchPixabay();
            console.log(images);
            this.setState({images: images});
        } catch (error) {

        } finally {

        }
    }

    onLoadPictures = () => {
        
    }

    render() {
        return(
        <ul className="gallery">
                {this.state.images.length > 0 && this.state.images.map(image => {
   
                    return (<li className="gallery-item" key={image.id}>
                                <img src={image.previewURL} alt={image.tags} />
                            </li>)
                    })}
            </ul>
        )
    }
}

export default ImageGallery;