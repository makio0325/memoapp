import React, {useEffect} from 'react';
import {View , StyleSheet} from 'react-native';

import MemoList from '../components/MemoList';
import CircleButton from '../components/CircleButton';
import LogOutButton from '../components/LogOutButton';



export default function MemoListScreen(props){
    const {navigation} = props;

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <LogOutButton />,
        });
    });

    return (

    <View style={styles.container}>

        <MemoList />
        <MemoList />
        <MemoList />
        <CircleButton name="plus" onPress={()=> {navigation.navigate('MemoCreate');}}/>
    </View>
    );
}

//navigation.setOptionsでログアウトボタンを設定しており、オプションの一部として、ログアウトボタンを指定している。
//headerRight以降は元々は、「() => {return <LogOutButton />}」となるが、省略した書き方になっている。
//navigation.setOptionsの部分はuseEffectに入れなくても表示することが出来るがReactから「bodyの中で他のコンポーネントを更新するな」という警告が出るので、useEffectに入れて副作用的処理であることを明確にしている。

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F4F8'
    }
});