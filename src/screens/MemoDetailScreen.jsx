import React from 'react';
import {View, ScrollView,Text, StyleSheet} from 'react-native';
import AppBar from '../components/AppBar';
import CircleButton from '../components/CircleButton';

export default function MemoDetailScreen () {
    return (
        <View>
            <AppBar />
            <View>
                <Text>買い物リスト</Text>
                <Text>2020年1月1日</Text>
            </View>
            <ScrollView>
                <Text>
                買い物リストの内容部分。
                書体やレイアウトなどを確認するために用います。
                本文用なので使い方を間違えると不自然に見えることもありますので要注意。
                </Text>
            </ScrollView>
            <CircleButton>A</CircleButton>
        </View>
    );
}