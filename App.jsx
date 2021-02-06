import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import MemoListScreen from './src/screens/MemoListScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import LogInScreen from './src/screens/LogInScreen';
import MemoCreateScreen from './src/screens/MemoCreateScreen';
import MemoEditScreen from './src/screens/MemoEditScreen';
import MemoDetailScreen from './src/screens/MemoDetailScreen';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="LogIn"
        screenOptions={{
          headerStyle: {backgroundColor :'#467FD3'},
          headerTitleStyle:{color: '#ffffff'},
          headerTitle: 'MemoApp',
          headerTintColor: '#ffffff',
          headerBackTitle: 'Back',
        }}
        >

        <Stack.Screen name="MemoList" component={MemoListScreen}/>
        <Stack.Screen name="SignUp" component={SignUpScreen}/>
        <Stack.Screen name="LogIn" component={LogInScreen}/>
        <Stack.Screen name="MemoCreate" component={MemoCreateScreen}/>
        <Stack.Screen name="MemoEdit" component={MemoEditScreen}/>
        <Stack.Screen name="MemoDetail" component={MemoDetailScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//ここでは、StackNavigatorが提供するバーを使っている。
//screenOptionsで文字の色や背景色を設定している。
//この画面で登録しているScreenには全て navigation というプロパティが渡されるようになっている。
//このおかげで各Screenでnavigationをimportする必要がなくなっている、という流れ。