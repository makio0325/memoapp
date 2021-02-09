import React, {useEffect , useState}from 'react';
import { shape, string} from 'prop-types';
import {View, ScrollView,Text, StyleSheet} from 'react-native';
import CircleButton from '../components/CircleButton';
import firebase from 'firebase';

export default function MemoDetailScreen (props) {
    const {navigation, route} = props;
    const {id} = route.params;
    const [memo, setMemo] = useState(null);

    //routeは前の画面(MemoList)からidを受け取るためのもの。
    //routeの中にはparamsが入っており、更にその中にidが入っている。


    useEffect (() => {
        const {currentUser} = firebase.auth();
        let unsubscribe =() => {};
        if (currentUser) {
            const db = firebase.firestore();
            const ref = db.collection(`users/${currentUser.uid}/memos`).doc(id);
            unsubscribe = ref.onSnapshot((doc) => {
                console.log(doc.id, doc.data());
                const data = doc.data();
                setMemo({
                    id: doc.id,
                    bodyText: data.bodyText,
                    updatedAt: data.updatedAt.toDate(),
                });
            });
        }
        return unsubscribe;
    },[]);

    return (
        <View style={styles.container}>

            <View style={styles.memoHeader}>
                <Text style={styles.memoTitle} numberOfLines={1}>{memo && memo.bodyText}</Text>
                <Text style={styles.memoDate}>{memo && String(memo.updatedAt)}</Text>
            </View>
            <ScrollView style={styles.memoBody}>
                <Text style={styles.memoText}>
                    {memo && memo.bodyText}
                </Text>
            </ScrollView>
            <CircleButton 
                style={{top :60, buttom:'auto'}} 
                name="edit-2"
                onPress={()=> {navigation.navigate('MemoEdit');}}
                />
        </View>
    );
}

//本文の部分だけ普通のViewではなく、ScrollViewを使っている。
//CircleButtonの部分でnameの文字列をCircleButtonコンポーネントに渡している。
//CircleButtonコンポーネントはexpoのフォントアイコンを読み込んでいるので、そのnameに対応する文字列をpropsで渡すことで、アイコンを変更できる。

//画面移動の際は、propsでnavigationを受け取り、onPressをも用いてルーティングのような形で画面を移動させている。
//具体的には、「navigation.navigate('移動先のscreen名')」と記述する。

//{memo && memo.bodyText}の部分はmemoの部分がfalseやnullではなかった場合にmemo.bodeTextが実行されるという処理。
//String(memo.upDatedAt)は強制的に文字列として日付を記載する処理。


MemoDetailScreen.prototype = {
    route: shape({
        params: shape({ id: string}),
    }).isRequired,
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        borderColor:'#ffffff',

    },

    memoHeader: {
        backgroundColor: '#467FD3',
        height: 96,
        justifyContent: 'center',
        paddingVertical: 24,
        paddingHorizontal: 19,
    },

    memoTitle: {
        color: '#ffffff',
        fontSize: 20,
        lineHeight: 32,
        fontWeight: 'bold',

    },

    memoDate: {
        color: '#ffffff',
        fontSize: 12,
        lineHeight: 16,
    },

    memoBody:{
        paddingVertical: 32,
        paddingHorizontal:27,
    },

    memoText:{
        fontSize: 16,
        lineHeight: 24,
    },

})