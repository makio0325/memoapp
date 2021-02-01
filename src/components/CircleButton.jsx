import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {string ,shape} from 'prop-types';

export default function CircleButton (props){
    const {children ,style } = props;


    return(
        <View style={[styles.circleButton,style]}>
            <Text style={styles.circleButtonLabel}>{children}</Text>
        </View>
    )
}

//ここでサークルボタンのスタイルをその時に応じて自由に変えられるように、値をpropsで受け取るようにしている。
//またその時の値は文字列ではないのでproptypeでshapeを指定している。
//shape()という形で何も指定しなければ何でも中に入れることが出来る。
//例えばボタンを使うスクリーンで、「style={{top :24}}」といった形で記述すると、位置に関するプロパティが更新され、上から24pxの所にボタンが配置される。

CircleButton.prototype = {
    children: string.isRequired,
    style: shape(),
}

CircleButton.defaultProps = {
    style : null,
}

const styles = StyleSheet.create({
    circleButton:{
        backgroundColor: '#467FD3',
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 40,
        bottom:40,
        shadowColor: '#000000',
        textShadowOffset: {width: 0, height: 8},
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 8,
        //shadowプロパティはiOS専用で、elevationはAnd専用のプロパティ。
        },
    
    circleButtonLabel:{
        color: '#ffffff',
        fontSize: 40,
        lineHeight:40, 
    }
    
});