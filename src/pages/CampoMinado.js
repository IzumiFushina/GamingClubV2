import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Animated } from 'react-native';
import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';

const BOARD_SIZE = 8;
const MINES_COUNT = 10;

const START_DEFAULT = { x: 0.5, y: 0 };
const END_DEFAULT = { x: 0.5, y: 1 };
const GRADIENT_COLORS = ["#1d335c", "#251d5c", "#16094f", "#411861", "#502569", "#502569", "#35094f"];
const GRADIENT_LOCATIONS = [0, 0.2, 0.4, 0.6, 0.8, 1, 1];
const MOVEMENT = GRADIENT_LOCATIONS[1] / 20;
const INTERVAL = 30;

let timeout = undefined;

const generateBoard = () => {
  const board = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill({
    isRevealed: false, isMine: false, neighboringMines: 0, isFlagged: false
  }));

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

  const [gradientOptions, setGradientOptions] = useState({
    colors: GRADIENT_COLORS,
    locations: GRADIENT_LOCATIONS,
    start: START_DEFAULT,
    end: END_DEFAULT
  });
  const gradientOptionsRef = useRef(gradientOptions);
  gradientOptionsRef.current = gradientOptions;

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
    if (gradientOptionsRef.current.locations[1] - MOVEMENT <= 0) {
      let gradientColors = [...gradientOptionsRef.current.colors];
      gradientColors.shift();
      gradientColors.push(gradientColors[1]);

      setGradientOptions({
        colors: gradientColors,
        locations: GRADIENT_LOCATIONS,
        start: START_DEFAULT,
        end: END_DEFAULT
      });
    } else {
      const updatedLocations = gradientOptionsRef.current.locations.map((item, index) => {
        if (index === gradientOptionsRef.current.locations.length - 1) return 1;
        return parseFloat(Math.max(0, item - MOVEMENT).toFixed(2));
      });

      setGradientOptions({
        colors: [...gradientOptionsRef.current.colors],
        locations: updatedLocations,
        start: START_DEFAULT,
        end: END_DEFAULT
      });
    }
    timeout = setTimeout(infiniteRainbow, INTERVAL);
  };

  const playSound = async () => {
    if (!sound) {
      const { sound: newSound } = await Audio.Sound.createAsync(
        require('../sounds/Campo Minado.mp3')
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

    if (!gameOver && !gameWon) {
      await playSound();
    }

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
          { backgroundColor: square.isRevealed ? (square.isMine ? '#f4a261' : '#A9A9A9') : '#4c0d6b' },
        ]}
        onPress={() => handleSquarePress(row, col)}
      >
        <Text style={styles.squareText}>{content}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient 
      colors={gradientOptions.colors}
      locations={gradientOptions.locations}
      start={gradientOptions.start}
      end={gradientOptions.end}
      style={styles.background}
    >
      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        <Text style={styles.title}>Campo Minado</Text>
        <TouchableOpacity onPress={() => setFlagMode(!flagMode)} style={styles.flagButton}>
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
      </Animated.View>
    </LinearGradient>
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
