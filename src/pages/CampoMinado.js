import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Animated, ImageBackground } from 'react-native';
import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';

const BOARD_SIZE = 8;
const MINES_COUNT = 10;

const generateBoard = () => {
  const board = Array(BOARD_SIZE)
    .fill(null)
    .map(() => Array(BOARD_SIZE).fill({ isRevealed: false, isMine: false, neighboringMines: 0, isFlagged: false }));

  let minesPlanted = 0;
  while (minesPlanted < MINES_COUNT) {
    const row = Math.floor(Math.random() * BOARD_SIZE);
    const col = Math.floor(Math.random() * BOARD_SIZE);

    if (!board[row][col].isMine) {
      board[row][col] = { ...board[row][col], isMine: true };
      minesPlanted++;
    }
  }

  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (!board[row][col].isMine) {
        const neighboringMines = countNeighboringMines(board, row, col);
        board[row][col] = { ...board[row][col], neighboringMines };
      }
    }
  }

  return board;
};

const countNeighboringMines = (board, row, col) => {
  let count = 0;
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1], [1, 0], [1, 1],
  ];

  directions.forEach(([dx, dy]) => {
    const newRow = row + dx;
    const newCol = col + dy;
    if (newRow >= 0 && newRow < BOARD_SIZE && newCol >= 0 && newCol < BOARD_SIZE) {
      if (board[newRow][newCol].isMine) {
        count++;
      }
    }
  });

  return count;
};

const App = () => {
  const [board, setBoard] = useState(generateBoard());
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [flagMode, setFlagMode] = useState(false);
  const [sound, setSound] = useState();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const playSound = async () => {
    if (!sound) {
      const { sound: newSound } = await Audio.Sound.createAsync(
        require('../sounds/Campo Minado.mp3') // Adicione o caminho correto para sua música
      );
      setSound(newSound);
      await newSound.setIsLoopingAsync(true);
      await newSound.playAsync();
    }
  };

  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync();
      setSound(undefined); // Limpa a referência do som
    }
  };

  const handleSquarePress = async (row, col) => {
    const newBoard = [...board];
    const square = newBoard[row][col];

    if (gameOver || gameWon || square.isRevealed) return;

    if (!gameOver && !gameWon) {
      await playSound();
    }

    if (flagMode) {
      square.isFlagged = !square.isFlagged;
    } else {
      if (square.isMine) {
        setGameOver(true);
        await stopSound(); // Para a música ao perder
        Alert.alert('Game Over', 'Você clicou em uma mina!');
        revealBoard(newBoard);
      } else {
        revealSquare(newBoard, row, col);
        if (checkWin(newBoard)) {
          setGameWon(true);
          await stopSound(); // Para a música ao ganhar
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
    await stopSound(); // Para o som ao reiniciar
  };

  const toggleFlagMode = () => {
    setFlagMode(prev => !prev);
  };

  const renderSquare = (row, col) => {
    const square = board[row][col];
    let content = '';

    if (square.isFlagged) {
      content = '🚩';
    } else if (square.isRevealed) {
      if (square.isMine) {
        content = '💣';
      } else if (square.neighboringMines > 0) {
        content = square.neighboringMines.toString();
      }
    }

    return (
      <TouchableOpacity
        key={`${row}-${col}`}
        style={[
          styles.square,
          { backgroundColor: square.isRevealed ? (square.isMine ? '#f4a261' : '#B0E0E6') : '#4c0d6b' },
        ]}
        onPress={() => handleSquarePress(row, col)}
      >
        <Text style={styles.squareText}>{content}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground 
      source={require('../images/galaxy.jpg')} // Coloque o caminho para sua imagem
      style={styles.background}
    >
      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        <LinearGradient
          colors={['rgba(1, 3, 5, 0.7)', 'rgba(14, 30, 43, 0.7)', 'rgba(18, 28, 105, 0.7)']}
          style={styles.gradient}
        >
          <Text style={styles.textTitulo}> Campo minado </Text>
          <TouchableOpacity onPress={toggleFlagMode} style={styles.flagButton}>
            <Text style={styles.flagButtonText}>{flagMode ? 'Desativar Modo Bandeira' : 'Ativar Modo Bandeira'}</Text>
          </TouchableOpacity>
          <View style={styles.board}>
            {board.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {row.map((_, colIndex) => renderSquare(rowIndex, colIndex))}
              </View>
            ))}
          </View>
          <TouchableOpacity onPress={resetGame} style={styles.resetButton}>
            <Text style={styles.resetButtonText}>Reiniciar Jogo</Text>
          </TouchableOpacity>
        </LinearGradient>
      </Animated.View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  board: {
    flexDirection: 'column',
    borderWidth: 8,
    borderColor: '#144263',
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
  },
  square: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#121c69',
    borderRadius: 5,
    margin: 2,
  },
  squareText: {
    fontSize: 18,
    fontFamily: 'Courier',
    color: 'black',
  },
  resetButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#9f5bd4',
    borderRadius: 8,
    borderWidth: 1, 
    borderColor: 'black', 
  },
  resetButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textShadowColor: 'black', // Cor da sombra (borda)
    textShadowOffset: {      // Deslocamento da sombra
      width: 1,
      height: 1,
    },
    textShadowRadius: 1,     // Raio da sombra
  },
  textTitulo: {
    fontFamily: 'Font1',
    fontSize: 30,
    color: '#9f5bd4',
    marginBottom: 30,
    textAlign: 'center',
    textShadowColor: 'pink', // Cor da sombra (borda)
    textShadowOffset: {      // Deslocamento da sombra
      width: 1,
      height: 1,
    },
    textShadowRadius: 1,     // Raio da sombra
  },
  flagButton: {
    padding: 10,
    backgroundColor: '#9f5bd4',
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1, 
    borderColor: 'black', 
  },
  flagButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textShadowColor: 'black', // Cor da sombra (borda)
    textShadowOffset: {      // Deslocamento da sombra
      width: 1,
      height: 1,
    },
    textShadowRadius: 1,     // Raio da sombra
  },
});

export default App;
