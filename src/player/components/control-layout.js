import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import CenterLayout from '../../sections/components/center-layout';

function ControlLayout(props) {
  return (
    <TouchableOpacity style={styles.superContainer}
    onPress={props.onPress}>
      {props.showControls && (
        <CenterLayout style={styles.container}>{props.children}</CenterLayout>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,.5)",
    flexDirection: "row",
    // paddingHorizontal: 10,
  },
  superContainer: {
    backgroundColor: "transparent",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0
  }
});

export default ControlLayout;
