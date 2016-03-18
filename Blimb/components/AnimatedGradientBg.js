const gradients = [
  {start: [69, 126, 128], stop: [145, 203, 205]},
  {start: [53, 76, 116], stop: [82, 123, 156]},
  {start: [201, 91, 119], stop: [137, 93, 160]},
  {start: [138, 219, 176], stop: [157, 197, 120]},
  {start: [233, 126, 130], stop: [242, 166, 109]},
  {start: [146, 122, 155], stop: [193, 96, 161]},
  {start: [172, 26, 1], stop: [152, 93, 131]}
];

import React from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class AnimatedGradientBg extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      i: 0,
      values: {
        start: [...gradients[0].start],
        stop: [...gradients[0].stop],
      },
      steps: calcSteps(gradients[0], gradients[1]),
      stepsCount: 0,
    };

    setInterval(this.updateValues.bind(this), 40);
  }

  updateValues() {
    const { values, steps, i, stepsCount } = this.state;
    const nextValues = addSteps(values, steps);
    const next = i >= gradients.length - 1 ? 0 : i + 1;
    const nextNext = next >= gradients.length - 1 ? 0 : next + 1;

    if(stepsCount + 1 > 120) {
      this.setState({
        values: gradients[next],
        i: next,
        stepsCount: 0,
        steps: calcSteps(gradients[next], gradients[nextNext])
      });
    } else {
      this.setState({
        values: nextValues,
        stepsCount: stepsCount + 1,
      });
    }
  }

  render() {
    const { values } = this.state;
    return (
      <LinearGradient
        colors={[
          rgb(...values.start),
          rgb(...values.stop),
        ]}
        start={[0.0, 1.0]} end={[1.0, 0.0]}
        {...this.props}
        />
    );
  }

}

function rgb(...colors) {
  return `rgb(${colors.map(Math.round).join(',')})`;
}

function calcStep(a, b) {
  return (b - a) / 120;
}

function calcSteps(a, b) {
  return {
    start: a.start.map((n, i) => calcStep(n, b.start[i])),
    stop: a.stop.map((n, i) => calcStep(n, b.stop[i])),
  }
}

function addSteps(values, steps) {
  return {
    start: values.start.map((v, i) => v + steps.start[i]),
    stop: values.stop.map((v, i) => v + steps.stop[i]),
  };
}
