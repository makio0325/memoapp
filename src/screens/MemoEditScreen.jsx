import React, {useState} from 'react';
import {View, StyleSheet, TextInput,KeyboardAvoidingView, Alert} from 'react-native';
import { shape, string } from 'prop-types';
import firebase from 'firebase';
import translateErrors from '../utils';

import CircleButton from '../components/CircleButton';
import KeyboardSafeView from '../components/KeyboardSafeView'

export default function MemoEditScreen(props) {
    const {navigation ,route} = props;
    const { id, bodyText } = route.params;
    const [body, setBody] = useState(bodyText);

    function handlePress () {
        const {currentUser} = firebase.auth();
        if (currentUser) {
            const db = firebase.firestore();
            const ref = db.collection(`users/${currentUser.uid}/memos`).doc(id);
            ref.set({
                bodyText: body,
                updatedAt: new Date(),
            },{ merge: true })
            .then (() => {
                navigation.goBack();
            })
            .catch(() => {
                const errorMsg = translateErrors(error.code);
                Alert.alert(errorMsg.title, errorMsg.description);
        });
    }
    }

    return (
        <KeyboardSafeView style={styles.container} behavior='height'>

            <View style={styles.inputContainer}>
                <TextInput 
                    value={body} 
                    multiline 
                    style={styles.input}
                    onChangeText={(text) => {setBody(text);}}
                />
            </View>
            <CircleButton name="check" onPress={handlePress}/>
        </KeyboardSafeView>
    );
}

//KeyboardAvoidingViewで全体を囲むことで、keyboardが開いた時に、自動的にコンポーネントを大きさを調節してくれるようになっている。
//これによってcheckマークがkeyvboardに隠されて押せなくなることを防止している。
//その際に設定するオプションがあり、今回は「behavior='height'」として上になるように調節している。詳細は公式リファレンス参照。

//KeyboardAvoidingViewは作成時点(20210207時点)でバグが出るので、KeyboardSafeViewというコンポーネントを新たに作成して対応している。

//MemoDetailScreenから渡ってきたidとbodytextを抜き出すには、routeを読み込む→paramsを読み込む→idとbodytextを抜き出す、というステップを踏む必要がある。
//const {navigation ,route} = props;
//const { id, bodyText } = route.params;
//の部分。

//const { id, bodyText } = route.params;  → bodyTextを取得。
//const [body, setBody] = useState(bodyText); → 取得したbodyTextを一時的に初期値としてbodyに代入。
//更に、TextIput内のonChangeTextが動いた段階でsetBodyを使って更新を行う。
//checkボタンが押されたタイミングで現在のbodyの状態を元に更新を行う。
//ボタンが押されるとhandlePressが実行されるが、そこでは、レファレンスを用いて「set」メソッドを使用している。
//setメソッドは監視・追加とは違い、データを更新するためのもの(渡したデータでデータを上書きするので)。
//データの中に更新したくないもの (例えば作成日など) があった場合は、{ merge: true } と記入すれば、全てを上書きしなくて済む。
//また、今回は「bodyText」ではなく「body (更新後のデータ)」を使っていることに注意。
//setの際、例えばupdatedAtをなくした状態で更新を書けると、セットされるべきデータと一致しなくなるのでエラーが起きるか、対象データが表示されなくなる。

MemoEditScreen.prototype = {
    route: shape({
        params: shape({ id: string, bodyText: string}),
    }).isRequired,
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    inputContainer: {
        flex:1,
    },
    input: {
        flex:1,
        textAlignVertical: 'top',
        fontSize: 16,
        lineHeight: 24,
        paddingTop: 32,
        paddingBottom: 32,
        paddingHorizontal: 27.
    },
});

//この画面をシミュレータでレンダリングしている時に、I/Oからtoggle kebordを選ぶと、タイプが出来るようになる。
