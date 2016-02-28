import React, { View, StyleSheet, Animated, PanResponder, PropTypes } from 'react-native';

export default class ScrollWheel extends React.Component {

  static propTypes = {
    value: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
    onChange: PropTypes.func,
    children: PropTypes.any,
  };

  constructor(props) {
    super(props);

    this.state = {
      rotateAngle: new Animated.Value(0),
    };
    this.lastAngle = 0;
    this.inTouch = false;

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => true,
      onStartShouldSetPanResponderCapture: (e, gestureState) => true,
      onMoveShouldSetPanResponder: (e, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (e, gestureState) => true,
      onPanResponderGrant: this.handlePanResponderGrant.bind(this),
      onPanResponderMove: this.handlePanResponderMove.bind(this),
      onPanResponderTerminationRequest: (e, gestureState) => true,
      onPanResponderRelease: (e, gestureState) => {
        this.inTouch = false;
      },
      onPanResponderTerminate: (e, gestureState) => {
        this.inTouch = false;
      },
      onShouldBlockNativeResponder: (e, gestureState) => true,
    });

    this.handleLayout = this.handleLayout.bind(this);
  }

  handleLayout() {
    requestAnimationFrame(() => {
      this.refs.root.measure((x, y, width, height, pageX, pageY) => {
        this.setState({ width, height, x: pageX, y: pageY });
      });
    });
  }

  handlePanResponderGrant(e, gestureState) {
    this.inTouch = true;
    const { width, height, x, y } = this.state;
    const { x0, y0 } = gestureState;
    const angle = angleFromDots(x + width / 2, y + height / 2, x0, y0);
    this.startAngle = angle - this.lastAngle;
  }

  handlePanResponderMove(e, gestureState) {
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
  }

  shouldComponentUpdate() {
    return !this.inTouch;
  }

  render() {
    const { rotateAngle } = this.state;
    const { children } = this.props;

    return (
      <View
        ref="root"
        onLayout={this.handleLayout}
        {...this._panResponder.panHandlers}
        {...this.props}
      >
        <Animated.View
          style={{
            transform: [{
              rotate: rotateAngle.interpolate({
                inputRange: [-180, 180],
                outputRange: ['180deg', '-180deg'],
              })
            }]
          }}
          >
          {children}
          {!children &&
            <View style={styles.wheel}>
              <View style={styles.pit} />
            </View>
          }
        </Animated.View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  wheel: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFF',
  },
  pit: {
    position: 'absolute',
    top: 10,
    left: 40,
    width: 20,
    height: 20,
    borderRadius: 10,
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
