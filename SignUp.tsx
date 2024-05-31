import { View, Text, StyleSheet, StatusBar, Dimensions, TouchableOpacity, ViewStyle, Alert } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';


const usersCollection = firestore().collection('Users');


export default function SignUp({navigation}:any) {

    const [name,setname] = useState('');
    const [Email,setEmail] = useState('');
    const [phoneNumber,setphoneNumber] = useState('');
    const [password,setpassword] = useState('');
    const [confirmPassword,setconfirmPassword] = useState('');
    


    const RegisterUser=()=> {
      
      let isValid = true;
      
      if(name=='' || Email =='' || phoneNumber=='' || password=='' || confirmPassword=='')
        {
          isValid=false;
          Alert.alert("Error : You cannot left any field empty")
        }
      if(password!=confirmPassword)
        {
          isValid=false;
          Alert.alert('Password and Confirm Password must be same.')
        }

      if(isValid)
      {
      const userId= uuid.v4();
      firestore().collection('users').doc(userId).set({
       Name:name,
       Email:Email,
       PhoneNumber:phoneNumber,
       Password:password,
       ConfirmPassword: confirmPassword,
       UserId: userId,
      });
    }
    }

  return (
    <View style={Styles.MainContainer} >
        <StatusBar backgroundColor={'black'}/>
      <Text style={Styles.textStyle}>SignUp</Text>

      <View style={Styles.InputContainerStyle}>
      <TextInput placeholder='Enter Name' placeholderTextColor={'#959595'} style={Styles.InputStyle}
      value={name}
      onChangeText={txt => setname(txt)}
      />
      </View>
      <View style={Styles.InputContainerStyle} >
      <TextInput placeholder='Enter Email' placeholderTextColor={'#959595'} style={Styles.InputStyle}
      value={Email}
      onChangeText={txt => setEmail(txt)}
      />
      </View>
      <View style={Styles.InputContainerStyle}>
      <TextInput placeholder='Enter phone number' placeholderTextColor={'#959595'} style={Styles.InputStyle}
      value={phoneNumber}
      onChangeText={txt => setphoneNumber(txt)}
      />
      </View>
      <View style={Styles.InputContainerStyle}>
      <TextInput placeholder='Enter password' placeholderTextColor={'#959595'} style={Styles.InputStyle}
      value={password}
      onChangeText={txt => setpassword(txt)}
      />
      </View>
      <View style={Styles.InputContainerStyle}>
      <TextInput placeholder='Confirm password' placeholderTextColor={'#959595'} style={Styles.InputStyle}
      value={confirmPassword}
      onChangeText={txt => setconfirmPassword(txt)}
      />
      </View>

      <TouchableOpacity style={{backgroundColor:'#7BCCB5', width:width*0.8, alignSelf:'center', borderRadius:17,marginTop:50,height:height*0.07,justifyContent:'center'}}
      onPress={()=>RegisterUser()}
      > 
        <Text style={{color:'white', alignSelf:'center', fontSize:30,}}>Sign Up</Text>
      </TouchableOpacity>

      <Seperator />
      
      <TouchableOpacity style={{marginTop:height*0.05,alignSelf:'center'}}
      onPress={()=> navigation.navigate('Login')}
      >
        <Text style={{color:'blue', fontSize:20}}>Login</Text>
      </TouchableOpacity>
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
  