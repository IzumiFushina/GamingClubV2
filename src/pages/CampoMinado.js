import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const BOARD_SIZE = 8;
const MINES_COUNT = 10;

const generateBoard = () => {
  const board = Array(BOARD_SIZE)
    .fill(null)
    .map(() => Array(BOARD_SIZE).fill({ isRevealed: false, isMine: false, neighboringMines: 0 }));

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

  const handleSquarePress = (row, col) => {
    if (gameOver || gameWon) return;

    const newBoard = [...board];
    const square = newBoard[row][col];

    if (square.isRevealed) return;

    if (square.isMine) {
      setGameOver(true);
      Alert.alert('Game Over', 'You clicked on a mine!');
      revealBoard(newBoard);
    } else {
      revealSquare(newBoard, row, col);
      if (checkWin(newBoard)) {
        setGameWon(true);
        Alert.alert('Congratulations', 'You won the game!');
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

  const resetGame = () => {
    setBoard(generateBoard());
    setGameOver(false);
    setGameWon(false);
  };

  const renderSquare = (row, col) => {
    const square = board[row][col];
    let content = '';

    if (square.isRevealed) {
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
          { backgroundColor: square.isRevealed ? (square.isMine ? '#f4a261' : '#B0E0E6') : 'white' },
        ]}
        onPress={() => handleSquarePress(row, col)}
      >
        <Text style={styles.squareText}>{content}</Text>
      </TouchableOpacity>
    );
  };

  return (
       <LinearGradient
        colors={['#E0FFFF', '#6cb7f5', '#3576ab']}
        style={styles.gradient}
      >
    <View style={styles.container}>
      <Text style={styles.textTitulo}> Campo minado </Text>
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
    </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  board: {
    flexDirection: 'column',
    backgroundColor: '',
    padding: 8,
    borderWidth: 8,
    borderColor: '#1E90FF',
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
    borderColor: '#1E90FF',
  },
  squareText: {
    fontSize: 18,
    fontFamily: 'Courier', // Escolha uma fonte que imite o estilo pixelado
    color: 'black',
  },
  resetButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#87CEEB',
    borderRadius: 8,
  },
  resetButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Courier',
    fontSize: 16,
  },

  textTitulo: {
   fontFamily: 'Font1',
   fontSize: 30,
   color: '#1E90FF',
   marginBottom: 30,
  },

});

export default App;
