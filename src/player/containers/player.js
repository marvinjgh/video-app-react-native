import React, { Component } from "react";
import Video from "react-native-video";
import { StyleSheet, ActivityIndicator, Text } from "react-native";
import Layout from "../components/player-layout";
import ControlLayout from "../components/control-layout";
import PlayPause from "../components/play-pause";
import TimeText from "../components/time-text";
import Slider from "../components/progress-slider";
import Fullscreen from "../components/fullscreen";

// TODO: Completar los botones de control

class Player extends Component {
  state = {
    loading: true, // Estado de carga del video
    paused: false, // Indicador de pausa
    progress: 0, // Progreso del video entre 0 y 1
    currentTime: 0, // Tiempo actual en segundos
    duration: 0, // Duración del vídeo en segundos
    changeActive: false, // Activo mientras se cambia la posición del vídeo
    fullscreen: false // Estado de fullscreen
  };
  onBuffer = ({ isBuffering }) => {
    this.setState({ loading: isBuffering });
  };
  onLoad = ({ duration, currentTime }) => {
    this.setState({
      loading: false,
      duration: duration,
      currentTime: currentTime
    });
  };
  onProgress = ({ currentTime, playableDuration, seekableDuration }) => {
    this.setState({
      currentTime: currentTime
    });
  };
  playPause = () => {
    this.setState({
      paused: !this.state.paused
    });
  };
  sliderChange = value => {
    this.setState({
      currentTime: value,
      changeActive: true
    });
  };
  sliderFinished = value => {
    this.setState({
      currentTime: value,
      changeActive: false
    });
    this.player.seek(value);
  };
  fullscreen = () => {
    this.setState({
      fullscreen: !this.state.fullscreen
    });
    if (!this.state.fullscreen) {
      this.player.presentFullscreenPlayer();
    } else {
      this.player.dismissFullscreenPlayer();
    }
  };
  render() {
    const uri_video =
      "https://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4";
    const { loading, changeActive, paused, currentTime, duration, fullscreen } = this.state;
    return (
      <Layout
        loading={loading}
        video={
          <Video
            ref={ref => {
              this.player = ref;
            }}
            source={{ uri: uri_video }}
            style={styles.video}
            resizeMode="contain"
            onLoad={this.onLoad}
            onBuffer={this.onBuffer}
            paused={changeActive ? true : paused}
            onProgress={this.onProgress}
          />
        }
        loader={<ActivityIndicator color="white" />}
        controls={
          <ControlLayout>
            <PlayPause onPress={this.playPause} paused={paused} />
            <TimeText time={currentTime} />
            <Slider
              progress={currentTime}
              duration={duration}
              sliderChange={this.sliderChange}
              sliderFinished={this.sliderFinished}
            />
            <TimeText time={duration} />
            <Fullscreen onPress={this.fullscreen} isFullscreen={fullscreen}/>
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

export default Player;
