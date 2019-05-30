import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

import { DefaultButton } from '../Common';

const IMAGE_URI =
  'https://cdn-images-1.medium.com/max/1200/1*WA_9JsyqFkge2HwYKcdJQw.png';

const PickImage = () => {
  const { placeholder, image } = styles;
  return (
    <React.Fragment>
      <View style={placeholder}>
        <Image style={image} source={{ uri: IMAGE_URI }} />
      </View>
      <DefaultButton action={() => console.log('click')}>
        Pick an image
      </DefaultButton>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%'
  },
  placeholder: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#eee',
    width: '80%',
    height: 160
  }
});

export { PickImage };
