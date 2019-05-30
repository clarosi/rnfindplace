import { Navigation } from 'react-native-navigation';
import { getImageSource } from 'react-native-vector-icons/Octicons';

import {
  sideDrawerId,
  navFindPlace,
  navSharePlace,
  navSideDrawer
} from '../../shared/utils/strings/navigation';

const PROPS = { size: 40, color: 'blue' };

const startMainTab = () => {
  const { size, color } = PROPS;
  Promise.all([
    getImageSource('file-symlink-file', size),
    getImageSource('search', size),
    getImageSource('grabber', size)
  ]).then(sources => {
    // startTabBasedApp(params) -> setRoot({bottomTabs})
    Navigation.setRoot({
      root: {
        sideMenu: {
          left: { component: { name: navSideDrawer } },
          center: {
            bottomTabs: {
              children: [
                {
                  stack: {
                    children: [{ component: { name: navSharePlace } }],
                    options: {
                      topBar: {
                        title: { text: 'Share Place' },
                        leftButtons: [{ id: sideDrawerId, icon: sources[2] }]
                      },
                      bottomTab: {
                        id: navSharePlace,
                        text: 'Share Place',
                        icon: sources[0],
                        selectedIconColor: color
                      }
                    }
                  }
                },
                {
                  stack: {
                    children: [{ component: { name: navFindPlace } }],
                    options: {
                      topBar: {
                        title: { text: 'Find Place' },
                        leftButtons: [{ id: sideDrawerId, icon: sources[2] }]
                      },
                      bottomTab: {
                        id: navFindPlace,
                        text: 'Find Place',
                        icon: sources[1],
                        selectedIconColor: color
                      }
                    }
                  }
                }
              ]
            }
          }
        }
      }
    });
  });
};

export default startMainTab;
