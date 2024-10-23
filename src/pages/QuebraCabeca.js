import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ImageBackground, Modal, Image } from 'react-native';

const App = () => {
  const [board, setBoard] = useState([]);
  const [emptyIndex, setEmptyIndex] = useState(15); // Inicialmente, a posição vazia é a última
  const [moves, setMoves] = useState(0); // Contador de movimentos
  const [time, setTime] = useState(0); // Contador de tempo
  const [isPlaying, setIsPlaying] = useState(false); // Para controlar o temporizador
  const [gameWon, setGameWon] = useState(false); // Para controlar a exibição do modal

  useEffect(() => {
    initializeBoard(); // Inicializa o tabuleiro ao montar o componente
  }, []);

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setTime(prevTime => prevTime + 1); // Atualiza o tempo
      }, 1000); // Atualiza a cada segundo
    }
    return () => clearInterval(timer); // Limpa o timer ao desmontar
  }, [isPlaying]);

  const initializeBoard = () => {
    const newBoard = Array.from({ length: 16 }, (_, i) => (i < 15 ? i + 1 : '')); // Cria o tabuleiro
    setBoard(newBoard); // Define o tabuleiro inicial
    setEmptyIndex(15); // Define a posição vazia
    setMoves(0); // Reseta o contador de movimentos
    setTime(0); // Reseta o tempo
    setIsPlaying(true); // Começa a contagem do tempo
    setGameWon(false); // Reseta o status de vitória
  };

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Troca elementos
    }
    return array;
  };

  const randomizeBoard = () => {
    const newBoard = shuffle(Array.from({ length: 16 }, (_, i) => (i < 15 ? i + 1 : ''))); // Embaralha as peças
    setBoard(newBoard);
    setEmptyIndex(newBoard.indexOf('')); // Atualiza a posição do vazio
    setMoves(0); // Reseta o contador de movimentos
    setTime(0); // Reseta o tempo
    setIsPlaying(true); // Começa a contagem do tempo
  };

  const movePiece = (index) => {
    const adjacentIndexes = [
      emptyIndex - 1, // esquerda
      emptyIndex + 1, // direita
      emptyIndex - 4, // acima
      emptyIndex + 4, // abaixo
    ];
    
    if (adjacentIndexes.includes(index)) {
      const newBoard = [...board];
      [newBoard[emptyIndex], newBoard[index]] = [newBoard[index], newBoard[emptyIndex]];
      setBoard(newBoard);
      setEmptyIndex(index);
      setMoves(moves + 1); // Incrementa o contador de movimentos
      checkWin(newBoard); // Verifica se ganhou
    }
  };

  const checkWin = (newBoard) => {
    if (newBoard.every((value, index) => value === (index < 15 ? index + 1 : ''))) {
      setIsPlaying(false); // Para a contagem do tempo
      setGameWon(true); // Mostra o modal com a vitória
    }
  };

  return (
    <ImageBackground
      source={require('../images/BackgroundQuebraCabeça.png')} // Usando require para a imagem local
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Quebra-Cabeça de 15</Text>
        <Text style={styles.stats}>Movimentos: {moves}</Text>
        <Text style={styles.stats}>Tempo: {time} segundos</Text>
        <View style={styles.board}>
          {board.map((value, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.piece, value === '' && styles.empty]}
              onPress={() => movePiece(index)} // Permite mover apenas peças adjacentes
            >
              {value ? <Text style={styles.pieceText}>{value}</Text> : null}
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.shuffleButton} onPress={randomizeBoard}>
          <Text style={styles.buttonText}>Embaralhar</Text>
        </TouchableOpacity>

        {/* Modal de vitória */}
        <Modal
          transparent={true}
          visible={gameWon}
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image
                source={require('../images/medalha.png')} // Adicione o caminho da imagem da medalha
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#DB73B7',
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
    backgroundColor: 'rgba(0,0,0,0.7)', // Fundo escurecido
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
