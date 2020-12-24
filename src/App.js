  
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import apiService from './services';
import Container from './components/Container';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Loader from './components/Loader';
import Modal from './components/Modal';
import ErrorView from './components/ErrorView';

export default function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [largeImageURL, setlargeImageURL] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);


  useEffect(
    () => {
      if (!query) {
        return
      }
      const fetchImages = async () => {
        try {
          const request = await apiService(query, page);

          if (request.length === 0) {
            return setError(`No results were found for ${query}!`)
          };

          setImages(prevImages => [...prevImages, ...request])
        }

        catch (error) {
          setError('Something went wrong. Try again.');
        }

        finally {
          setIsLoading(false);
        };
      };

      fetchImages();
    }, [query, page]);
    
  


  const serchImages = newSearch => {
    setQuery(newSearch);
    setImages([]);
    setPage(1);
    setError(null);
    setIsLoading(true);
  };

  const onLoadMore = () => {
    setIsLoading(true);
    setPage(prevPage => prevPage + 1);
    scrollPage();
  };

  const onOpenModal = e => {
    setlargeImageURL(e.target.dataset.source);
    toggleModal();
  };
  
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const scrollPage = () => {
    setTimeout(() => {
          window.scrollBy(0, window.innerHeight+150)
    }, 1000);
  };


  return (
    <>
    <Container>
        <Searchbar
          onHandleSubmit={serchImages}
         />

        {error && <ErrorView texterror={error} />}

        {images.length > 0 && (
          <ImageGallery images={images} onOpenModal={onOpenModal} />
        )}

        {isLoading && <Loader />}

        {!isLoading && images.length > 0 && (
          <Button onLoadMore={onLoadMore} />
        )}

        {showModal && (
          <Modal
            onToggleModal={toggleModal}
            largeImageURL={largeImageURL}
          />
        )}
        <ToastContainer autoClose={5000} />
  </Container>
  </>
  )
}


// class App extends Component {
//   state = {
//     query: '',
//     images: [],
//     largeImageURL: '',
//     page: 1,
//     error: null,
//     isLoading: false,
//     showModal: false,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.query !== this.state.query) {
//       this.setState({ images: [], page: 1, error: null });
//     }
//   }

//   searchImages = async () => {
//     const { query, page } = this.state;

//     if (query.trim() === '') {
//       return toast.error('No-no! Dont joke with me! Enter something interesting!');
//     }

//     this.toggleLoader();

//     try {
//       const request = await apiService(query, page);
//       this.setState(({ images, page }) => ({
//         images: [...images, ...request],
//         page: page + 1,
//       }));
//       if (request.length === 0) {
//         this.setState({ error: `No results were found for ${query}!` });
//       }
//     } catch (error) {
//       this.setState({ error: 'Something went wrong. Try again.' });
//     } finally {
//       this.toggleLoader();
//     }
//   };

//   handleChange = e => {
//     this.setState({ query: e.target.value });
//   };

//   handleSubmit = e => {
//     e.preventDefault();
//     this.searchImages();
//   };

//   onLoadMore = () => {
//     this.searchImages();
//     this.scrollPage();
//   };

  // onOpenModal = e => {
  //   this.setState({ largeImageURL: e.target.dataset.source });
  //   this.toggleModal();
  // };

  // toggleLoader = () => {
  //   this.setState(({ isLoading }) => ({
  //     isLoading: !isLoading,
  //   }));
  // };

  // toggleModal = () => {
  //   this.setState(({ showModal }) => ({
  //     showModal: !showModal,
  //   }));
  // };

  // scrollPage = () => {
  //   setTimeout(() => {
  //     window.scrollBy({
  //       top: document.documentElement.clientHeight - 160,
  //       behavior: 'smooth',
  //     });
  //   }, 1000);
  // };

//   render() {
//     const {
//       query,
//       images,
//       largeImageURL,
//       isLoading,
//       showModal,
//       error,
//     } = this.state;
//     return (
//       <Container>
//         <Searchbar
//           onHandleSubmit={this.handleSubmit}
//           onSearchQueryChange={this.handleChange}
//           value={query}
//         />

//         {error && <ErrorView texterror={error} />}

//         {images.length > 0 && (
//           <ImageGallery images={images} onOpenModal={this.onOpenModal} />
//         )}

//         {isLoading && <Loader />}

//         {!isLoading && images.length > 0 && (
//           <Button onLoadMore={this.onLoadMore} />
//         )}

//         {showModal && (
//           <Modal
//             onToggleModal={this.toggleModal}
//             largeImageURL={largeImageURL}
//           />
//         )}
//         <ToastContainer autoClose={3700} />
//       </Container>
//     );
//   }
// }

// export default App;