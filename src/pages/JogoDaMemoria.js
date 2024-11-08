import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image, Modal, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { BlurView } from 'expo-blur'; // Importando BlurView

const generateCards = () => {
  const cards = ['😴', '🤯', '😱', '🤭', '😢', '🫨', '😡', '🥰', '🤩', '😂', '🤢', '😝'];
  const duplicatedCards = [...cards, ...cards];
  return duplicatedCards.sort(() => 0.5 - Math.random());
};

const App = ({ navigation }) => {
  const [cards, setCards] = useState(generateCards());
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [rotation] = useState(new Animated.Value(0));
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (selectedCards.length === 2) {
      const [firstIndex, secondIndex] = selectedCards;
      if (cards[firstIndex] === cards[secondIndex]) {
        setMatchedCards([...matchedCards, firstIndex, secondIndex]);
        setSelectedCards([]);
        if (matchedCards.length + 2 === cards.length) {
          setModalVisible(true);
          setIsPlaying(false);
        }
      } else {
        setTimeout(() => setSelectedCards([]), 1000);
      }
    }
  }, [selectedCards]);

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleCardPress = (index) => {
    if (selectedCards.length < 2 && !selectedCards.includes(index) && !matchedCards.includes(index)) {
      setSelectedCards([...selectedCards, index]);
    }
  };

  const shuffleCards = () => {
    Animated.timing(rotation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      setCards(generateCards());
      setSelectedCards([]);
      setMatchedCards([]);
      rotation.setValue(0);
      setTime(0);
      setIsPlaying(true);
    });
  };

  const renderCard = (item, index) => {
    const isFlipped = selectedCards.includes(index) || matchedCards.includes(index);

    const rotateY = rotation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    return (
      <Animated.View style={{ transform: [{ rotateY }] }} key={index}>
        <TouchableOpacity style={styles.card} onPress={() => handleCardPress(index)}>
          {isFlipped ? (
            <Text style={styles.cardText}>{item}</Text>
          ) : (
            <Image
              source={require('../images/jogodamemoria.png')}
              style={styles.cardImage}
            />
          )}
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <ImageBackground source={require('../images/fundo1.png')} style={styles.background}>
      {/* BlurView para desfocar a imagem de fundo */}
      <BlurView intensity={50} style={StyleSheet.absoluteFill} tint="dark" />

      {/* Conteúdo do jogo */}
      <View style={styles.container}>
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.navigate('Catalogo')}>
          <Icon name="close" size={30} color="#BA52AD" />
        </TouchableOpacity>

        <Text style={styles.title}>Jogo Da Memória</Text>
        <Text style={styles.timer}>Tempo: {time} segundos</Text>
        <View style={styles.board}>
          {cards.map((item, index) => renderCard(item, index))}
        </View>

        <TouchableOpacity onPress={shuffleCards} style={styles.shuffleButton}>
          <Text style={styles.shuffleButtonText}>Embaralhar</Text>
        </TouchableOpacity>

        <Modal visible={modalVisible} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image source={require('../images/medalha.png')} style={styles.medalImage} />
              <Text style={styles.modalText}>Parabéns! Você encontrou todos os pares!</Text>
              <Text style={styles.modalText}>Tempo total: {time} segundos</Text>
              <TouchableOpacity onPress={() => { setModalVisible(false); shuffleCards(); }} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Reiniciar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 1,
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 390,
  },
  title: {
    fontSize: 40,
    marginTop: 40,
    color: "#BA52AD",
    fontFamily: 'Font5',
  },
  timer: {
    fontSize: 18,
    color: 'white',
    marginBottom: 20,
  },
  card: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2.5,
    backgroundColor: '#BA52AD',
    borderRadius: 10,
    marginLeft: 13,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  cardText: {
    fontSize: 36,
    color: 'red',
  },
  shuffleButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#BA52AD',
    borderRadius: 5,
  },
  shuffleButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 40,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  medalImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#BA52AD',
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default App;
