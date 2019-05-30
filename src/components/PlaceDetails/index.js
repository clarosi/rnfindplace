import React from 'react';
import { View, Text, Image, Modal, StyleSheet } from 'react-native';

import { BottonIcon } from '../Common';

const rendContent = selectedPlace => {
  let content = null;
  const { image, text } = styles;
  if (selectedPlace) {
    const { placeName, placeImage } = selectedPlace;
    content = (
      <View>
        <Image style={image} source={{ uri: placeImage }} />
        <Text style={text}>{placeName}</Text>
      </View>
    );
  }
  return content;
};

const PlaceDetails = props => {
  const { container, bottomContainer } = styles;
  const { selectedPlace, closeModal, deletePlace, animation } = props;
  return (
    <Modal
      visible={selectedPlace !== null}
      animationType={animation || 'slide'}
    >
      <View style={container}>
        {rendContent(selectedPlace)}
        <View style={bottomContainer}>
          <BottonIcon
            action={closeModal}
            iconName={'x'}
            iconSize={40}
            iconColor={'blue'}
          />
          <BottonIcon
            action={deletePlace}
            iconName={'trashcan'}
            iconSize={40}
            iconColor={'red'}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginTop: 20,
    alignSelf: 'center'
  },
  bottomContainer: {
    alignItems: 'center',
    paddingTop: 15
  },
  image: {
    width: '100%',
    height: 300
  },
  text: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold'
  }
});

export { PlaceDetails };
