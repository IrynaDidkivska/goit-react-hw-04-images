import React, { useReducer, useEffect, useCallback } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImg } from '../services/api';
import { toast } from 'react-toastify';
import { LargeImg, Wrapper } from './App.styled';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { initialState, reducer } from './reducer';

export const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    images,
    query,
    page,
    per_page,
    totalHits,
    loading,
    largeImageURL,
    isOpen,
  } = state;

  const fetchImages = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const { totalHits, hits } = await fetchImg({
        q: query,
        page,
        per_page,
      });

      if (query === state.query && page === state.page && totalHits) {
        toast.success(
          `Hooray! We found ${totalHits - state.images.length} images.`
        );
      }

      if (!totalHits) {
        toast.error(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      dispatch({ type: 'UPDATE_IMAGES', payload: { hits, totalHits } });
    } catch (error) {
      toast.error(`${error.message}`);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [query, page, per_page, state.query, state.page]);

  useEffect(() => {
    if (query !== initialState.query || page !== initialState.page) {
      fetchImages();
    }
  }, [query, state.page, fetchImages, page]);

  const handlerSearchForm = query => {
    if (query !== state.query) {
      dispatch({ type: 'SEARCH_FORM', payload: query });
    }
  };

  const handleLoadMoreBtn = () => {
    dispatch({ type: 'LOAD_MORE', payload: page + 1 });
  };

  const handleClickImage = largeImageURL => {
    dispatch({ type: 'CLICK_IMG', payload: largeImageURL });
  };

  const toggleModal = () =>
    dispatch({ type: 'TOGGLE_MODAL', payload: !isOpen });

  return (
    <Wrapper>
      <Searchbar onSearchForm={handlerSearchForm} />
      {images.length > 0 && (
        <ImageGallery images={images} onClickImage={handleClickImage} />
      )}
      {loading && <Loader />}

      {isOpen && (
        <Modal onClose={toggleModal} isOpen={state.isOpen}>
          <LargeImg src={largeImageURL} alt="" />
        </Modal>
      )}

      {!loading && images.length > 0 && images.length < totalHits && (
        <Button onLoadMore={handleLoadMoreBtn} />
      )}
    </Wrapper>
  );
};
