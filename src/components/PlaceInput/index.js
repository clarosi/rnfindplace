import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const PlaceInput = props => {
  const { inputContainer, textInput, button } = styles;
  const { placeName, onPlaceName, onAddPlace } = props;
  return (
    <View style={inputContainer}>
      <TextInput
        style={textInput}
        value={placeName}
        onChangeText={onPlaceName}
      />
      <Button title={'Add'} style={button} onPress={onAddPlace} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  textInput: {
    borderColor: 'black',
    borderWidth: 1,
    width: '70%',
    height: 50
  },
  button: {
    width: '30%'
  }
});

export { PlaceInput };
