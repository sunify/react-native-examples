import React, { View, Image, ScrollView, StyleSheet, Text } from 'react-native';
import Button from './Button';
import Swiper from 'react-native-swiper';

export default class StartScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      height: 0,
    };
  }

  render() {
    const { onNavigate } = this.props;

    return (
      <View style={styles.container} onLayout={e => this.setState({ height: e.nativeEvent.layout.height })}>
        <Image
          style={styles.logo}
          source={require('./eye.png')}
          />
        <Swiper
          height={this.state.height - 280}
          dot={ <View style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            margin: 4,
            backgroundColor: 'rgba(255,255,255,0.3)'
          }} /> }
          activeDot={ <View style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            margin: 4,
            backgroundColor: '#FFF'
          }} /> }
          >
          <View style={styles.page}>
            <Text style={styles.pageText}>
              В комплексе набор упражнений, во&nbsp;время которых нужно смотреть в&nbsp;направления, указываемые точкой.
            </Text>
          </View>
          <View style={styles.page}>
            <Text style={styles.pageText}>
              {'Точка показывает только\nнаправление — взгляд перемещайте до упора, но не сильно.'}
            </Text>
            <Text style={styles.pageText}>
              {'В крайних точках задерживайте\nвзгляд на секунду.'}
            </Text>
          </View>
          <View style={styles.page}>
            <Text style={styles.pageText}>
              После выполнения каждого упражнения можно легонько зажмуриться или поморгать пару&nbsp;секунд – это помогает расслабиться&nbsp;глазам.
            </Text>
          </View>
          <View style={styles.page}>
            <Text style={styles.pageText}>
              {'Общее время упражнения:\n3 минуты 25 секунд.'}
            </Text>
          </View>
        </Swiper>

        <Button
          style={{ marginTop: 20 }}
          onPress={() => onNavigate({ type: 'push', key: 'train' })}
        >
          Начать зарядку для глаз
        </Button>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  page: {
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
    marginTop: -100,
  },
  pageText: {
    color: '#FFF',
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 10,
  },
  logo: {
    marginTop: 30,
  }
});
