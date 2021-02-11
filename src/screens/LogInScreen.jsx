import React,{useState, useEffect}from 'react';
import {Text, TextInput, View ,StyleSheet,TouchableOpacity,Alert} from 'react-native';
import firebase from 'firebase';

import Button from '../components/Button'
import Loading from '../components/Loading';

export default function LogInScreen (props){
    const {navigation} = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setLoading] = useState(true);

    useEffect(()=>{
        const unsubscribe = firebase.auth().onAuthStateChanged((user)=>{
            if (user) {
                navigation.reset({
                    index: 0,
                    routes: [{name: 'MemoList'}],
                });
            } else {
                setLoading(false);
            }
        });
        return unsubscribe;
    },[]);

//このuseEffectでは、「onAuthStateChanged」でユーザーの状態を監視しており、
//もしそのユーザーがログインしていれば、画面移動履歴をリセットした上で、MemoListにすぐに接続するようになっている。
//最後に[]を入れている理由は、「それがないとコールバック関数がpropsが更新される度に(正確にはレンダリングの度に)実行されてしまうから」である。
//これを入れておけば画面が表示された一回目だけにコールバック関数が実行される。[]の中には任意の監視しておきたい値を入れておくことも出来るが、今回は特に無いので空にしてある。

//const unsubscribeとしているのは、「useEffectは『return 関数名』と記述することで、任意のタイミングでその関数の実行をキャンセル出来る」ようになっており、それを書きやすくするため。
//今回はユーザーのログイン状態監視処理をキャンセルしている。(MemoListに画面が移った後はログイン情報を監視する必要が無いため)

    function handlePress(){
        setLoading(true);
        firebase.auth().signInWithEmailAndPassword(email,password)
            .then((userCredential) => {
                const {user} = userCredential;
                console.log(user.uid);
                navigation.reset({
                    index: 0,
                    routes: [{name: 'MemoList'}],
                });
            })
            .catch((error) => {
                Alert.alert(error.code);
            })
            .then(() => {
                setLoading(false);
            })        
    }

    //今回はsetLoadingの初期値はtrue(ローディングが表示される)状態になっている。
    //handlePressが実行された時(この場合はsubmitボタンが押された時)もLoadingが発生し、それが成功しても失敗してもLoadingをfolseにするように表示している。

    return (
        <View style={styles.container}>
            <Loading isLoading={isLoading} />
            <View style={styles.inner}>

                <Text style={styles.title}>Log In</Text>
                <TextInput 
                    style={styles.input} 
                    value={email} 
                    onChangeText={(text)=>{setEmail(text);}}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    placeholder="Email Address"
                    textContentType="emailAddress"
                />
                <TextInput 
                    style={styles.input} 
                    value={password}
                    onChangeText={(text)=>{setPassword(text);}}
                    autoCapitalize="none"
                    secureTextEntry
                    placeholder="Password"
                    textContentType="password"
                />

                <Button 
                    label="Submit"
                    onPress={handlePress}
                />

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Not registered?</Text>

                    <TouchableOpacity 
                        onPress={()=>{
                            navigation.reset({
                                index: 0,
                                routes: [{name: 'SignUp'}],
                        });
                    }}>
                        <Text style={styles.footerLink} >Sign Up here!</Text>
                    </TouchableOpacity>

                </View>

            </View>

        </View>
    );
}

//submit部分で用いているresetメソッドは、現在のナビゲーションの履歴がどういう状態であれ、
//route以降のオブジェクトで上書きをする、というもの。これを行うことによって、「MemoListの前のページがLoginであったという履歴」が上書きされる。
//LogIn画面の戻れなくなれば、Backボタンは表示されなくなる。

//autoCapitalize="none"の部分で、最初の文字が大文字にならないように設定している。

const styles = StyleSheet.create({
    container :{
        flex:1,
        backgroundColor: '#F0F4F8',
    },

    inner:{ 
        paddingVertical:27,
        paddingHorizontal:24,
    },

    title:{
        fontSize: 24,
        lineHeight: 32,
        fontWeight: 'bold',
        marginBottom:24,
    },

    input:{
        fontSize: 16,
        height: 48,
        borderColor: '#DDDDDD',
        borderWidth: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 8,
        marginBottom: 16,
    },



    footerText: {
        fontSize: 14,
        lineHeight: 24,
        marginRight: 8,
    },

    footerLink: {
        fontSize: 14,
        lineHeight: 24,
        color: '#467FD3',
    },

    footer:{
        flexDirection: 'row',
    },

});

