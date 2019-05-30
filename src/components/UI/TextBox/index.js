import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const TextBox = props => {
  const { style, valid, touch } = props;
  const { input, invalidInput } = styles;

  return (
    <TextInput
      {...props}
      style={[input, !valid && touch ? invalidInput : null, style]}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    padding: 10,
    marginTop: 10,
    borderColor: 'blue',
    borderWidth: 1,
    backgroundColor: '#eee'
  },
  invalidInput: {
    borderColor: 'red'
  }
});

export { TextBox };
