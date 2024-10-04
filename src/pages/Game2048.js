import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';

const SIZE = 4; // Tamanho do grid 4x4
const GOAL = 2048; // Objetivo do jogo

// Função que cria um novo grid 4x4
const initializeGrid = () => {
  const grid = Array(SIZE)
    .fill()
    .map(() => Array(SIZE).fill(0));
  return grid;
};

// Função para gerar números no grid
const generateNumber = (grid) => {
  let emptySpaces = [];
  for (let row = 0; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++) {
      if (grid[row][col] === 0) {
        emptySpaces.push([row, col]);
      }
    }
  }

  if (emptySpaces.length === 0) return grid;

  const [row, col] = emptySpaces[Math.floor(Math.random() * emptySpaces.length)];
  grid[row][col] = Math.random() > 0.9 ? 4 : 2; // Adiciona 2 ou 4 em um espaço vazio
  return grid;
};

// Função para mover os blocos
const slideRow = (row) => {
  let arr = row.filter(val => val);
  let missing = SIZE - arr.length;
  let zeros = Array(missing).fill(0);
  arr = [...arr, ...zeros];
  return arr;
};

// Função para combinar números adjacentes
const combineRow = (row) => {
  for (let i = 0; i < SIZE - 1; i++) {
    if (row[i] === row[i + 1] && row[i] !== 0) {
      row[i] = row[i] * 2;
      row[i + 1] = 0;
    }
  }
  return row;
};

// Função para lidar com as direções de movimentação
const move = (grid, direction) => {
  let rotatedGrid = grid;
  if (direction === 'down' || direction === 'up') {
    rotatedGrid = rotateGrid(grid);
  }

  let newGrid = rotatedGrid.map(row => slideRow(combineRow(slideRow(row))));

  if (direction === 'down') {
    newGrid = rotateGrid(rotateGrid(rotateGrid(newGrid)));
  } else if (direction === 'up') {
    newGrid = rotateGrid(newGrid);
  }

  return newGrid;
};

// Rotacionar o grid
const rotateGrid = (grid) => {
  let newGrid = Array(SIZE).fill().map(() => Array(SIZE).fill(0));
  for (let row = 0; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++) {
      newGrid[col][SIZE - 1 - row] = grid[row][col];
    }
  }
  return newGrid;
};

export default function Game2048() {
  const [grid, setGrid] = useState(initializeGrid());

  useEffect(() => {
    setGrid(generateNumber(grid));
  }, []);

  const handleMove = (direction) => {
    const newGrid = move(grid, direction);
    setGrid(generateNumber(newGrid));

    if (checkWin(newGrid)) {
      Alert.alert('Parabéns!', 'Você alcançou 2048!');
    }
  };

  const checkWin = (grid) => {
    for (let row = 0; row < SIZE; row++) {
      for (let col = 0; col < SIZE; col++) {
        if (grid[row][col] === GOAL) return true;
      }
    }
    return false;
  };

  return (
    <View style={styles.container}>
      {grid.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((num, colIndex) => (
            <View key={colIndex} style={styles.cell}>
              <Text style={styles.number}>{num === 0 ? '' : num}</Text>
            </View>
          ))}
        </View>
      ))}

      <View style={styles.controls}>
        <TouchableOpacity onPress={() => handleMove('up')} style={styles.controlButton}>
          <Text>Up</Text>
        </TouchableOpacity>
        <View style={styles.horizontalControls}>
          <TouchableOpacity onPress={() => handleMove('left')} style={styles.controlButton}>
            <Text>Left</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleMove('right')} style={styles.controlButton}>
            <Text>Right</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => handleMove('down')} style={styles.controlButton}>
          <Text>Down</Text>
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
    backgroundColor: '#ff999a',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 80,
    height: 80,
    backgroundColor: '#ffe8d4',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  controls: {
    marginTop: 30,
  },
  controlButton: {
    padding: 10,
    backgroundColor: '#8f7a66',
    margin: 5,
    borderRadius: 5,
  },
  horizontalControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
