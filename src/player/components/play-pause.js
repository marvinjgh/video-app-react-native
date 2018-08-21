import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

function PlayPause(props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={styles.container}
      hitSlop={{
        left: 5,
        top: 5,
        bottom: 5,
        right: 5
      }}
    >
      {!props.replay && props.paused && <Icon name="play-arrow" size={60} color="#98ca3f" />}
      {!props.replay && !props.paused && <Icon name="pause" size={60} color="#98ca3f" />}
      {props.replay && <Icon name="replay" size={60} color="#98ca3f" />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    // paddingHorizontal: 10,
    // marginVertical: 5,
  }
});

export default PlayPause;
