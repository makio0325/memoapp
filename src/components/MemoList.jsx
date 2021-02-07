import React from 'react';
import { StyleSheet, Text, View ,TouchableOpacity,Alert} from 'react-native';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';

export default function MemoList () {
    const navigation = useNavigation();

    return (
        <View>
            <TouchableOpacity 
                style={styles.memoListItem}
                onPress={()=>{navigation.navigate('MemoDetail');}}
                >
                <View>
                    <Text style={styles.memoListZItemTitle}>買い物リスト</Text>
                    <Text style={styles.memoListZItemDate}>2020年1月31日 12:00</Text>
                </View>
                <TouchableOpacity onPress={()=>{Alert.alert('deleted');}}>
                    <Feather name="x" size={32} color="#B0B0B0"/>
                </TouchableOpacity>
            </TouchableOpacity>
        </View>
    );
}

//MemoListはスクリーンではなくコンポーネント(つまり子要素)であるため、Navgaitonをが自動で読み込まれないようになっている。
//なので、useNavigationをインポートして、その実行結果をnavigationに代入することで、スクリーンと同じような記述をすることが出来るようになっている。

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
    
    memoListZItemTitle:{
        fontSize: 16,
        lineHeight: 32
    },
    
    memoListZItemDate:{
        fontSize:12,
        lineHeight:16,
        color:'#848484',
    },

})