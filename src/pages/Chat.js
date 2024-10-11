import React, { useState, useEffect } from 'react';
import { ImageBackground, SafeAreaView, StyleSheet, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';  

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const initialMessages = [
      {
        _id: 1,
        text: 'Bem-vindo ao chat!',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Sistema',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ];
    setMessages(initialMessages);
  }, []);

  const onSend = (newMessages = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground 
        source={require('../images/galaxy.jpg')} 
        style={styles.image} 
        resizeMode="cover"
      >
        <View style={styles.view1}>
          <GiftedChat
            messages={messages}
            onSend={(newMessages) => onSend(newMessages)}
            user={{
              _id: 1,
            }}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  view1: {
    flex: 1,
  }
});

export default ChatScreen;
