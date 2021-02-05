import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {string ,shape, func} from 'prop-types';
import { Feather } from '@expo/vector-icons'; 

export default function CircleButton (props){
    const {style ,name,size, color , onPress} = props;


    return(
        <TouchableOpacity style={[styles.circleButton,style]}　onPress={onPress}>
            <Feather name={name} size={32} color="white" />
        </TouchableOpacity>
    )
}

//ここでサークルボタンのスタイルをその時に応じて自由に変えられるように、値をpropsで受け取るようにしている。
//またその時の値は文字列ではないのでproptypeでshapeを指定している。
//shape()という形で何も指定しなければ何でも中に入れることが出来る。
//例えばボタンを使うスクリーンで、「style={{top :24}}」といった形で記述すると、位置に関するプロパティが更新され、上から24pxの所にボタンが配置される。
//今回はAntDesignというモジュールをインポートしているので、AntDesign内で名前があるものはレンダリング出来るが、異なるものはレンダリング出来ない(?になる)。

//更にここではボタンをクリックした時にアニメーションが起こるようにTouchableOpacityというものを使用している。
//Nativeからインポートした後、Viewの部分にTouchableOpacityを入れる。
//さらに受け取るPropsの中にonPressを追加する。こうすることでボタンを使う側のスクリーンでonPressを渡してTouchableOpacityを使用できる。
//onPressで渡ってくる値は関数であり、渡す側でその処理を指定することで様々なアクションを表現している。

CircleButton.prototype = {
    style: shape(),
    name: string.isRequired,
    onPress: func,
}

CircleButton.defaultProps = {
    style : null,
    onPress: null,
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