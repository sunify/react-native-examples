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
import Button from './components/Button';

class Blimb extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <AnimatedGradientBg
           style={styles.bg}
          />

        <View style={styles.start}>
          <Image
            style={styles.logo}
            source={require('./eye.png')}
            />
          <Button>Начать зарядку для глаз</Button>
        </View>
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
  start: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    marginTop: -60,
    marginBottom: 100,
  }
});

AppRegistry.registerComponent('Blimb', () => Blimb);
