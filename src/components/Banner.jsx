import React from 'react';
import { View, StyleSheet} from "react-native";
import { AdMobBanner } from 'expo-ads-admob';

export default function Banner (props) {
  const {style} = props;

  function bannerError() {
    console.log("Ad Fail error")
  }

  return(
    <View>
      <AdMobBanner 
          adSize="fullBanner"
          adUnitID="ca-app-pub-3940256099942544/2934735716"
          style={style}
          onDidFailToReceiveAdWithError={bannerError} 
      />
    </View>
  )
};

