import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import store from './store';
import AuthScreen from './screens/Auth';
import SharePlace from './screens/SharePlace';
import FindPlace from './screens/FindPlace';
import SideDrawer from './screens/SideDrawer';

import {
  navAuth,
  navSharePlace,
  navFindPlace,
  navSideDrawer
} from './shared/utils/strings/navigation';

// Register screens
Navigation.registerComponent(navAuth, () => props =>
  wrappedRedux(AuthScreen, props)
);
Navigation.registerComponent(navSharePlace, () => props =>
  wrappedRedux(SharePlace, props)
);
Navigation.registerComponent(navFindPlace, () => props =>
  wrappedRedux(FindPlace, props)
);
Navigation.registerComponent(navSideDrawer, () => props =>
  wrappedRedux(SideDrawer, props)
);

const wrappedRedux = (Component, props) => (
  <Provider store={store}>
    <Component {...props} />
  </Provider>
);

// startSingleScreenApp(params) -> setRoot({stack})
Navigation.setRoot({
  root: {
    stack: {
      children: [{ component: { name: navAuth } }],
      options: { topBar: { title: { text: 'Login' } } }
    }
  }
});
