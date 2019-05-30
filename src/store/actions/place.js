import { ADD_PLACE, DELETE_PLACE } from './types';

export const addPlace = (placeName, pickLocation) => ({
  type: ADD_PLACE,
  placeName,
  pickLocation
});

export const deletePlace = placeKey => ({
  type: DELETE_PLACE,
  placeKey
});
