import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native';

export default class SideDrawer extends Component {
  render() {
    const { container, menuItem, text } = styles;
    return (
      <View style={container}>
        <TouchableOpacity>
          <View style={menuItem}>
            <Text style={text}>LogOut</Text>
            <Icon name={'exit-to-app'} size={30} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width * 0.8,
    height: '100%',
    paddingTop: 10,
    backgroundColor: '#e8ecf2'
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#b5babf',
    padding: 10,
    marginTop: 15
  },
  text: {
    fontSize: 20
  }
});
