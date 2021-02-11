import React from 'react';
import {Text, StyleSheet,TouchableOpacity} from 'react-native';
import {func, shape, string} from 'prop-types';

export default function Button (props) {
    const {label,onPress,style} = props;

    return (
        <TouchableOpacity style={[styles.buttonContainer,style]}>
            <Text style={styles.buttonLabel} onPress={onPress}>{label}</Text>
        </TouchableOpacity>
    );
} 

//ここではpropsでスタイルも変更できるようになっている。
//props内にstyleを追加し、実際に使う場合は配列で、style={[styles.buttonContainer,style]} と書く。
//配列内の1つ目の要素が初期値、2つ目が上書きするデータが入っている。


Button.prototype = {
    label:string.isRequired,
    onPress: func,
    style: shape(),
};

Button.defaultProps = {
    onPress: null,
    style: null,
}

const styles = StyleSheet.create({

    buttonContainer: {
        backgroundColor: '#467FD3',
        borderRadius: 4,
        alignSelf: 'flex-start',
        marginBottom: 24,
    },

    buttonLabel: {
        fontSize: 16,
        lineHeight: 32,
        paddingVertical: 8,
        paddingHorizontal: 32,
        color: '#FFFFFF',
    },

})