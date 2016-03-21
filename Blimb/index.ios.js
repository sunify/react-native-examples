'use strict';
import React, {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  NavigationExperimental
} from 'react-native';
const {
  RootContainer: NavigationRootContainer,
  Reducer: NavigationReducer,
} = NavigationExperimental;

import AnimatedGradientBg from './components/AnimatedGradientBg';
import StartScreen from './components/StartScreen';
import TrainScreen from './components/TrainScreen';

const screens = {
  start: props => (<StartScreen {...props} />),
  train: props => (<TrainScreen {...props} />),
};

class Blimb extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <AnimatedGradientBg
           style={styles.bg}
          />

        <NavigationRootContainer
          reducer={NavigationBasicReducer}
          persistenceKey="NavigationBasicExampleState"
          ref={navRootContainer => { this.navRootContainer = navRootContainer; }}
          renderNavigation={(navState, onNavigate) => {
            console.log(navState);
            if(navState) {
              return screens[navState.children[navState.index].key]({
                onNavigate
              });
            } else {
              return null;
            }
          }}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  bg: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  }
});

AppRegistry.registerComponent('Blimb', () => Blimb);

const StackReducer = NavigationReducer.StackReducer;
const NavigationBasicReducer = StackReducer({
  getPushedReducerForAction: (action) => {
    if (action.type === 'push') {
      return (state) => state || {key: action.key};
    }
    return null;
  },
  getReducerForState: (initialState) => (state) => state || initialState,
  initialState: {
    key: 'App',
    index: 0,
    children: [
      { key: 'start' },
    ]
  },
});
