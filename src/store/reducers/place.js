import { ADD_PLACE, DELETE_PLACE } from '../actions/types';

const INITIAL_STATE = { places: [], pickLocation: null };
const PLACE_IMAGE = 'https://reactjs.org/logo-og.png';

const placeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_PLACE:
      const newPlace = [...state.places];
      newPlace.unshift({
        key: Math.random(),
        placeName: action.placeName,
        placeImage: PLACE_IMAGE
      });
      return Object.assign({}, state, {
        places: newPlace,
        pickLocation: action.pickLocation
      });
    case DELETE_PLACE:
      return Object.assign({}, state, {
        places: state.places.filter(place => place.key !== action.placeKey)
      });
    default:
      return state;
  }
};

export default placeReducer;
