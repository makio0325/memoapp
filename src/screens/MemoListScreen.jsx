import React, {useEffect,useState} from 'react';
import {View , StyleSheet, Alert , Text} from 'react-native';
import firebase from 'firebase';

import MemoList from '../components/MemoList';
import CircleButton from '../components/CircleButton';
import LogOutButton from '../components/LogOutButton';
import Button from '../components/Button';


export default function MemoListScreen(props){
    const {navigation} = props;
    const [memos, setMemos] =useState([]);


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
                const userMemos = [];
                snapshot.forEach((doc) => {
                    console.log(doc.id,doc.data());
                    const data = doc.data();

                    userMemos.push({
                        id: doc.id,
                        bodyText: data.bodyText,
                        updatedAt: data.updatedAt.toDate(),
                    })
                });
                setMemos(userMemos);
            },(error) => {
                console.log(error);
                Alert,alert('データの読み込みに失敗しました。');
            });
        }
        return unsubscribe;
    },[]);

//navigation.setOptionsでログアウトボタンを設定しており、オプションの一部として、ログアウトボタンを指定している。
//headerRight以降は元々は、「() => {return <LogOutButton />}」となるが、省略した書き方になっている。
//navigation.setOptionsの部分はuseEffectに入れなくても表示することが出来るがReactから「bodyの中で他のコンポーネントを更新するな」という警告が出るので、useEffectに入れて副作用的処理であることを明確にしている。

//const { currentUser } = firebase.auth(); → ログイン中のユーザー情報の確認
//const ref = db.collection(`users/${currentUser.uid}/memos`) → ログイン中のユーザーのmemosまでのレファレンスをrefに格納。
//ref.onSnapshot以降 → メモのリストの監視。snapshotにはメモのリストに関する情報(配列)が入っている。それをforEachで繰り返し表示する。
//さらにforeachもコールバック関数を設定できるので、一旦console.logでidとデータの中身を出力している。

//userMemosのからの配列にデータを入れていくために、forEachで取り出したデータを、「data」にまず格納し、
//さらにに入れていく配列をuserMemos.pushの部分で1つずつ指定している。
//forEachが終わった後にsetMemosをuserMemosを引数として実行し、stateを更新している。

    if (memos.length === 0) {
        return (
            <View style={emptyStyles.container}>
                <View style={emptyStyles.inner}>
                    <Text style={emptyStyles.title}>最初のメモを作成してみましょう！</Text>
                    <Button 
                    label="新規作成" 
                    onPress={() => {navigation.navigate('MemoCreate');}}
                    style={emptyStyles.button}
                    />
                </View>
            </View>
        );
    }


//memosが0件だった時に上記の表示が出る。

    return (

    <View style={styles.container}>

        <MemoList memos={memos}/>
        <CircleButton name="plus" onPress={()=> {navigation.navigate('MemoCreate');}}/>
    </View>
    );
}

//returnより上の処理で更新されている状態のmemosを取得しているので、それをMemoListに渡している。


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F4F8'
    }
});

const emptyStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inner: {
        justifyContent: 'center',
        alignItems: 'center',   
    },
    title: {
        fontSize: 18,
        marginBottom: 24,
    },
    button:{
        alignSelf: 'center',
    },
    
});