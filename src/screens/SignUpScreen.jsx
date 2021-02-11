import React, {useState} from 'react';
import {Text, TextInput, View ,StyleSheet,TouchableOpacity,Alert} from 'react-native';
import firebase from 'firebase';

import Button from '../components/Button'
import {translateErrors} from '../utils';

export default function SignUpScreen (props){
    const {navigation} = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


function handelePress(){
        firebase.auth().createUserWithEmailAndPassword(email,password)
            .then((userCredentioal)=>{
                const {user} = userCredentioal;
                console.log(user.uid);

                navigation.reset({
                    index: 0,
                    routes: [{name: 'MemoList'}],
                    });
            })
            .catch((error)=>{
                const errorMsg = translateErrors(error.code);
                console.log(error.code, error.message);
                Alert.alert(errorMsg.title , errorMsg.description); 
            });
}

//この関数はもともとButton内に記述していたが長くなるので切り出した部分。
//firebase.auth().createUserWithEmailAndPassword というメソッドを引数を(email,password)として実行している
//それが成功したらuserCredentioal を受け取る事が出来るので、それをuserに格納している。加えてnavigationも発火する。
//成功しなかった場合はコンソールにエラーメッセージを出力するようになっている。こちらにはnavigationが発火しないので、画面も動かない。


    return (
        <View style={styles.container}>
            <View style={styles.inner}>

                <Text style={styles.title}>Sign Up</Text>
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
                    onPress={handelePress}
                    />

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Already resterd?</Text>

                    <TouchableOpacity 
                        onPress={()=>{
                            navigation.reset({
                                index: 0,
                                routes: [{name: 'LogIn'}],
                        });
                    }}>
                        <Text style={styles.footerLink} >Log In!</Text>
                    </TouchableOpacity>

                </View>

            </View>

        </View>
    );
}

//autoCapitalize="none" →大文字にしない設定
//keyboardType="email-address" →キーボードのタイプ設定
//placeholder="Email Address" →薄く表示する文字列
//secureTextEntry →伏せ字設定(=以降特に何も入れなくてもtureになる。)
//textContentType="password" →iosでキーチェーンから持ってくる設定。


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