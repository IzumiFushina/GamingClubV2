import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ImageBackground, Modal, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Importando ícones

const App = () => {
  const [board, setBoard] = useState([]);
  const [emptyIndex, setEmptyIndex] = useState(15);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    initializeBoard();
  }, []);

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const initializeBoard = () => {
    const newBoard = Array.from({ length: 16 }, (_, i) => (i < 15 ? i + 1 : ''));
    setBoard(newBoard);
    setEmptyIndex(15);
    setMoves(0);
    setTime(0);
    setIsPlaying(true);
    setGameWon(false);
  };

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const randomizeBoard = () => {
    const newBoard = shuffle(Array.from({ length: 16 }, (_, i) => (i < 15 ? i + 1 : '')));
    setBoard(newBoard);
    setEmptyIndex(newBoard.indexOf(''));
    setMoves(0);
    setTime(0);
    setIsPlaying(true);
  };

  const movePiece = (index) => {
    const adjacentIndexes = [
      emptyIndex - 1,
      emptyIndex + 1,
      emptyIndex - 4,
      emptyIndex + 4,
    ];

    if (adjacentIndexes.includes(index)) {
      const newBoard = [...board];
      [newBoard[emptyIndex], newBoard[index]] = [newBoard[index], newBoard[emptyIndex]];
      setBoard(newBoard);
      setEmptyIndex(index);
      setMoves(moves + 1);
      checkWin(newBoard);
    }
  };

  const checkWin = (newBoard) => {
    if (newBoard.every((value, index) => value === (index < 15 ? index + 1 : ''))) {
      setIsPlaying(false);
      setGameWon(true);
    }
  };

  return (
    <ImageBackground
      source={require('../images/BackgroundQuebraCabeça.png')}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Quebra-Cabeça de 15</Text>
        <Text style={styles.stats}>Movimentos: {moves}</Text>
        <Text style={styles.stats}>Tempo: {time} segundos</Text>
        <View style={styles.board}>
          {board.map((value, index) => (
            
            <TouchableOpacity
              key={index}
              style={[styles.piece, value === '' && styles.empty]}
              onPress={() => movePiece(index)}
            >
              {value ? <Text style={styles.pieceText}>{value}</Text> : null}
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.shuffleButton} onPress={randomizeBoard}>
          <Text style={styles.buttonText}>Embaralhar</Text>
        </TouchableOpacity>

        <Modal transparent={true} visible={gameWon} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image
                source={require('../images/medalha.png')}
                style={styles.medalImage}
              />
              <Text style={styles.congratulationsText}>Parabéns!</Text>
              <Text style={styles.congratulationsText}>Você completou o Quebra-Cabeça!</Text>
              <TouchableOpacity style={styles.resetButton} onPress={initializeBoard}>
                <Text style={styles.resetButtonText}>Reiniciar Jogo</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo escuro cobrindo toda a tela
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 35,
    marginBottom: 20,
    color: "#BA52AD",
    fontFamily: 'Font5',
  },
  stats: {
    fontSize: 18,
    marginBottom: 20,
    color: 'white',
  },
  board: {
    width: 300,
    height: 300,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  piece: {
    width: 70,
    height: 70,
    borderWidth: 1,
    borderColor: '#5C2179',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BA52AD',
  },
  empty: {
    backgroundColor: 'transparent',
  },
  pieceText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  shuffleButton: {
    backgroundColor: '#BA52AD',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  medalImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  congratulationsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  resetButton: {
    backgroundColor: '#BA52AD',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  resetButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default App;
