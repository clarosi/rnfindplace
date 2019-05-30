import React, { Component } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import { deletePlace } from '../../store/actions';
import {
  PlaceList,
  PlaceDetails,
  DefaultButton
} from '../../components/Common';
import { sideDrawerId } from '../../shared/utils/strings/navigation';

class FindPlace extends Component {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  state = {
    loadingPlaces: false,
    selectedPlace: null,
    selectedKey: null,
    removeAnim: new Animated.Value(1),
    placesAnim: new Animated.Value(0)
  };

  onCloseModalHandler = () => this.setState({ selectedPlace: null });

  onItemSelectedHandler = key => {
    const { places } = this.props;
    this.setState({
      selectedKey: key,
      selectedPlace: places.find(place => place.key === key)
    });
  };

  onFindPlaceHandler = () => {
    Animated.timing(this.state.removeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start(() => {
      this.setState({ loadingPlaces: true });
      this.onPlacesLoadedHandler();
    });
  };

  onPlacesLoadedHandler = () => {
    Animated.timing(this.state.placesAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  };

  onDeletePlaceHandler = () => {
    this.props.deletePlace(this.state.selectedKey);
    this.setState({ selectedPlace: null });
  };

  navigationButtonPressed({ buttonId }) {
    if (buttonId === sideDrawerId) {
      Navigation.mergeOptions(this.props.componentId, {
        sideMenu: { left: { visible: true } }
      });
    }
  }

  renderContent = () => {
    const { places } = this.props;
    const { selectedPlace } = this.state;
    let content = (
      <Animated.View
        style={{
          opacity: this.state.removeAnim,
          transform: [
            {
              scale: this.state.removeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [12, 1]
              })
            }
          ]
        }}
      >
        <DefaultButton action={this.onFindPlaceHandler}>
          Find Place
        </DefaultButton>
      </Animated.View>
    );
    if (this.state.loadingPlaces) {
      content = (
        <React.Fragment>
          <Animated.View style={{ opacity: this.state.placesAnim }}>
            <PlaceList
              places={places}
              onItemSelected={key => this.onItemSelectedHandler(key)}
            />
          </Animated.View>
          <PlaceDetails
            deletePlace={() => this.onDeletePlaceHandler()}
            selectedPlace={selectedPlace}
            closeModal={this.onCloseModalHandler}
          />
        </React.Fragment>
      );
    }
    return content;
  };

  render() {
    return (
      <View style={!this.state.loadingPlaces ? styles.container : null}>
        {this.renderContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const mapStateToProps = state => {
  const { places } = state.place;
  return { places };
};

export default connect(
  mapStateToProps,
  { deletePlace }
)(FindPlace);
