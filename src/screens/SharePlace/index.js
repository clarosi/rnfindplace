import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';

import {
  MainText,
  HeadingText,
  TextBox,
  DefaultButton,
  PickImage,
  PickLocation
} from '../../components/Common';
import { addPlace } from '../../store/actions';
import { sideDrawerId } from '../../shared/utils/strings/navigation';
import { manageValidationRules } from '../../shared/utils/helper';
import validate from '../../shared/utils/validation';

class SharePlace extends Component {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  state = {
    controls: {
      placeName: {
        value: '',
        valid: false,
        validationRules: {
          required: true,
          minLength: 3
        },
        touch: false
      }
    },
    location: {
      value: null,
      valid: false
    }
  };

  onPlaceNameHandler = (key, value) => {
    const controls = this.state.controls;
    const connectedValue = manageValidationRules(key, value, controls);
    this.setState(prevState => ({
      controls: {
        ...prevState.controls,
        [key]: {
          ...prevState.controls[key],
          value,
          valid: validate(
            value,
            prevState.controls[key].validationRules,
            connectedValue
          ),
          touch: true
        }
      }
    }));
  };

  onAddPlaceHandler = () => {
    const { controls, location } = this.state;
    this.props.addPlace(controls.placeName.value, location.value);
    this.setState(prevState => ({
      controls: {
        ...prevState.controls,
        placeName: {
          ...prevState.controls.placeName,
          value: '',
          valid: false,
          touch: false
        }
      }
    }));
  };

  onPickLocationHandler = location => {
    this.setState(prevState => ({
      location: {
        ...prevState.location,
        value: location,
        valid: true
      }
    }));
  };

  navigationButtonPressed({ buttonId }) {
    if (buttonId === sideDrawerId) {
      Navigation.mergeOptions(this.props.componentId, {
        sideMenu: { left: { visible: true } }
      });
    }
  }

  render() {
    const { value, valid, touch } = this.state.controls.placeName;
    const { container, inputContainer } = styles;
    const disable = !valid || !this.state.location.valid;
    return (
      <ScrollView>
        <KeyboardAvoidingView style={container} behavior={'padding'}>
          <MainText>
            <HeadingText>Share a place with us!</HeadingText>
          </MainText>
          <PickImage />
          <PickLocation onPickLocation={this.onPickLocationHandler} />
          <View style={inputContainer}>
            <TextBox
              value={value}
              valid={valid}
              touch={touch}
              onChangeText={text => this.onPlaceNameHandler('placeName', text)}
              placeholder={'Place Name'}
              autoCapitalize={'none'}
              autoCorrect={false}
            />
          </View>
          <DefaultButton action={this.onAddPlaceHandler} disabled={disable}>
            Share the place
          </DefaultButton>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  inputContainer: {
    width: '80%'
  }
});

export default connect(
  null,
  { addPlace }
)(SharePlace);
