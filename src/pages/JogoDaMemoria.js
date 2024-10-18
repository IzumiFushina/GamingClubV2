import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ImageBackground, Image} from 'react-native';

const generateCards = () => {
  const cards = ['🍎', '🍌', '🍇', '🍓', '🍉', '🍒', '🍑', '🍍', '🥝', '🥭', '🥥', '🍊', '🍐', '🍋'];
  const duplicatedCards = [...cards, ...cards];
  return duplicatedCards.sort(() => 0.5 - Math.random());
};

const App = () => {
  const [cards, setCards] = useState(generateCards());
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  useEffect(() => {
    if (selectedCards.length === 2) {
      const [firstIndex, secondIndex] = selectedCards;
      if (cards[firstIndex] === cards[secondIndex]) {
        setMatchedCards([...matchedCards, firstIndex, secondIndex]);
        setSelectedCards([]);
        if (matchedCards.length + 2 === cards.length) {
          Alert.alert('Parabéns!', 'Você encontrou todos os pares!');
        }
      } else {
        setTimeout(() => setSelectedCards([]), 1000);
      }
    }
  }, [selectedCards]);

  const handleCardPress = (index) => {
    if (selectedCards.length < 2 && !selectedCards.includes(index) && !matchedCards.includes(index)) {
      setSelectedCards([...selectedCards, index]);
    }
  };

  const resetGame = () => {
    setCards(generateCards());
    setSelectedCards([]);
    setMatchedCards([]);
  };

  const renderCard = (item, index) => {
    const isFlipped = selectedCards.includes(index) || matchedCards.includes(index);
    return (
      <TouchableOpacity
        key={index}
        style={styles.card}
        onPress={() => handleCardPress(index)}
      >
        {isFlipped ? (
          <Text style={styles.cardText}>{item}</Text>
        ) : (
          <Image
            source={require('../images/foto13.png')} // Caminho local da imagem
            style={styles.cardImage}
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground
      source={require('../images/BackgroundQuebraCabeça.png')} // Imagem de fundo
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.board}>
          {cards.map((item, index) => renderCard(item, index))}
        </View>
        <TouchableOpacity onPress={resetGame} style={styles.resetButton}>
          <Text style={styles.resetButtonText}>Reiniciar Jogo</Text>
        </TouchableOpacity>
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
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 390,
  },
  card: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2.5,
    backgroundColor: '#f6db6e',
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
    color: 'red', // Corrigi o valor de cor de 'red' para 'red' (sem aspas simples)
  },
  resetButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f8cf54',
    borderRadius: 5,
  },
  resetButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default App;
