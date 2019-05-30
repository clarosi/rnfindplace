import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';

import { DefaultButton } from '../Common';

class PickLocation extends Component {
  state = {
    focusedLocation: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta:
        (Dimensions.get('window').width / Dimensions.get('window').height) *
        0.0922
    },
    locationChosen: false
  };

  onPickLocationHandler = event => {
    const { onPickLocation } = this.props;
    const { focusedLocation } = this.state;
    const { latitude, longitude } = event.nativeEvent.coordinate;
    this.map.animateToRegion({
      ...focusedLocation,
      latitude,
      longitude
    });
    this.setState(prevState => ({
      focusedLocation: {
        ...prevState.focusedLocation,
        latitude,
        longitude
      },
      locationChosen: true
    }));
    onPickLocation({ latitude, longitude });
  };

  onGetLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude, longitude } = pos.coords;
        const event = {
          nativeEvent: {
            coordinate: { latitude, longitude }
          }
        };
        this.onPickLocationHandler(event);
      },
      err => console.log(err)
    );
  };

  render() {
    const { map } = styles;
    const { focusedLocation, locationChosen } = this.state;
    let marker = null;
    if (locationChosen) {
      marker = <MapView.Marker coordinate={focusedLocation} />;
    }
    return (
      <React.Fragment>
        <MapView
          style={map}
          initialRegion={focusedLocation}
          //region={focusedLocation}
          onPress={this.onPickLocationHandler}
          ref={ref => (this.map = ref)}
        >
          {marker}
        </MapView>
        <DefaultButton action={this.onGetLocationHandler}>
          Locate me
        </DefaultButton>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    width: '90%',
    height: 250
  }
});

export { PickLocation };
