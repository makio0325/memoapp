import React, {useEffect,useState} from 'react';
import {View , StyleSheet, Alert , Text} from 'react-native';
import firebase from 'firebase';

import MemoList from '../components/MemoList';
import CircleButton from '../components/CircleButton';
import Button from '../components/Button';
import Loading from '../components/Loading';
import HeaderRightButton from '../components/HeaderRightButton';
import Banner from '../components/Banner';



export default function MemoListScreen(props){
  const {navigation} = props;
  const [memos, setMemos] =useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const cleanupFuncs = {
      auth: () => {},
      memos: () => {},
    };
    cleanupFuncs.auth = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const db = firebase.firestore();
        const ref = db.collection(`users/${user.uid}/memos`).orderBy('updatedAt', 'desc');
        cleanupFuncs.memos = ref.onSnapshot((snapshot) => {
          const userMemos = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            userMemos.push({
              id: doc.id,
              titleText: data.titleText,
              bodyText: data.bodyText,
              updatedAt: data.updatedAt.toDate(),
            });
          });
          setMemos(userMemos);
          setLoading(false);
        }, () => {
          setLoading(false);
        });
        // ユーザーが存在したら会員登録ボタンかログアウトボタンを表示
        // 会員登録ボタン：匿名ユーザー
        // ログアウトボタン：メアド登録済ユーザー
        navigation.setOptions({
          headerRight: () => (
            <HeaderRightButton currentUser={user} cleanupFuncs={cleanupFuncs} />
          ),
        });
      } else {
        // 匿名ログイン（firebaseの Authentication > Sign-in method から有効にする必要があります）
        firebase.auth().signInAnonymously()
          .catch(() => {
            Alert.alert('エラー', 'アプリを再起動してください');
          })
          .then(() => { setLoading(false); });
      }
    });
    return () => {
      cleanupFuncs.auth();
      cleanupFuncs.memos();
    };
  }, []);

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
        <Loading isLoading={isLoading} />
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
//メモが0件の時、通常のリスト表示の際にもローディングアイコンが表示されるようになっている。
//

  return (

  <View style={styles.container}>
    <Loading isLoading={isLoading} />
    <MemoList memos={memos}/>
    <CircleButton name="plus" onPress={()=> {navigation.navigate('MemoCreate');}}/>
  </View>
  );
}

//returnより上の処理で更新されている状態のmemosを取得しているので、それをMemoListに渡している。
//useEffectの部分のifm文の始めにLoadingがtureになり、処理の最後でfalseになるようにsetLoadingを配置している。


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

  banner:{

  }
});