import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
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
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => onSend(newMessages)}
        user={{
          _id: 1,
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3e0c4a',
  },
});

export default ChatScreen;
