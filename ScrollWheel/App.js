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
        <View style={styles.wheels}>
          <ScrollWheel
            value={value}
            step={10}
            onChange={value => this.setState({ value })}
          >
            <View style={styles.wheel}>
              {this.renderStripes(30)}
            </View>
          </ScrollWheel>
          <ScrollWheel
            value={value}
            step={1}
            onChange={value => this.setState({ value })}
            />
        </View>
      </View>
    );
  }

  renderStripes(count) {
    const stripes = [];
    for(let i = 0; i < count; i ++) {
      stripes.push(
        <View
          key={i}
          style={[styles.stripe, {
            top: 50 + 35 * Math.cos(i / count * Math.PI * 2),
            left: 50 + 35 * Math.sin(i / count * Math.PI * 2),
            transform: [
              { translateY: -10 },
              { rotate: `${360 - i / count * 360}deg` },
            ],
          }]}
          />
      );
    }

    return stripes;
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
  },
  wheels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 250,
  },
  wheel: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFF',
  },
  stripe: {
    position: 'absolute',
    width: 0.5,
    height: 20,
    backgroundColor: '#ccc',
  }
})
