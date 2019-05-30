import React from 'react';
import { Text, StyleSheet } from 'react-native';

const HeadingText = props => {
  const { text } = styles;
  const { children, style } = props;
  return (
    <Text {...props} style={[text, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 28,
    fontWeight: 'bold'
  }
});

export { HeadingText };
