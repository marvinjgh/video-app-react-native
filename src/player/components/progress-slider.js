import React from "react";
import { View, StyleSheet, Slider } from "react-native";

function ProgressSlider(props) {
  return (
    <View style={styles.progress}>
      <Slider
        disabled={(props.duration === 0)}
        maximumValue={props.duration}
        minimumValue={0}
        onValueChange={props.sliderChange}
        onSlidingComplete={props.sliderFinished}
        style={styles.slider}
        value={props.progress}
        // step={duration / 10000}
        maximumTrackTintColor="rgba(255, 255, 255, .40)"
        minimumTrackTintColor="#98ca3f"
        thumbTintColor="white"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  progress: {
    backgroundColor: "transparent",
    borderRadius: 50,
    flex: 1
  },
  slider: {
    //borderRadius: 50
  }
});

export default ProgressSlider;
