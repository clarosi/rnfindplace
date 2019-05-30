import React from 'react';
import { Text, StyleSheet } from 'react-native';

// Cascading text styles implementation
const MainText = props => {
  const { text } = styles;
  const { children, style } = props;
  return (
    <Text {...props} style={[text, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: { backgroundColor: 'transparent' }
});

export { MainText };
