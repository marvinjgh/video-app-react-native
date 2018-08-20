import React from "react";
import { View, StyleSheet} from "react-native";
import TimeText from "../components/time-text";
import Slider from "../components/progress-slider";
import Fullscreen from "../components/fullscreen";

function ControlBelow(props) {
  const { currentTime, duration } = props;
  return (
    <View style={styles.container}>
      <TimeText time={currentTime} />
      <Slider progress={currentTime} duration={duration} />
      <TimeText time={duration} />
      <Fullscreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,.6)',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 35,
    flexDirection: 'row',
    //paddingHorizontal: 10,
    alignItems: 'center',
  }
})

export default ControlBelow;
