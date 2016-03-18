import React, { PropTypes, View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default class Button extends React.Component {

  static propTypes = {
    onPress: PropTypes.func,
    style: PropTypes.any,
    children: PropTypes.any,
  };

  render() {
    const { onPress, style, children, ...rest } = this.props;

    return (
      <TouchableOpacity onPress={onPress}>
        <View style={[styles.button, style]} {...rest}>
          {typeof children === 'string'
            ? <Text style={styles.text}>{children}</Text>
            : children
          }
        </View>
      </TouchableOpacity>
    );
  }

}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 44,
    borderRadius: 22,
    borderWidth: 3,
    borderColor: '#FFF',
    backgroundColor: 'transparent',
  },
  text: {
    fontSize: 18,
    color: '#FFF',
  }
});
