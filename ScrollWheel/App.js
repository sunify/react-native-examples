import React, { View, Text, StyleSheet } from 'react-native';
import ScrollWheel from './ScrollWheel';
import StripedWheel from './StripedWheel';

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
        <View style={styles.wheels}>
          <ScrollWheel
            value={value}
            step={1}
            onChange={value => this.setState({ value })}
          >
            <StripedWheel />
          </ScrollWheel>

          <ScrollWheel
            value={value}
            step={1}
            onChange={value => this.setState({ value })}
            />
        </View>
        <View style={styles.wheels}>
          <ScrollWheel
            value={value}
            step={1}
            onChange={value => this.setState({ value })}
          >
          <View style={{
              width: 100,
              height: 30,
              backgroundColor: '#FFF',
              borderRadius: 5
            }} />
          </ScrollWheel>

          <ScrollWheel
            value={value}
            step={1}
            onChange={value => this.setState({ value })}
          >
            <View style={{
                borderTopWidth: 50,
                borderTopColor: '#FFF',
                borderLeftWidth: 50,
                borderLeftColor: 'transparent',
                borderRightWidth: 50,
                borderRightColor: 'transparent',
                borderRadius: 5
              }} />
          </ScrollWheel>
        </View>
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
    marginTop: -80
  },
  wheels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 250,
    marginTop: 40,
  },
})
