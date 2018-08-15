import React, { Component } from "react";
import Video from "react-native-video";
import { StyleSheet, ActivityIndicator, Text } from "react-native";
import Layout from "../components/player-layout";
import ControlLayout from "../components/control-layout";
import PlayPause from "../components/play-pause";
import { connect } from "react-redux";
import {getTimeFromSec} from "../../../utils/time"

// TODO: Completar los botones de control

class Player extends Component {
  onBuffer = ({ isBuffering }) => {
    this.props.dispatch({
      type: "VIDEO_STOP_LOADING",
      payload: {
        videoLoading: isBuffering
      }
    });
  };
  onLoad = ({ duration, currentTime }) => {
    this.props.dispatch({
      type: "VIDEO_STOP_LOADING",
      payload: {
        videoLoading: false,
        duration: duration,
        currentTime: currentTime
      }
    });
  };
  playPause = () => {
    this.props.dispatch({
      type: "PLAY_PAUSE_VIDEO",
      payload: {
        paused: !this.props.paused
      }
    });
  };
  render() {
    const uri_video =
      "https://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4";
    return (
      <Layout
        loading={this.props.loading}
        video={
          <Video
            source={{ uri: uri_video }}
            style={styles.video}
            resizeMode="contain"
            onLoad={this.onLoad}
            onBuffer={this.onBuffer}
            paused={this.props.changeActive ? true : this.props.paused}
          />
        }
        loader={<ActivityIndicator color="white" />}
        controls={
          <ControlLayout>
            <PlayPause onPress={this.playPause} paused={this.props.paused} />
            <Text>{getTimeFromSec(this.props.currentTime)}</Text>
            <Text>| progress bar |</Text>
            <Text>{getTimeFromSec(this.props.duration)}</Text>
            <Text>fullscreen | </Text>
          </ControlLayout>
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  video: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0
  }
});

function mapStateToProps(state) {
  console.log("map");
  console.log(state);
  return {
    loading: state.videoLoading,
    paused: state.paused,
    //progress: state.progress,
    currentTime: state.currentTime,
    duration: state.duration,
    changeActive: state.changeActive
    //fullscreen: state.fullscreen,
  };
}

export default connect(mapStateToProps)(Player);
