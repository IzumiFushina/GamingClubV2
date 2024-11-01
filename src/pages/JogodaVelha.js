import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Modal, Image } from 'react-native';
import { BlurView } from 'expo-blur';
import Icon from 'react-native-vector-icons/Ionicons'; // Importando ícones

const TicTacToe = ({ navigation }) => { // Adicione navigation como props
  const GG_ALL_GAME_CONFIG = {
    boardSize: 3,
    playerSymbols: ['X', 'O'],
    winConditions: [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ],
  };

  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [gameBoard, setGameBoard] = useState(Array(9).fill(''));
  const [gameActive, setGameActive] = useState(true);
  const [status, setStatus] = useState(`Vez do jogador ${GG_ALL_GAME_CONFIG.playerSymbols[currentPlayer]}`);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleCellPress = (index) => {
    if (gameBoard[index] === '' && gameActive) {
      const newBoard = [...gameBoard];
      newBoard[index] = GG_ALL_GAME_CONFIG.playerSymbols[currentPlayer];
      setGameBoard(newBoard);

      if (checkWin(newBoard)) {
        setModalMessage(`Jogador ${GG_ALL_GAME_CONFIG.playerSymbols[currentPlayer]} venceu!`);
        setGameActive(false);
        setModalVisible(true);
      } else if (newBoard.every(cell => cell !== '')) {
        setModalMessage("É um empate!");
        setGameActive(false);
        setModalVisible(true);
      } else {
        const nextPlayer = 1 - currentPlayer;
        setCurrentPlayer(nextPlayer);
        setStatus(`Vez do jogador ${GG_ALL_GAME_CONFIG.playerSymbols[nextPlayer]}`);
      }
    }
  };

  const checkWin = (board) => {
    return GG_ALL_GAME_CONFIG.winConditions.some(condition => {
      return condition.every(index => {
        return board[index] === GG_ALL_GAME_CONFIG.playerSymbols[currentPlayer];
      });
    });
  };

  const resetGame = () => {
    setGameBoard(Array(9).fill(''));
    setGameActive(true);
    setCurrentPlayer(0);
    setStatus(`Vez do jogador ${GG_ALL_GAME_CONFIG.playerSymbols[0]}`);
    setModalVisible(false);
  };

  const renderCell = (index) => (
    <TouchableOpacity style={styles.cell} onPress={() => handleCellPress(index)} key={index}>
      <Text style={styles.cellText}>{gameBoard[index]}</Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground 
      source={require('../images/imagemfundo4.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        {/* Ícone de fechar */}
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.navigate('Catalogo')}>
          <Icon name="close" size={30} color="#BA52AD" />
        </TouchableOpacity>

        <Text style={styles.title}>Jogo da Velha</Text>
        <Text style={styles.status}>{status}</Text>
        <View style={styles.board}>
          {Array(9).fill(null).map((_, index) => renderCell(index))}
        </View>
        <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
          <Text style={styles.resetButtonText}>Reiniciar Jogo</Text>
        </TouchableOpacity>

        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={resetGame}
        >
          <BlurView intensity={10} style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image source={require("../images/medalha.png")} style={styles.medalImage} />
              <Text style={styles.modalText}>{modalMessage}</Text>
              <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
                <Text style={styles.resetButtonText}>Reiniciar Jogo</Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </Modal>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  title: {
    color: '#BA52AD',
    fontSize: 30,
    fontFamily: 'Font5',
    marginBottom: 5,
  },
  status: {
    fontSize: 24,
    marginBottom: 35,
    color: 'white',
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 315,
    marginBottom: 20,
  },
  cell: {
    width: 100,
    height: 100,
    backgroundColor: '#BA52AD',
    borderWidth: 2,
    borderColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 1,
    borderRadius: 5,
  },
  cellText: {
    fontSize: 36,
  },
  resetButton: {
    padding: 10,
    backgroundColor: '#BA52AD',
    borderRadius: 5,
    marginTop: 5,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  medalImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});

export default TicTacToe;
