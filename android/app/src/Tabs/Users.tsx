import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';


let id:any=''
const Users = () => {
  const navigation:any=useNavigation();
  const [users,setusers] = useState<any[]>([]);

  useEffect(()=>{
    getUsers();
  },[]);

  const getUsers= async ()=> {
    id = await AsyncStorage.getItem('USERID');
    let tempData:any[]=[];
    const myEmail =await AsyncStorage.getItem("EMAIL");
    console.log("my email is :",myEmail);
    firestore().collection('users').where('Email','!=',myEmail)
    .get().then(
      response => {
        if(response.docs!==null)
        {
          response.docs.map(item => {
            tempData.push(item.data());
          });
        }
        setusers(tempData);
       }
    )
    .catch(
      error => {
        console.log(error);
      }
    )
  }
  return (
    <View style={Styles.mainContainer}>
      <View style={Styles.header}>
           <Text style={Styles.title}>RN Firebase Chat App</Text>
      </View>
      <FlatList
      data={users}
      renderItem={({item,index})=>{
        return (
            <TouchableOpacity style={Styles.usersItemStyle}
            onPress={()=>{
              console.log("my next user is :",item);
              navigation.navigate("Chat",{data: item,id: id});
            }}
            >
            <Image source={require('../Images/avatar.png')} style={Styles.ImageStyle}/>
            <Text style={Styles.username}>{item.Name}</Text>
            </TouchableOpacity>
        )
      }}
      />
    </View>
  )
}

export default Users

const Styles = StyleSheet.create({
  mainContainer: {
    flex:1
  },
  header: {
     height:60,
     width:'100%',
     elevation:2,
     justifyContent:'center',
     alignItems:'center'
  },
  title: {
     color:'purple',
     fontWeight:'600',
     fontSize:20,
  },
  usersItemStyle: {
   width: Dimensions.get('window').width-50,
   alignSelf:'center',
   marginTop:20,
   flexDirection:'row',
   height:60,
   borderWidth:0.5,
   borderRadius:10,
   alignItems:'center',
   paddingLeft:20,
  },
  ImageStyle: {
    width:40,
    height:40,
  },
  username: {
    color:'black',
    fontSize:20,
  }
})