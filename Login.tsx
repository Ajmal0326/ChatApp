import { View, Text, StyleSheet, StatusBar, Dimensions, TouchableOpacity, ViewStyle, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import Loader from './android/app/src/Components/Loader';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Login({navigation}:any) {
  const [Email,setEmail] = useState('');
const [password,setpassword] = useState('');
const [visible,setvisible] = useState(false);
    


    const LoginUser=()=> {
      
      firestore().collection('users').where('Email','==',Email).get().then(
        response => {
          
          console.log(JSON.stringify(response.docs[0].data()));
          goToNext(
          response.docs[0].data().Name,
          response.docs[0].data().Email,
          response.docs[0].data().UserId,
        );
        }
      ).catch(
        error => {
          console.log(error);
          Alert.alert('User not found');
        }
      )

    }
   
    const goToNext = async(name: string,email: string,userId: string) => {
        await AsyncStorage.setItem("NAME",name);
        await AsyncStorage.setItem("EMAIL",email);
        await AsyncStorage.setItem("USERID",userId);
        navigation.navigate('Main');
    }
  
  return (
    <View style={Styles.MainContainer} >
        <StatusBar backgroundColor={'black'}/>
      <Text style={Styles.textStyle}>Login</Text>

      <View style={Styles.InputContainerStyle} >
      <TextInput placeholder='Enter Email' placeholderTextColor={'#959595'} style={Styles.InputStyle}
      value={Email}
      onChangeText={txt => setEmail(txt)}
      />
      </View>
      
      <View style={Styles.InputContainerStyle}>
      <TextInput placeholder='Enter password' placeholderTextColor={'#959595'} style={Styles.InputStyle}
      value={password}
      onChangeText={txt => setpassword(txt)}
      />
      </View>

      <TouchableOpacity style={{backgroundColor:'#7BCCB5', width:width*0.8, alignSelf:'center', borderRadius:17,marginTop:50,height:height*0.07,justifyContent:'center'}} 
      onPress={()=>LoginUser()}
      > 
        <Text style={{color:'white', alignSelf:'center', fontSize:30,}}>Login</Text>
      </TouchableOpacity>

      <Seperator />
      
      <TouchableOpacity style={{marginTop:height*0.05,alignSelf:'center'}}
      onPress={()=> navigation.navigate('SignUp')}
      >
        <Text style={{color:'blue', fontSize:20}}>Or Sign Up</Text>
      </TouchableOpacity>
      <Loader visible={visible}/>
    </View>
  )
}

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

const  Styles = StyleSheet.create({
    MainContainer:{
  flex:1
    },
    textStyle: {
    color:'black',
    alignSelf:'center',
    fontSize:width*0.08,
    fontWeight:'600',
    marginTop:height*0.1,
    marginBottom:100
    },
    InputContainerStyle: {
        backgroundColor: '#F6D7D7',
        flexDirection: 'column',
        marginHorizontal: width * 0.1,
        borderRadius: 30,
        alignItems: 'center',
        marginVertical:height*0.02,

    },
    InputStyle: {
        marginLeft: width * 0.03,
        fontSize: width * 0.05,
    },


})

const seperatorStyles: ViewStyle = {
    height: 0.8,
    width: '80%',
    backgroundColor: '#5F5F57',
    marginTop: height * 0.07,
    alignSelf:'center',
  };
const Seperator = () => <View style={seperatorStyles} />;
  