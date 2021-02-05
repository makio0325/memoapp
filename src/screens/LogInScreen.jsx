import React from 'react';
import {Text, TextInput, View ,StyleSheet,TouchableOpacity} from 'react-native';

import AppBar from '../components/AppBar';
import Button from '../components/Button'

export default function LogInScreen (){
    return (
        <View style={styles.container}>
            <AppBar/>
            <View style={styles.inner}>

                <Text style={styles.title}>Log In</Text>
                <TextInput style={styles.input} value="Mail Address"/>
                <TextInput style={styles.input} value="Password"/>

                <Button label="Submit"/>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Not registered?</Text>

                    <TouchableOpacity>
                        <Text style={styles.footerLink}>Sign Up here!</Text>
                    </TouchableOpacity>

                </View>

            </View>

        </View>
    );
}

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

