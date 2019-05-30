import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const ListItem = ({ place, placeImage, onItemSelected }) => {
  const { listItem, placeImageStyle } = styles;
  return (
    <TouchableOpacity onPress={() => onItemSelected()}>
      <View style={listItem}>
        <Image style={placeImageStyle} source={placeImage} />
        <Text>{place}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    width: '100%',
    marginTop: 15,
    padding: 10,
    backgroundColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center'
  },
  placeImageStyle: {
    width: 35,
    height: 35,
    marginRight: 5
  }
});

export { ListItem };
