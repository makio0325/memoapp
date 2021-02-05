import React from 'react';
import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native';
import {Feather} from '@expo/vector-icons';

export default function MemoList () {
    return (
        <View>
            <View style={styles.memoListItem}>
                <View>
                    <Text style={styles.memoListZItemTitle}>買い物リスト</Text>
                    <Text style={styles.memoListZItemDate}>2020年1月31日 12:00</Text>
                </View>
                <TouchableOpacity>
                    <Feather name="x" size={16} color="#B0B0B0"/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

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