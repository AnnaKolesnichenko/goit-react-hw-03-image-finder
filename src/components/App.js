import { Component } from "react";
import fetchPixabay from "services/PixabayService";

import ImageGallery from "./ImageGallery/ImageGallery";
import SearchBar from "./SearchBar/SearchBar";
import Button from "./Button/Button";
import Loader from "./Loader/Loader";
import ErrorMessage from "./ErrorMessage/Error";
import Modal from "./Modal/Modal";
// import css from './app.css';

class App extends Component {

  state = {
    modal: {isOpen: false, largeImageURL: ''},
    btnShow: false,
    images: [],
    searchQuery: '',
    currentPage: 1,
    loading: false,
    error: false
};


// onSearchQuery = (data) => {
//   this.setState({searchQuery: data.inputValue});  
// }


//searchForm submit and setting query and page for the first search
onSubmitSearch = (e) => {
  e.preventDefault();
  this.setState({
    searchQuery: e.target.query.value,
    loading: true,
    images: []
  });
  this.fetchImages(this.state.searchQuery, this.state.currentPage);
}

//uploading more pages upon current search
onPageUpload = () => {
  this.setState({
    loading: true,
    page: this.state.currentPage + 1,
  });
  this.fetchImages(this.state.searchQuery, this.state.currentPage + 1);
}


async fetchImages(query, page) {
    try {
      this.setState({loading: true});
      const images = await fetchPixabay(query, page);
      this.setState((state) => {
        return {
            images: [...state.images, ...images],
        };
      });

      if(images.length < 12) {
        this.setState({btnShow: false});
      } 
      else if (images.length > 12) {
        this.setState({btnShow: true});
      }

    } catch (error) {
      this.setState({error: true, loading: false});
    } finally {
      this.setState({loading: false})
    }
}

//work with modal
onModalOpen = (data) => {
  this.setState({
    modal: {
      isOpen: true,
      largeImageURL: data
    },
  });
};

onModalClose = () => {
  this.setState({
    modal: {
      isOpen: false,
      largeImageURL: ''
    },
  });
}

  render () {
    const {images, loading, error, btnShow} = this.state;
    const spinner = loading ? <Loader/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const galleryContent = !(error || loading) ? <ImageGallery images={images} onModalOpen={this.onModalOpen}/> : null;
    return (
      <div
        // style={{
        //   height: '100vh',
        //   display: 'flex',
        //   justifyContent: 'center',
        //   alignItems: 'center',
        //   fontSize: 40,
        //   color: '#010101'
        // }}
      >
        {this.state.modal.isOpen && 
            <Modal 
              largeImageURL={this.state.modal.largeImageURL} 
              onModalClose={this.onModalClose} 
        />}
        <SearchBar onSubmit={this.onSubmitSearch}/>   
        {/* {this.state.loading && <Loader/> }     */}
        {/* {images.length > 0 ? <ImageGallery images={images}/> : <Loader/>} */}
        {/* {this.state.error && <ErrorMessage/>} */}
        {galleryContent}
        {errorMessage}
        {spinner}
        {btnShow && <Button onPageUpload={this.onPageUpload}/>}
        
      </div>
    );
  }
};

export default App;
