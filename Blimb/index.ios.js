'use strict';
import React, {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image
} from 'react-native';
import AnimatedGradientBg from './components/AnimatedGradientBg';
import StartScreen from './components/StartScreen';

class Blimb extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <AnimatedGradientBg
           style={styles.bg}
          />

        <StartScreen />
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
