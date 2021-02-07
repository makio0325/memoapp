import React, {useEffect} from 'react';
import {View , StyleSheet, Alert} from 'react-native';
import firebase from 'firebase';

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

    useEffect(() => {
        const db = firebase.firestore();
        const { currentUser } = firebase.auth();
        let unsubscribe = () => {};
        if (currentUser) {
            const ref = db.collection(`users/${currentUser.uid}/memos`).orderBy('updatedAt', 'desc');
            unsubscribe = ref.onSnapshot((snapshot) => {
                snapshot.forEach((doc) => {
                    console.log(doc.id,doc.data());
            });
            },(error) => {
                console.log(error);
                Alert,alert('データの読み込みに失敗しました。');
            });
        }
        return unsubscribe;
    },[]);

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

//const { currentUser } = firebase.auth(); → ログイン中のユーザー情報の確認
//const ref = db.collection(`users/${currentUser.uid}/memos`) → ログイン中のユーザーのmemosまでのレファレンスをrefに格納。
//ref.onSnapshot以降 → メモのリストの監視。snapshotにはメモのリストに関する情報(配列)が入っている。それをforEachで繰り返し表示する。
//さらにforeachもコールバック関数を設定できるので、一旦console.logでidとデータの中身を出力している。

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F4F8'
    }
});