import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const initialBoard = [
  ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
  ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
  ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'],
];

const pieces = {
  '♜': 'bR',
  '♞': 'bN',
  '♝': 'bB',
  '♛': 'bQ',
  '♚': 'bK',
  '♟': 'bP',
  '♖': 'wR',
  '♘': 'wN',
  '♗': 'wB',
  '♕': 'wQ',
  '♔': 'wK',
  '♙': 'wP',
};

export default function ChessGame() {
  const [board, setBoard] = useState(initialBoard);
  const [currentTurn, setCurrentTurn] = useState('w');
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [possibleMoves, setPossibleMoves] = useState([]);

  const renderBoard = () => {
    return board.map((row, rowIndex) => {
      return row.map((square, colIndex) => {
        let squareStyle = (rowIndex + colIndex) % 2 === 0 ? styles.white : styles.black;
        if (selectedPiece && selectedPiece.row === rowIndex && selectedPiece.col === colIndex) {
          squareStyle = { ...squareStyle, ...styles.selected };
        }
        const isPossibleMove = possibleMoves.some(move => move.row === rowIndex && move.col === colIndex);
        if (isPossibleMove) {
          squareStyle = { ...squareStyle, ...styles.possibleMove };
        }

        return (
          <TouchableOpacity key={`${rowIndex}-${colIndex}`} style={[styles.square, squareStyle]} onPress={() => handleSquareClick(rowIndex, colIndex)}>
            <Text style={styles.piece}>{square}</Text>
          </TouchableOpacity>
        );
      });
    });
  };

  const handleSquareClick = (row, col) => {
    const piece = board[row][col];
    if (selectedPiece) {
      const selectedRow = selectedPiece.row;
      const selectedCol = selectedPiece.col;
      if (isValidMove(selectedRow, selectedCol, row, col)) {
        movePiece(selectedRow, selectedCol, row, col);
        setSelectedPiece(null);
        setPossibleMoves([]);
        setCurrentTurn(currentTurn === 'w' ? 'b' : 'w');
      } else if (piece && pieces[piece][0] === currentTurn) {
        selectPiece(row, col);
      } else {
        setSelectedPiece(null);
        setPossibleMoves([]);
      }
    } else if (piece && pieces[piece][0] === currentTurn) {
      selectPiece(row, col);
    }
  };

  const selectPiece = (row, col) => {
    setSelectedPiece({ row, col });
    setPossibleMoves(calculatePossibleMoves(row, col));
  };

  const isValidMove = (fromRow, fromCol, toRow, toCol) => {
    return possibleMoves.some(move => move.row === toRow && move.col === toCol);
  };

  const movePiece = (fromRow, fromCol, toRow, toCol) => {
    const newBoard = board.map(row => row.slice());
    newBoard[toRow][toCol] = board[fromRow][fromCol];
    newBoard[fromRow][fromCol] = '';
    setBoard(newBoard);
  };

  const calculatePossibleMoves = (row, col) => {
    const piece = board[row][col];
    const pieceType = pieces[piece][1];
    const pieceColor = pieces[piece][0];
    let moves = [];
    switch (pieceType) {
      case 'P':
        moves = getPawnMoves(row, col, pieceColor);
        break;
    }
    return moves;
  };

  const getPawnMoves = (row, col, color) => {
    const direction = color === 'w' ? -1 : 1;
    const moves = [];
    if (board[row + direction] && board[row + direction][col] === '') {
      moves.push({ row: row + direction, col: col });
    }
    if (board[row + direction] && board[row + direction][col - 1] && pieces[board[row + direction][col - 1]] && pieces[board[row + direction][col - 1]][0] !== color) {
      moves.push({ row: row + direction, col: col - 1 });
    }
    if (board[row + direction] && board[row + direction][col + 1] && pieces[board[row + direction][col + 1]] && pieces[board[row + direction][col + 1]][0] !== color) {
      moves.push({ row: row + direction, col: col + 1 });
    }
    if ((color === 'w' && row === 6) || (color === 'b' && row === 1)) {
      if (board[row + 2 * direction][col] === '' && board[row + direction][col] === '') {
        moves.push({ row: row + 2 * direction, col: col });
      }
    }
    return moves;
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setCurrentTurn('w');
    setSelectedPiece(null);
    setPossibleMoves([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.chessboard}>{renderBoard()}</View>
      <View style={styles.gameInfo}>
        <Text style={styles.heading}>Chess Game</Text>
        <Text style={styles.turnText}>Vez do: {currentTurn === 'w' ? 'Branco' : 'Preto'}</Text>
        <TouchableOpacity style={styles.newGameButton} onPress={resetGame}>
          <Text style={styles.newGameButtonText}>Novo jogo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    padding: 20,
  },
  chessboard: {
    width: 400,
    height: 400,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#8B5E3C',
    padding: 5,
    borderRadius: 10,
  },
  square: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  white: {
    backgroundColor: '#F7F7F7',
  },
  black: {
    backgroundColor: '#B38867',
  },
  selected: {
    backgroundColor: '#FFCC00',
  },
  possibleMove: {
    backgroundColor: '#FFD700',
  },
  piece: {
    fontSize: 26,
  },
  gameInfo: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    marginBottom: 10,
    color: '#333',
  },
  turnText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#555',
  },
  newGameButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#6A1B9A',
    borderRadius: 5,
  },
  newGameButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
