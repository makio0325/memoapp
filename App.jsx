import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator,CardStyleInterpolators} from '@react-navigation/stack';

//CardStyleInterpolatorsは大文字始まり・複数形なので注意。
//異なるOSでのアニメーション統一を行うためのもの。
//↓のscreenoptionで「CardStyleInterpolators.forHorizontalIOS」と書くことで、クリック時の動きをIOSに合わせている。
//特定のスクリーンだけアニメーションを変えたい場合は、スクリーン自体にoptionsにcardStyleInterpolatorを設定する。

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
        initialRouteName="SignUp"
        screenOptions={{
          headerStyle: {backgroundColor :'#467FD3'},
          headerTitleStyle:{color: '#ffffff'},
          headerTitle: 'MemoApp',
          headerTintColor: '#ffffff',
          headerBackTitle: 'Back',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
        >

        <Stack.Screen 
          name="SignUp" 
          component={SignUpScreen}
          options = {{
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
            }}/>

        <Stack.Screen 
          name="LogIn" 
          component={LogInScreen}
          options = {{
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
            }}/>

        <Stack.Screen name="MemoList" component={MemoListScreen}/>
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

//gestureEnabled: trueでスワイプで画面移動を有効にし、
//gestureDirection: 'horizontal',でその方向を水平方向に指定している。