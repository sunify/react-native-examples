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
              В комплексе набор упражнений, во время которых нужно смотреть в направления, указываемые точкой.
            </Text>
          </View>
          <View style={styles.page}>
            <Text style={styles.pageText}>
              {'Точка показывает только направление — взгляд перемещайте до упора,\nно не сильно.'}
            </Text>
            <Text style={styles.pageText}>
              {'В крайних точках задерживайте\nвзгляд на секунду.'}
            </Text>
          </View>
          <View style={styles.page}>
            <Text style={styles.pageText}>
              После выполнения каждого упражнения можно легонько зажмуриться или поморгать пару секунд – это помогает расслабиться глазам.
            </Text>
          </View>
          <View style={styles.page}>
            <Text style={styles.pageText}>
              {'Общее время упражнения:\n3 минуты 25 секунд.'}
            </Text>
          </View>
        </Swiper>

        <Button style={{ marginTop: 20 }}>Начать зарядку для глаз</Button>
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
    paddingHorizontal: 30,
    flex: 1,
    justifyContent: 'center',
    marginTop: -100,
  },
  pageText: {
    color: '#FFF',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 10,
  },
  logo: {
    marginTop: 30,
  }
});
