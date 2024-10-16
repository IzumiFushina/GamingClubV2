import React, { useState, useEffect, useCallback } from 'react';
import { ImageBackground, SafeAreaView, StyleSheet, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { collection, addDoc, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebaseConfig'; // Ajuste o caminho conforme necessário

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Consulta para buscar as últimas 50 mensagens do Firestore
    const messagesQuery = query(
      collection(db, 'messages'),
      orderBy('createdAt', 'desc'),
      limit(50)
    );

    // Atualiza as mensagens em tempo real
    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const loadedMessages = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          _id: doc.id,
          text: data.text,
          createdAt: data.createdAt.toDate(),
          user: data.user,
        };
      });

      // Atualiza as mensagens no estado
      setMessages(loadedMessages);
    });

    return () => unsubscribe(); // Limpa a assinatura ao desmontar o componente
  }, []);

  const onSend = useCallback((newMessages = []) => {
    // Envia e salva as mensagens no Firestore
    newMessages.forEach(async (message) => {
      const { _id, text, user } = message;

      // Adiciona a nova mensagem à coleção 'messages' no Firestore
      await addDoc(collection(db, 'messages'), {
        _id,
        text,
        createdAt: firebase.firestore.Timestamp.now(), // Firebase Timestamp
        user,
      });
      
    });

    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  }, []);

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
              _id: 1, // ID do usuário logado
              name: 'Usuário', // Nome do usuário
              avatar: 'https://placeimg.com/140/140/any', // Avatar do usuário
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
  },
});

export default ChatScreen;
