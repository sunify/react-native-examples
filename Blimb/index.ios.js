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

class Blimb extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <AnimatedGradientBg
           style={styles.bg}
          />

        <Image source={require('./eye.png')} />
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
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Blimb', () => Blimb);
