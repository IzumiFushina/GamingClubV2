import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Animated, ImageBackground } from 'react-native';
import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons'; // Importando ícones

const BOARD_SIZE = 8;
const MINES_COUNT = 10;

const START_DEFAULT = { x: 0.5, y: 0 };
const END_DEFAULT = { x: 0.5, y: 1 };
const GRADIENT_COLORS = ["#1d335c", "#251d5c", "#16094f", "#411861", "#502569", "#502569", "#35094f"];
const GRADIENT_LOCATIONS = [0, 0.2, 0.4, 0.6, 0.8, 1, 1];
const MOVEMENT = GRADIENT_LOCATIONS[1] / 20;
const INTERVAL = 30;

let timeout;

const generateBoard = () => {
  const board = Array.from({ length: BOARD_SIZE }, () => 
    Array.from({ length: BOARD_SIZE }, () => ({
      isRevealed: false,
      isMine: false,
      neighboringMines: 0,
      isFlagged: false,
    }))
  );

  let minesPlanted = 0;
  while (minesPlanted < MINES_COUNT) {
    const row = Math.floor(Math.random() * BOARD_SIZE);
    const col = Math.floor(Math.random() * BOARD_SIZE);
    if (!board[row][col].isMine) {
      board[row][col].isMine = true;
      minesPlanted++;
    }
  }

  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (!board[row][col].isMine) {
        board[row][col].neighboringMines = countNeighboringMines(board, row, col);
      }
    }
  }

  return board;
};

const countNeighboringMines = (board, row, col) => {
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1], [1, 0], [1, 1],
  ];

  return directions.reduce((count, [dx, dy]) => {
    const newRow = row + dx;
    const newCol = col + dy;
    if (newRow >= 0 && newRow < BOARD_SIZE && newCol >= 0 && newCol < BOARD_SIZE) {
      return count + (board[newRow][newCol].isMine ? 1 : 0);
    }
    return count;
  }, 0);
};

const App = () => {
  const [board, setBoard] = useState(generateBoard());
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [flagMode, setFlagMode] = useState(false);
  const [sound, setSound] = useState();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [gradientOptions, setGradientOptions] = useState({
    colors: GRADIENT_COLORS,
    locations: GRADIENT_LOCATIONS,
    start: START_DEFAULT,
    end: END_DEFAULT,
  });

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    infiniteRainbow();
    return () => clearTimeout(timeout);
  }, []);

  const infiniteRainbow = () => {
    const updatedLocations = gradientOptions.locations.map((loc, index) => 
      index === gradientOptions.locations.length - 1 ? 1 : Math.max(0, loc - MOVEMENT).toFixed(2)
    );

    setGradientOptions(prev => ({
      ...prev,
      locations: updatedLocations,
    }));
    
    timeout = setTimeout(infiniteRainbow, INTERVAL);
  };

  const playSound = async () => {
    if (!sound) {
      const { sound: newSound } = await Audio.Sound.createAsync(
        require('../sounds/Campo Minado.mp3'),
        {volume: 0,}
      );
      setSound(newSound);
      await newSound.setIsLoopingAsync(true);
      await newSound.playAsync();
    }
  };

  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync();
      setSound(undefined);
    }
  };

  const handleSquarePress = async (row, col) => {
    const newBoard = [...board];
    const square = newBoard[row][col];

    if (gameOver || gameWon || square.isRevealed) return;

    if (!gameOver && !gameWon) await playSound();

    if (flagMode) {
      square.isFlagged = !square.isFlagged;
    } else {
      if (square.isMine) {
        setGameOver(true);
        await stopSound();
        Alert.alert('Game Over', 'Você clicou em uma mina!');
        revealBoard(newBoard);
      } else {
        revealSquare(newBoard, row, col);
        if (checkWin(newBoard)) {
          setGameWon(true);
          await stopSound();
          Alert.alert('Parabéns', 'Você ganhou o jogo!');
        }
      }
    }

    setBoard(newBoard);
  };

  const revealSquare = (board, row, col) => {
    if (row < 0 || row >= BOARD_SIZE || col < 0 || col >= BOARD_SIZE) return;
    const square = board[row][col];
    if (square.isRevealed || square.isMine) return;

    square.isRevealed = true;

    if (square.neighboringMines === 0) {
      const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],           [0, 1],
        [1, -1], [1, 0], [1, 1],
      ];

      directions.forEach(([dx, dy]) => {
        revealSquare(board, row + dx, col + dy);
      });
    }
  };

  const revealBoard = (board) => {
    board.forEach(row => row.forEach(square => square.isRevealed = true));
  };

  const checkWin = (board) => {
    return board.every(row =>
      row.every(square => square.isRevealed || square.isMine)
    );
  };

  const resetGame = async () => {
    setBoard(generateBoard());
    setGameOver(false);
    setGameWon(false);
    setFlagMode(false);
    await stopSound();
  };

  const renderSquare = (row, col) => {
    const square = board[row][col];
    let content = '';

    if (square.isFlagged) {
      content = '🚩';
    } else if (square.isRevealed) {
      content = square.isMine ? '💣' : (square.neighboringMines > 0 ? square.neighboringMines.toString() : '');
    }

    return (
      <TouchableOpacity
        key={`${row}-${col}`}
        style={[
          styles.square,
          { backgroundColor: square.isRevealed ? (square.isMine ? '#BA52AD' : '#B65FC8') : '#4c0d6b' },
        ]}
        onPress={() => handleSquarePress(row, col)}
      >
        <Text style={styles.squareText}>{content}</Text>
      </TouchableOpacity>
      
    );
  };

  return (
    <ImageBackground 
      source={require('../images/fundo5.png')} // Certifique-se de que o caminho da imagem está correto
      style={styles.background}
    >
      <Animated.View style={styles.container}>
        <Text style={{fontFamily: 'Font5', fontSize: 40, color: "#BA52AD", marginBottom: 30, }}>Campo Minado</Text>
        <View style={styles.board}>
          {board.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((_, colIndex) => renderSquare(rowIndex, colIndex))}
            </View>
          ))}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => setFlagMode(!flagMode)} style={styles.flagButton}>
            <Text style={styles.flagButtonText}>{flagMode ? 'Desativar Modo Bandeira' : 'Ativar Modo Bandeira'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={resetGame} style={styles.resetButton}>
            <Text style={styles.resetButtonText}>Reiniciar Jogo</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </ImageBackground>
    
    
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  board: {
    flexDirection: 'column',
    borderWidth: 4,
    borderColor: '#BA52AD',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
  },
  square: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
  },
  squareText: {
    fontSize: 20,
    color: '#fff',
  },
  resetButton: {
    backgroundColor: '#4c0d6b',
    justifyContent: "center",
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
    marginTop: 10,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 14,
    alignItems: 'center',
  },
  flagButton: {
    backgroundColor: '#BA52AD',
    justifyContent: "center",
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
    width: 180,
    height: 50,
    fontFamily: 'Font5',
    marginTop: 10,
  },
  flagButtonText: {
    color: '#fff',
    fontSize: 14,
    alignSelf: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
});

export default App;
