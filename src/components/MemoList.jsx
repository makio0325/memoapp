import React from 'react';
import { StyleSheet, Text, View ,TouchableOpacity,Alert} from 'react-native';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import { shape, string, instanceOf, arrayOf } from 'prop-types';

export default function MemoList (props) {
    const { memos } = props;
    const navigation = useNavigation();

    return (
        <View>
            {memos.map((memo) => (
                <TouchableOpacity 
                    key={memo.id}
                    style={styles.memoListItem}
                    onPress={()=>{navigation.navigate('MemoDetail');}}
                >
                <View>
                    <Text style={styles.memoListItemTitle}>{memo.bodyText}</Text>
                    <Text style={styles.memoListItemDate}>{String(memo.updatedAt)}</Text>
                </View>
                <TouchableOpacity onPress={()=>{Alert.alert('deleted');}}>
                    <Feather name="x" size={32} color="#B0B0B0"/>
                </TouchableOpacity>
            </TouchableOpacity>
            ))}
            
        </View>
    );
}

//MemoListはスクリーンではなくコンポーネント(つまり子要素)であるため、Navgaitonをが自動で読み込まれないようになっている。
//なので、useNavigationをインポートして、その実行結果をnavigationに代入することで、スクリーンと同じような記述をすることが出来るようになっている。
//memos.map((memo) => の部分は、実際は (memo) => {return ~}という記載だが、returnは省略して書いてある。

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

})