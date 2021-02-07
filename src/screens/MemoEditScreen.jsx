import React from 'react';
import {View, StyleSheet, TextInput,KeyboardAvoidingView} from 'react-native';


import CircleButton from '../components/CircleButton';
import KeyboardSafeView from '../components/KeyboardSafeView'

export default function MemoEditScreen(props) {
    const {navigation} = props;

    return (
        <KeyboardSafeView style={styles.container} behavior='height'>

            <View style={styles.inputContainer}>
                <TextInput value="買い物リスト" multiline style={styles.input}/>
            </View>
            <CircleButton name="check" onPress={()=> {navigation.goBack();}}/>
        </KeyboardSafeView>
    );
}

//KeyboardAvoidingViewで全体を囲むことで、keyboardが開いた時に、自動的にコンポーネントを大きさを調節してくれるようになっている。
//これによってcheckマークがkeyvboardに隠されて押せなくなることを防止している。
//その際に設定するオプションがあり、今回は「behavior='height'」として上になるように調節している。詳細は公式リファレンス参照。

//KeyboardAvoidingViewは作成時点(20210207時点)でバグが出るので、KeyboardSafeViewというコンポーネントを新たに作成して対応している。

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    inputContainer: {
        paddingHorizontal: 27,
        paddingVertical: 32,
        flex:1,
    },
    input: {
        flex:1,
        textAlignVertical: 'top',
        fontSize: 16,
        lineHeight: 24,
    },
});

//この画面をシミュレータでレンダリングしている時に、I/Oからtoggle kebordを選ぶと、タイプが出来るようになる。
