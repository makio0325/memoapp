import React from 'react';
import {View , StyleSheet} from 'react-native';

import AppBar from '../src/components/AppBar';
import MemoList from '../src/components/MemoList';
import CircleButton from '../src/components/CircleButton';



export default function MemoListScreen(){
    return (

    <View style={styles.container}>
        <AppBar />
        <MemoList />
        <MemoList />
        <MemoList />
        <CircleButton>✑</CircleButton>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F4F8'
    }
});