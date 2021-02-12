import React from 'react';
import { StyleSheet, Text, View ,TouchableOpacity,Alert,FlatList} from 'react-native';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import { shape, string, instanceOf, arrayOf } from 'prop-types';
import {dateToString} from '../utils';
import firebase from 'firebase';

export default function MemoList (props) {
    const { memos } = props;
    const navigation = useNavigation();

    function deleteMemo (id) {
        const { currentUser } = firebase.auth(); //ログイン中ユーザーの確認
        if ( currentUser ) {
            const db = firebase.firestore(); //dbを定義
            const ref = db.collection(`users/${currentUser.uid}/memos`).doc(id); //リファレンスを作成(ドキュメントidを指定)
            Alert.alert('メモを削除します。','よろしいですか？',[ 
                {
                    text: 'キャンセル',   //Andoroid側ではネガティブな方を先に配置するというルールがあるので、先にキャンセルを記載。
                    onPress: () => {},
                },
                {
                    text: '削除する',
                    style: 'destructive',   //破壊的な処理を実行する時のスタイル。文字が赤くなる。
                    onPress: () => {
                        ref.delete().catch(() => { Alert.alert('削除に失敗しました');})
                    },
                }
            ]);
        }
    }

    function renderItem ({item}) {
        return(
            <TouchableOpacity 
                
                style={styles.memoListItem}
                onPress={() => {navigation.navigate('MemoDetail',{id: item.id});}}
                >
                <View style={styles.memoInner}>
                    <Text style={styles.memoListItemTitle} numberOfLines={1}>{item.bodyText}</Text>
                    <Text style={styles.memoListItemDate}>{dateToString(item.updatedAt)}</Text>
                </View>
                <TouchableOpacity onPress={ () => {deleteMemo(item.id);}}>
                    <Feather name="x" size={32} color="#B0B0B0"/>
                </TouchableOpacity>
            </TouchableOpacity>
            
        );
    }

//テキストのタイトル部分は、何もプロパティを設定しないと、入力した文字全てが表示されてしまうが、numberOfLines={1}と書いて表示される行数をしているすることでそれを回避することが出来る。
//MemoDetailに情報を渡すために、ナビゲーション時に{id: item.id}を渡している。

    return (
        <View>
            <FlatList 
                data={memos}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}

//MemoListはスクリーンではなくコンポーネント(つまり子要素)であるため、Navgaitonをが自動で読み込まれないようになっている。
//なので、useNavigationをインポートして、その実行結果をnavigationに代入することで、スクリーンと同じような記述をすることが出来るようになっている。
//memos.map((memo) => の部分は、実際は (memo) => {return ~}という記載だが、returnは省略して書いてある。

//元々はreturn後にmapメソッドを使って繰り返し表示を行っていたが、FlatListを使ったレンダリングを現在は実装している。
//FlatList内では、元となるデータはdata、レンダリング対象自体はrenderItemで定義している。keyExtractorでitemを引数として、return item.id;としている(?)
//keyExtractor={(item) => {return item.id;}}を省略して、keyExtractor={(item) => item.id}と書いている。
//renderItemの中に実際に表示したい構造体を返すという流れ。FlatListを使えば勝手に繰り返し表示・スクロール機能が追加されている＋メモリが節約出来るので便利。

MemoList.propTypes = {
    memos: arrayOf(shape({
        id: string,
        bodyText: string,
        updatedAt: instanceOf(Date),
    })).isRequired
};

//memosは配列なので、1つのプロップタイプにに対応していないため、配列として設定するarryOfを先に設定する必要がある。

const styles = StyleSheet.create({
    memoListItem:{
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 19,
        alignItems: 'center',
        borderBottomWidth:1,
        borderColor: 'rgba(0,0,0,0.15)'
    },
    
    memoListItemTitle:{
        fontSize: 16,
        lineHeight: 32
    },
    
    memoListItemDate:{
        fontSize:12,
        lineHeight:16,
        color:'#848484',
    },

    memoInner: {
        flex:1,
    }

})