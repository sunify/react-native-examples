import React, { View, StyleSheet } from 'react-native';
import ScrollWheel from './ScrollWheel';

export default class App extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <ScrollWheel />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEE',
    alignItems: 'center',
    justifyContent: 'center',
  }
})
