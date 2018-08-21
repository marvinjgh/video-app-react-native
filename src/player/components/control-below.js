import React from "react";
import { View, StyleSheet } from "react-native";
import TimeText from "./time-text";
import Slider from "./progress-slider";
import Fullscreen from "./fullscreen";

function ControlBelow({ currentTime, duration, sliderChange, sliderFinished, fullscreen,  isFullscreen}) {
  return (
    <View style={styles.container}>
      <TimeText style={styles.left} time={currentTime} />
      <Slider
        progress={currentTime}
        duration={duration}
        sliderChange={sliderChange}
        sliderFinished={sliderFinished}
      />
      <TimeText time={duration} />
      <Fullscreen style={styles.right} onPress={fullscreen} isFullscreen={isFullscreen} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 35,
    flexDirection: "row",
    alignItems: "center"
  },
  left:{
    paddingLeft:10
  },
  right:{
    paddingHorizontal:10
  }
});

export default ControlBelow;
