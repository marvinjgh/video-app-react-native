import React, { Component } from "react";
import Video from "react-native-video";
import { StyleSheet, ActivityIndicator, Text } from "react-native";
import Layout from "../components/player-layout";
import ControlLayout from "../components/control-layout";
import PlayPause from "../components/play-pause";
import ControlBelow from "../components/control-below";

class Player extends Component {
  componentWillMount(){
    this.timer = setTimeout(() => {
      this.setState({ showControls: false });
    }, 3000);
  }
  /**
   * Estado inicial del reproductor
   */
  state = {
    loading: true, // Estado de carga del video
    paused: false, // Indicador de pausa
    progress: 0, // Progreso del video entre 0 y 1
    currentTime: 0, // Tiempo actual en segundos
    duration: 0, // Duración del vídeo en segundos
    changeActive: false, // Activo mientras se cambia la posición del vídeo
    isFullscreen: false, // Estado de fullscreen
    showControls: true, // Indica si muestro los controles
    replay: false // Indica si termino la reproducción
  };
  /**
   * Manejo de la referencia al reproductor
   */
  handleRef = ref => (this.player = ref);
  /**
   * Saber si esta descargando parte del video
   */
  onBuffer = ({ isBuffering }) => {
    this.setState({ loading: isBuffering });
  };
  /**
   * Se obtuvo la información del video
   */
  onLoad = ({ duration, currentTime }) => {
    this.setState({
      loading: false,
      duration: duration,
      currentTime: currentTime
    });
  };
  /**
   * Actualización de en que punto de la reproducción esta avanzando
   */
  onProgress = ({ currentTime, playableDuration, seekableDuration }) => {
    this.setState({
      currentTime: currentTime,
      replay: currentTime === seekableDuration
    });
  };
  /**
   * Pausar o no la reproducción
   */
  playPause = () => {
    //if (this.state.showControls && this.state.paused) {
    //console.log('Click again to hide');
    //} else {
    if (this.state.showControls && !this.state.paused) {
      clearTimeout(this.timer);

    }
    if (this.state.showControls && this.state.paused) {
      this.timer = setTimeout(() => {
        this.setState({ showControls: false });
      }, 3000);
    }
    this.setState({
      paused: !this.state.paused
    });
  };
  /**
   * Cambiar el punto de la reproducción actual, evita la reproddución durante el proceso
   */
  sliderChange = value => {
    this.setState({
      currentTime: value,
      changeActive: true
    });
  };
  /**
   * Se actualiza el punto de reproducción despues del cambio
   */
  sliderFinished = value => {
    this.setState({
      currentTime: value,
      changeActive: false,
      replay: value === this.state.duration
    });
    this.player.seek(value);
    
  };
  /**
   * Indicar que se esta en fullscreen y eliminar la barra de estado en el dispositivo
   */
  fullscreen = () => {
    // TODO: Hacer que cambie la orientación y elimine el header
    this.setState({
      isFullscreen: !this.state.isFullscreen
    });
    /*if (!this.state.isFullscreen) {
      this.player.presentFullscreenPlayer();
    } else {
      this.player.dismissFullscreenPlayer();
    }*/
  };
  /**
   * Manejo de cuando se preciona el video y muesta/oculta los controles
   */
  onPressControls = () => {
    const { showControls, paused } = this.state;
    if (!showControls && !paused) {
      this.timer = setTimeout(() => {
        this.setState({ showControls: false });
      }, 3000);
    }
    // Mostrar los controles
    if (!showControls) this.setState({ showControls: true });
    // Ocultar los controles
    else this.setState({ showControls: false });
  };
  /**
   * Acciones a realizar al eliminar el reproductor
   */
  componentWillUnmount() {
    clearTimeout(this.timer);
  }
  render() {
    const {
      loading,
      changeActive,
      paused,
      currentTime,
      duration,
      isFullscreen,
      replay
    } = this.state;
    return (
      <Layout
        loading={loading}
        video={
          <Video
            ref={this.handleRef}
            source={{
              uri:
                "https://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4"
            }}
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
          <ControlLayout
            showControls={this.state.showControls}
            onPress={this.onPressControls}
          >
            <PlayPause onPress={this.playPause} paused={paused} replay={replay}/>
            <ControlBelow
              currentTime={currentTime}
              duration={duration}
              sliderChange={this.sliderChange}
              sliderFinished={this.sliderFinished}
              fullscreen={this.fullscreen}
              isFullscreen={isFullscreen}
            />
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
