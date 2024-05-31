import { View, Text } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { useRoute ,RouteProp} from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore';


const Chat = () => {
  
  const [messageList, setMessageList] = useState<any[]>([])
  const route:RouteProp<{params: {id: string,data:string}}, 'params'>=useRoute();
  let myid=route.params?.id;
  useEffect(():any => {
    const subscriber = firestore().collection("chats").doc(route.params.id + route.params.data.UserId).collection("messages").
    orderBy("createdAt","desc");
    subscriber.onSnapshot(querysnapshot => {
      const allmessages=querysnapshot.docs.map(item=>{
        return {...item.data,createdAt: Date.parse(new Date())};
      });
      setMessageList(allmessages);
    });
    return () => subscriber;
  }, [])

  const onSend = useCallback((messages:any = []) => {
    const msg= messages[0];
    const myMsg:any={
      ...msg,sendby:route.params.id,
      sendto:route.params.data.UserId,
      createdAt:Date.parse(msg.createdAt),
    }
    setMessageList(previousMessages =>
      GiftedChat.append(previousMessages, myMsg),
    );
     firestore().collection("chats").doc(''+route.params.id + route.params.data.UserId)
     .collection('messages').add(myMsg);
     firestore().collection("chats").doc(''+ route.params.data.UserId +route.params.id)
     .collection('messages').add(myMsg);

  }, [])
  return (
    <View style={{flex:1}}>
      <GiftedChat
      messages={messageList}
      onSend={messages => onSend(messages)}
      user={{
        _id: myid,
      }}
    />
    </View>
  )
}

export default Chat
