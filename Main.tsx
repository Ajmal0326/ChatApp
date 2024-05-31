import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Users from './android/app/src/Tabs/Users'
import Setting from './android/app/src/Tabs/Setting'


const Main = () => {
   
  const [selectedTab,setselectedTab] = useState(0);

  return (
    <View style={Styles.container}>
      {selectedTab == 0 ? (<Users/>) : (<Setting/>)}
      <View style={Styles.bottomTab}>
        <TouchableOpacity style={Styles.tab}
        onPress={()=>setselectedTab(0)}
        >
           <FontAwesome name="users" size={30} style={Styles.tab} color={selectedTab == 0 ? 'white' : 'gray'} />
        </TouchableOpacity>
        <TouchableOpacity style={Styles.tab}  onPress={()=>setselectedTab(1)}>
           <Ionicons name="settings-sharp" size={30} style={Styles.tab} color={selectedTab == 1 ? 'white' : 'gray'} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Main

const Styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'white',
  },
  bottomTab: {
    position:'absolute',
    bottom:0,
    width:'100%',
    height:70,
    backgroundColor:'purple',
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignContent:'center',
    alignItems:'center',
  },
  tab: {
    justifyContent:'center',
    alignItems:'center',
       
  }
})