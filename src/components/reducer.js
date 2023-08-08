export const initialState = {
  images: [],
  query: '',
  page: 1,
  per_page: 12,
  totalHits: 0,
  loading: false,
  largeImageURL: '',
  isOpen: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_IMAGES':
      return {
        ...state,
        images: action.payload.hits,
        totalHits: action.payload.totalHits,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SEARCH_FORM':
      return {
        ...state,
        query: action.payload,
        page: 1,
        images: [],
      };
    case 'LOAD_MORE':
      return {
        ...state,
        page: action.payload,
        totalHits: action.payload.totalHits,
      };
    case 'CLICK_IMG':
      return { ...state, largeImageURL: action.payload, isOpen: true };
    case 'TOGGLE_MODAL':
      return { ...state, isOpen: action.payload };

    default:
      return state;
  }
};
