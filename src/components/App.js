import { Component } from "react";
import Notiflix from 'notiflix';
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
    images: [],
    totalImages: 0,
    searchQuery: '',
    currentPage: 1,
    loading: false,
    error: false
};

componentDidUpdate = async (_, prevState) => {
  const {searchQuery, currentPage} = this.state;
  if(searchQuery !== prevState.searchQuery || currentPage !== prevState.currentPage) {
    this.fetchImages(searchQuery, currentPage);
  }
}

// onSearchQuery = (data) => {
//   this.setState({searchQuery: data.inputValue});  
// }


//searchForm submit and setting query and page for the first search
onSubmitSearch = (query) => {
  this.setState({
    searchQuery: query,
    images: [],
    currentPage: 1
  });
  this.fetchImages(query, 1);
  // this.fetchImages(query, this.state.currentPage);
}

//uploading more pages upon current search
onPageUpload = () => {
  this.setState((prev) => ({
    currentPage: prev.currentPage + 1,
  }));
  this.fetchImages(this.state.searchQuery, this.state.currentPage + 1);
}


fetchImages = async(query, page) => {
    try {
      this.setState({loading: true});

      const data = await fetchPixabay(query, page);

      if(data.totalHits === 0) {
        Notiflix.Notify.warning(`There is no results upon your ${query}, please try again...`);
        return;
      }

      this.setState((prevState) => {
        return {
            images: [...prevState.images, ...data.hits],
            totalImages: data.totalHits,
        };
      });

    } catch (error) {
      this.setState({error: true});
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
    const {images, loading, error, totalImages, modal} = this.state;
    const showBtn = !loading && images.length !== totalImages;
   
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
    
        <SearchBar onSubmit={this.onSubmitSearch}/>   
        {loading && <Loader/> }    
        {images.length > 0 && <ImageGallery images={images} onModalOpen={this.onModalOpen}/> }
        {error && <ErrorMessage/>}
        
        {showBtn && <Button onPageUpload={this.onPageUpload}/>}

        {modal.isOpen && 
            <Modal 
              largeImageURL={this.state.modal.largeImageURL} 
              onModalClose={this.onModalClose} 
        />}
        
      </div>
    );
  }
};

export default App;
