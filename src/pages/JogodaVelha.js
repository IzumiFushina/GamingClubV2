import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TicTacToe = () => {
  const GG_ALL_GAME_CONFIG = {
    boardSize: 3, // Tamanho do tabuleiro
    playerSymbols: ['X', 'O'], // Símbolos dos jogadores
    winConditions: [ // Combinações vencedoras
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Linhas
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Colunas
      [0, 4, 8],
      [2, 4, 6], // Diagonais
    ],
  };

  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [gameBoard, setGameBoard] = useState(Array(9).fill(''));
  const [gameActive, setGameActive] = useState(true);
  const [status, setStatus] = useState(`Player ${GG_ALL_GAME_CONFIG.playerSymbols[currentPlayer]}'s turn`);

  const handleCellPress = (index) => {
    if (gameBoard[index] === '' && gameActive) {
      const newBoard = [...gameBoard];
      newBoard[index] = GG_ALL_GAME_CONFIG.playerSymbols[currentPlayer];
      setGameBoard(newBoard);

      if (checkWin(newBoard)) {
        setStatus(`Player ${GG_ALL_GAME_CONFIG.playerSymbols[currentPlayer]} wins!`);
        setGameActive(false);
      } else if (newBoard.every(cell => cell !== '')) {
        setStatus("It's a draw!");
        setGameActive(false);
      } else {
        const nextPlayer = 1 - currentPlayer;
        setCurrentPlayer(nextPlayer);
        setStatus(`Player ${GG_ALL_GAME_CONFIG.playerSymbols[nextPlayer]}'s turn`);
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
    setStatus(`Player ${GG_ALL_GAME_CONFIG.playerSymbols[0]}'s turn`);
  };

  const renderCell = (index) => (
    <TouchableOpacity style={styles.cell} onPress={() => handleCellPress(index)} key={index}>
      <Text style={styles.cellText}>{gameBoard[index]}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.status}>{status}</Text>
      <View style={styles.board}>
        {Array(9).fill(null).map((_, index) => renderCell(index))}
      </View>
      <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
        <Text style={styles.resetButtonText}>Reset Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  status: {
    fontSize: 24,
    marginBottom: 20,
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
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 1,
  },
  cellText: {
    fontSize: 36,
  },
  resetButton: {
    padding: 10,
    backgroundColor: '#333',
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default TicTacToe;
