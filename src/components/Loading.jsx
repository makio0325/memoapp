import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {bool} from 'prop-types';

export default function Loading(props) {
  const {isLoading} = props;
  if (!isLoading) {
      return null;
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
				<ActivityIndicator size="large" color="#000000" />
      </View>
    </View>
  );
}

Loading.prototype = {
    isLoading: bool,
};

Loading.defultProps = {
    isLoading: false,
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    zIndex: 5,
  },
  inner: {
      marginBottom: 80,
  },
});

//他のコンポーネントとは関係なく表示したいので、position: 'absolute',を設定している。
//containerを一番外側のViewに設定しており、かつzIndexを設定しているので、この透明な一枚のスタイルは、一番上に表示されるようになっている。
//これが表示されている間は、後ろにある本来表示されるコンポーネントが薄い色で見えるという仕組み。