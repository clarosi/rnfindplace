import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';

const BottonIcon = props => {
  const { iconName, iconSize, iconColor, action } = props;
  return (
    <TouchableOpacity style={{ paddingTop: 15 }} onPress={() => action()}>
      <Text>
        <Icon
          name={iconName || 'x'}
          size={iconSize || 40}
          color={iconColor || 'blue'}
        />
      </Text>
    </TouchableOpacity>
  );
};

export { BottonIcon };
