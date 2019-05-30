import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const DefaultButton = props => {
  const { style, children, action, disabled } = props;
  const { button, disabledButton, text } = styles;
  const disabledStyle = disabled ? disabledButton : null;

  let content = (
    <TouchableOpacity onPress={action}>
      <View style={[button, style, disabledStyle]}>
        <Text style={text}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
  if (disabled) {
    content = (
      <View style={[button, style, disabledStyle]}>
        <Text style={text}>{children}</Text>
      </View>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 5,
    backgroundColor: '#366ddb',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#27292d'
  },
  disabledButton: {
    backgroundColor: '#eee'
  },
  text: {
    color: 'black',
    alignSelf: 'center'
  }
});

export { DefaultButton };
