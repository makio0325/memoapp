import React, {useState} from 'react';
import {View, StyleSheet, TextInput,KeyboardAvoidingView} from 'react-native';
import firebase from 'firebase';

import CircleButton from '../components/CircleButton';
import KeyboardSafeView from '../components/KeyboardSafeView'

export default function MemoCreateScreen(props) {
  const {navigation} = props;
  const [titleText, setTitleText] = useState();
  const [bodyText, setBodyText] = useState();
  function handlePress() {
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    const ref = db.collection(`users/${currentUser.uid}/memos`);
    ref.add({
      titleText: titleText,
      bodyText: bodyText,
      updatedAt: new Date(),
    })
      .then(() =>{
        navigation.goBack();
      })
      .catch((error) => {
        console.log('Error'), error;
      });
    
  }
  return (
    <KeyboardSafeView style={styles.container} >
      <View style={styles.titleContainer}>
        <TextInput 
            value={titleText} 
            style={styles.inputTitleText}
            onChangeText={ (text)=> { setTitleText(text);}}
            autoFocus
            placeholder="タイトル"
          />
      </View>

      <View style={styles.bodyContainer}>
        <TextInput 
          value={bodyText} 
          multiline 
          style={styles.inputBodyText}
          onChangeText={ (text)=> { setBodyText(text);}}
          autoFocus
          placeholder="本文"
        />
      </View>

      <CircleButton 
        name="check"
        onPress={handlePress}
        />
    </KeyboardSafeView>
  );
}

//KeyboardAvoidingViewで全体を囲むことで、keyboardが開いた時に、自動的にコンポーネントを大きさを調節してくれるようになっている。
//これによってcheckマークがkeyvboardに隠されて押せなくなることを防止している。
//その際に設定するオプションがあり、今回は「behavior='height'」として上になるように調節している。詳細は公式リファレンス参照。

//const db = firebase.firestore();  → firebase.firestoreの実行結果をdbに格納。
//const ref = db.collection('memos'); → refはレファレンス(参照情報オブジェクト)。参照するコレクションがmemosであることを表しており、その情報自体をrefに格納している。
//レファレンスを取得したら、「red.add」と記述しそこに情報を入れていく。(例 bodyText: 'Hello!',)
//加えて、それが成功した時の処理と、失敗した時の処理をそれぞれ記載している。成功時→Created!とidの出力＋前の画面への移動。

//db.collection(`users/${currentUser.uid}/memos`); → この部分はユーザーごとにmemosを作れるようにしている部分。
//currentUserをどうやって特定するのかというと、「const { currentUser } = firebase.auth();」と書いて現在のログインしているユーザーを特定している。
//その上で、currentUser.uid の部分でidを取得している、という流れ。これを行うことによって、uid毎にmemosコレクション自体が分岐する。

//データ保存の流れ 
//onChangeTextで変わった値を受け取り、setBodyTextを実行。するとbodytextが更新されるので、handlePressで更新される値も同じく更新される。
//その状態でデータ保存(add)を行うので任意のデータを追加出来る、という流れ。

const styles = StyleSheet.create({
  container: {
    flex:1,
  },

  titleContainer:{
    paddingVertical: 16,
    backgroundColor: '#4BA441',
  },

  inputTitleText:{
    fontSize: 24,
    paddingHorizontal: 27,
    color: '#FFFFFF',
  },

  bodyContainer:{
    paddingHorizontal: 27,
    paddingVertical: 12,
  },
  inputBodyText: {
    textAlignVertical: 'top',
    fontSize: 16,
    lineHeight: 24,
  },
});

//この画面をシミュレータでレンダリングしている時に、I/Oからtoggle kebordを選ぶと、タイプが出来るようになる。