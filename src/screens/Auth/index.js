import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Platform,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import { connect } from 'react-redux';

import startMainTab from '../MainTabs';
import {
  TextBox,
  DefaultButton,
  HeadingText,
  MainText
} from '../../components/Common';
import validate from '../../shared/utils/validation';
import { manageValidationRules } from '../../shared/utils/helper';
import { userSignIn } from '../../store/actions';

const IMAGE_URI =
  'https://cdn-images-1.medium.com/max/1200/1*WA_9JsyqFkge2HwYKcdJQw.png';

class AuthScreen extends Component {
  constructor(props) {
    super(props);
    Dimensions.addEventListener('change', this.onDimensionsChangeHandler);
  }

  state = {
    isLogin: true,
    controls: {
      email: {
        value: '',
        valid: false,
        validationRules: {
          required: true,
          isEmail: true
        },
        touch: false
      },
      password: {
        value: '',
        valid: false,
        validationRules: {
          required: true,
          minLength: 6
        },
        touch: false
      },
      confirmPassword: {
        value: '',
        valid: false,
        validationRules: {
          required: true,
          minLength: 6,
          equalTo: 'password'
        },
        touch: false
      }
    }
  };

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.onDimensionsChangeHandler);
  }

  onSignInHandler = () => {
    const { email, password } = this.state.controls;
    this.props.userSignIn({ email: email.value, password: password.value });
    startMainTab();
  };

  onAuthModeHandler = () => {
    this.setState(prevState => ({
      isLogin: !prevState.isLogin
    }));
  };

  onDimensionsChangeHandler = dims => {
    console.log(JSON.stringify(dims));
  };

  onChangeTextHandler = (key, value) => {
    const controls = this.state.controls;
    const connectedValue = manageValidationRules(key, value, controls);
    this.setState(prevState => ({
      controls: {
        ...prevState.controls,
        confirmPassword: {
          ...prevState.controls.confirmPassword,
          valid:
            key === 'password'
              ? validate(
                  prevState.controls.confirmPassword.value,
                  prevState.controls.confirmPassword.validationRules,
                  connectedValue
                )
              : prevState.controls.confirmPassword.valid
        },
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

  renderConfirmPasword = () => {
    const { isLogin } = this.state;
    const { confirmPassword } = this.state.controls;
    let content = null;

    if (!isLogin) {
      content = (
        <TextBox
          secureTextEntry
          placeholder={'Confirm Password'}
          value={confirmPassword.value}
          valid={confirmPassword.valid}
          touch={confirmPassword.touch}
          onChangeText={value =>
            this.onChangeTextHandler('confirmPassword', value)
          }
        />
      );
    }
    return content;
  };

  render() {
    const { isLogin } = this.state;
    const { email, password, confirmPassword } = this.state.controls;
    const {
      container,
      text,
      redText,
      inputContainer,
      imageBackground
    } = styles;
    let disable = !email.valid || !password.valid;
    if (!isLogin) {
      disable = !email.valid || !password.valid || !confirmPassword.valid;
    }
    return (
      <ImageBackground style={imageBackground} source={{ uri: IMAGE_URI }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView style={container} behavior={'padding'}>
            <MainText>
              <HeadingText>Please Login</HeadingText>
            </MainText>
            <MainText style={text}>
              <Text style={redText}>{`Note: App is running in ${
                Platform.OS
              } platform.`}</Text>
            </MainText>
            <DefaultButton action={this.onAuthModeHandler}>
              Switch to {!isLogin ? 'Sign In' : 'Sign Up'}
            </DefaultButton>
            <View style={inputContainer}>
              <TextBox
                placeholder={'Email'}
                value={email.value}
                valid={email.valid}
                touch={email.touch}
                onChangeText={value => this.onChangeTextHandler('email', value)}
                autoCapitalize={'none'}
                autoCorrect={false}
                keyboardType={'email-address'}
              />
              <TextBox
                secureTextEntry
                placeholder={'Password'}
                value={password.value}
                valid={password.valid}
                touch={password.touch}
                onChangeText={value =>
                  this.onChangeTextHandler('password', value)
                }
              />
              {this.renderConfirmPasword()}
            </View>
            <DefaultButton action={this.onSignInHandler} disabled={disable}>
              {isLogin ? 'SignIn' : 'SignUp'}
            </DefaultButton>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageBackground: {
    flex: 1,
    width: '100%'
  },
  text: {
    marginBottom: 15
  },
  redText: {
    color: 'red'
  },
  inputContainer: {
    width: '80%',
    marginTop: 5,
    marginBottom: 10
  }
});

const mapStateToProps = state => {
  const { loading, user } = state.auth;
  return { loading, user };
};

export default connect(
  mapStateToProps,
  { userSignIn }
)(AuthScreen);
