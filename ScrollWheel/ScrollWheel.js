import React, { View, StyleSheet, Animated, PanResponder, PropTypes } from 'react-native';

export default class ScrollWheel extends React.Component {

  static propTypes = {
    value: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
    onChange: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      rotateAngle: new Animated.Value(0),
    };
    this.lastAngle = 0;
    this.inTouch = false;

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        this.inTouch = true;
        const { x, y, width, height } = this.state;
        const { x0, y0 } = gestureState;
        const angle = angleFromDots(x + width / 2, y + height / 2, x0, y0);
        this.startAngle = angle - this.lastAngle;
      },
      onPanResponderMove: (evt, gestureState) => {
        const { x, y, width, height, rotateAngle } = this.state;
        const { value, step, onChange } = this.props;
        const { moveX, moveY } = gestureState;
        const angle = angleFromDots(x + width / 2, y + height / 2, moveX, moveY) - this.startAngle;
        const delta = loopDelta((angle + this.startAngle) - (this.lastAngle + this.startAngle));
        const newValue = value + Math.abs(delta) * step * (0 - Math.sign(delta));

        onChange && onChange(
          newValue - newValue % this.props.step
        );
        rotateAngle.setValue(angle);
        this.lastAngle = angle;
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        this.inTouch = false;
      },
      onPanResponderTerminate: (evt, gestureState) => {
        this.inTouch = false;
      },
      onShouldBlockNativeResponder: (evt, gestureState) => true,
    });
  }

  shouldComponentUpdate() {
    return !this.inTouch;
  }

  render() {
    const { rotateAngle } = this.state;

    return (
      <Animated.View
        {...this._panResponder.panHandlers}
        onLayout={e => this.setState(e.nativeEvent.layout)}
        style={{
          transform: [{
            rotate: rotateAngle.interpolate({
              inputRange: [-180, 180],
              outputRange: ['180deg', '-180deg'],
            })
          }]
        }}
        >
        <View style={styles.wheel}>
          <View style={styles.pit} />
        </View>
      </Animated.View>
    );
  }

}

const styles = StyleSheet.create({
  wheel: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#FFF',
  },
  pit: {
    position: 'absolute',
    top: 80,
    left: 150,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccc',
  },
});

function angleFromDots(x0, y0, x1, y1) {
  let theta = Math.atan2(y0 - y1, x1 - x0);
  if (theta < 0)
    theta += 2 * Math.PI;
  return theta * (180 / Math.PI);
}

function loopDelta(delta) {
  const abs = Math.abs(delta);
  if(abs > 300) {
    return (360 - abs) * (0 - Math.sign(delta));
  } else {
    return delta;
  }
}
