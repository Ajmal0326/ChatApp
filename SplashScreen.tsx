import { View, Text, StyleSheet, Dimensions, StatusBar } from 'react-native'
import React, { useEffect } from 'react'

import SystemNavigationBar from 'react-native-system-navigation-bar';

SystemNavigationBar.navigationHide();

import SignUp from './SignUp';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function SplashScreen({navigation}:any) {
    useEffect(()=>{
     setTimeout(()=>{
     checkLogin();
     },2000);  
    },[]);

    const checkLogin=async()=>{
      const email=await AsyncStorage.getItem("EMAIL");
      if(email!=null)
        {
          navigation.navigate('Main')
        }
        else {
          navigation.navigate('Login')
        }
    }

  return (
    <View style={Styles.BackgroundStyle}>
        <StatusBar backgroundColor={'#F65364'}/>
      <Text style={Styles.textStyle}>Firebase Chat App</Text>
    </View>
  )
}

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

const Styles = StyleSheet.create({
  
    BackgroundStyle: {
     flex:1,
     backgroundColor:'#F65364',
     justifyContent:'center',
    },
    textStyle: {
        alignSelf:'center',
        fontSize:width*0.08,
        width:width*0.6,
        textAlign:'center',
        color:'white',
    }
})