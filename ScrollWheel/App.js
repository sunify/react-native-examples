import React, { View, Text, StyleSheet } from 'react-native';
import ScrollWheel from './ScrollWheel';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: 0,
    };
  }

  render() {
    const { value } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.value}>
          {value}
        </Text>
        <ScrollWheel
          value={value}
          step={10}
          onChange={value => this.setState({ value })}
          />
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
  },
  value: {
    fontSize: 72,
    fontWeight: '100',
    color: '#444',
    marginBottom: 40,
    marginTop: -80
  }
})
