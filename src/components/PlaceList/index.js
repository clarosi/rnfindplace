import React from 'react';
import { FlatList } from 'react-native';

import { ListItem } from '../Common';

const PlaceList = props => {
  const { places, onItemSelected } = props;
  return (
    <FlatList
      data={places}
      renderItem={({ item }) => (
        <ListItem
          place={item.placeName}
          placeImage={{ uri: item.placeImage }}
          onItemSelected={() => onItemSelected(item.key)}
        />
      )}
      keyExtractor={item => item.key.toString()}
    />
  );
};

export { PlaceList };
