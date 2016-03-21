import React, { View, StyleSheet, Text } from 'react-native';
import Button from './Button';

export default class TrainScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      counter: scenario[0].time,
      scenarioIndex: 0,
      done: false,
    };

    this.interval = setInterval(this.handleInterval.bind(this), 1000);
  }

  handleRestart() {
    this.setState({
      counter: scenario[0].time,
      scenarioIndex: 0,
      done: false,
    });
    this.interval = setInterval(this.handleInterval.bind(this), 1000);
  }

  handleInterval() {
    const { done, counter, scenarioIndex } = this.state;

    if(counter === 0 && !scenario[scenarioIndex + 1]) {
      clearInterval(this.interval);
      this.setState({
        done: true,
      });
    } else if(counter === 0) {
      this.setState({
        scenarioIndex: scenarioIndex + 1,
        counter: scenario[scenarioIndex + 1].time,
      });
      // ding-dong here
    } else {
      this.setState({
        counter: counter - 1,
      });
    }
  }

  render() {
    const { done, counter, scenarioIndex } = this.state;

    return (
      <View style={styles.container}>
        {done &&
          <Text style={styles.counter}>Готово</Text>
        }
        {done &&
          <Button onPress={this.handleRestart.bind(this)}>
            Еще раз
          </Button>
        }
        {!done &&
          <Text style={styles.counter}>
            {counter}
          </Text>
        }
        {!done &&
          <Text style={styles.counter}>{scenario[scenarioIndex].type}</Text>
        }
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  counter: {
    fontSize: 36,
    fontWeight: '200',
    color: '#FFF',
  }
});

const scenario = [
  { time: 20, type: 'close' },
  { time: 30, type: 'vertical' },
  { time: 10, type: 'horizontal' },
  { time: 40, type: 'diagonal' },
  { time: 20, type: 'circle' },
  { time: 20, type: 'spiral' },
];
