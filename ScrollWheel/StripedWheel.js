import React, { View, StyleSheet } from 'react-native';

export default class StripedWheel extends React.Component {

  render() {
    return (
      <View style={styles.wheel}>
        {this.renderStripes(30)}
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
});
