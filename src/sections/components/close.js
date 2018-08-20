import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function Close(props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={styles.container}
    >
    <Icon name="close" size={22} color="#ffffff" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    fontWeight: 'bold',
    color: 'white',
  },
  container: {
    backgroundColor: '#14b739',
    borderRadius: 12,
    width: 25,
    height: 25,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default Close