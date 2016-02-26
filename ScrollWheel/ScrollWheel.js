import React, { View, StyleSheet, Animated, PanResponder } from 'react-native';

export default class ScrollWheel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      angle: new Animated.Value(0),
    };
    this.lastAngle = 0;

    // this.state.angle.addListener(e => {
    //   console.log(e);
    // });
    // console.log(this.state.angle);

    this._panResponder = PanResponder.create({
			onStartShouldSetPanResponder: (evt, gestureState) => true,
			onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
			onMoveShouldSetPanResponder: (evt, gestureState) => true,
			onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
			onPanResponderGrant: (evt, gestureState) => {
        const { x, y } = this.state;
        const { x0, y0 } = gestureState;
        const angleDeg = angleFromDots(x + 70, y + 70, x0, y0);
        this.startAngle = angleDeg - this.lastAngle;
			},
			onPanResponderMove: (evt, gestureState) => {
        const { x, y, angle } = this.state;
        const { moveX, moveY } = gestureState;
        const angleDeg = angleFromDots(x + 70, y + 70, moveX, moveY) - this.startAngle;
        angle.setValue(angleDeg);
        this.lastAngle = angleDeg;
			},
			onPanResponderTerminationRequest: (evt, gestureState) => true,
			onPanResponderRelease: (evt, gestureState) => {
        const { angle } = this.state;
			},
			onPanResponderTerminate: (evt, gestureState) => {

			},
			onShouldBlockNativeResponder: (evt, gestureState) => true,
		});
  }

  render() {
    const { angle } = this.state;

    return (
      <Animated.View
        {...this._panResponder.panHandlers}
        onLayout={e => this.setState(e.nativeEvent.layout)}
        style={[styles.wheel, {
          transform: [{
            rotate: angle.interpolate({
              inputRange: [-180, 180],
              outputRange: ['-180deg', '180deg'],
            })
          }]
        }]}
        >
        <View style={styles.pit} />
        <View style={[styles.pit, styles.pit1]} />
        <View style={[styles.pit, styles.pit2]} />
        <View style={[styles.pit, styles.pit3]} />
      </Animated.View>
    );
  }

}

const styles = StyleSheet.create({
  wheel: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#FFF',
  },
  pit: {
    position: 'absolute',
    top: 50,
    left: 90,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccc',
  },
  pit1: {
    top: 10,
    left: 50,
    backgroundColor: '#cf0',
  },
  pit2: {
    left: 10,
    top: 50,
    backgroundColor: '#c0f',
  },
  pit3: {
    top: 90,
    left: 50,
    backgroundColor: '#f0c',
  },
});

function angleFromDots(x0, y0, x1, y1) {
  let theta = Math.atan2(y0 - y1, x1 - x0);
  if (theta < 0)
    theta += 2 * Math.PI;
  return 0 - theta * (180 / Math.PI) + 360;
}
