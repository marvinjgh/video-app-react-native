import React from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import CenterLayout from '../../sections/components/center-layout';

function Layout(props) {
  return (
    <View style={styles.container}>
      <View style={styles.video}>
        {props.video}
      </View>
      <CenterLayout>
        {
          props.loading &&
          props.loader
        }
      </CenterLayout>
      {props.controls}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: '56.25%',
  },
  video: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
  }
})

export default Layout;