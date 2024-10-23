import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Animated, ImageBackground, Modal, Image } from 'react-native';

const generateEquation = (level) => {
  const num1 = Math.floor(Math.random() * 10 * level);
  const num2 = Math.floor(Math.random() * 10 * level);
  const num3 = level > 5 ? Math.floor(Math.random() * 10 * level) : null; 
  const operators = level > 3 ? ['+', '-', '*',] : ['+', '-', '*']; 
  const operator1 = operators[Math.floor(Math.random() * operators.length)];
  const operator2 = num3 ? operators[Math.floor(Math.random() * operators.length)] : null;
  
  let result;
  
  if (num3 !== null) {
    result = eval(`${num1} ${operator1} ${num2} ${operator2} ${num3}`);
  } else {
    result = eval(`${num1} ${operator1} ${num2}`);
  }
  
  const equation = num3 !== null 
    ? `${num1} ${operator1} ${num2} ${operator2} ${num3}`
    : `${num1} ${operator1} ${num2}`;

  return {
    equation,
    answer: result
  };
};

export default function JogoMat() {
  const [level, setLevel] = useState(1); 
  const [equation, setEquation] = useState(generateEquation(level));
  const [userAnswer, setUserAnswer] = useState(''); 
  const [score, setScore] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setEquation(generateEquation(level));
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [level]);

  const checkAnswer = () => {
    if (parseInt(userAnswer) === equation.answer) {
      setScore(score + 1);
      setLevel(level + 1);
      setUserAnswer('');
    } else {
      setModalVisible(true); // Exibe o modal com a medalha e a pontuação final
    }
  };

  const resetGame = () => {
    setLevel(1); 
    setScore(0); 
    setUserAnswer('');
    setEquation(generateEquation(1));
    setModalVisible(false); // Fecha o modal ao reiniciar o jogo
  };

  return (
    <ImageBackground 
      source={require('../images/BackgroundQuebraCabeça.png')} 
      style={styles.background}
    >
      <View style={styles.outerContainer}>
        <View style={styles.container}>
          <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
            Jogo de Matemática
          </Animated.Text>
          <Text style={styles.level}>Nível: {level}</Text>
          <Animated.Text style={[styles.equation, { opacity: fadeAnim }]}>
            {equation.equation}
          </Animated.Text>

          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={userAnswer}
            onChangeText={setUserAnswer}
            placeholder="Sua resposta"
            placeholderTextColor="#888"
          />

          <TouchableOpacity onPress={checkAnswer} style={styles.button}>
            <Text style={styles.buttonText}>Enviar Resposta</Text>
          </TouchableOpacity>

          <Text style={styles.score}>Pontuação: {score}</Text>

          <TouchableOpacity onPress={resetGame} style={styles.resetButton}>
            <Text style={styles.resetButtonText}>Reiniciar Jogo</Text>
          </TouchableOpacity>
        </View>

        {/* Modal de exibição da medalha */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image 
                source={require('../images/medalha.png')} 
                style={styles.medalImage}
              />
              <Text style={styles.modalText}>Parabéns!</Text>
              <Text style={styles.modalScore}>Pontuação final: {score}</Text>
              <TouchableOpacity onPress={resetGame} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Reiniciar Jogo</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 70,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#BA52AD',
    marginBottom: 30,
    textAlign: 'center',
    fontFamily: 'PressStart2P',
  },
  level: {
    fontSize: 24,
    color: '#4e5b6e',
    marginBottom: 20,
  },
  equation: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4e5b6e',
    marginBottom: 20,
    transform: [{ scale: 1.1 }],
    fontFamily: 'Font2',
  },
  input: {
    height: 50,
    borderColor: '#4b0d66',
    borderWidth: 2,
    width: 200,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 24,
    backgroundColor: '#f9fbfc',
    color: '#4e5b6e',
    borderRadius: 10,
    fontFamily: 'PressStart2P',
  },
  button: {
    backgroundColor: '#4b0d66',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontFamily: 'PressStart2P',
  },
  score: {
    fontSize: 24,
    color: '#df62b0',
    marginBottom: 20,
    fontFamily: 'PressStart2P',
  },
  resetButton: {
    backgroundColor: '#cb44c7',
    padding: 15,
    borderRadius: 10,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontFamily: 'PressStart2P',
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
    alignItems: 'center',
  },
  medalImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  modalText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4e5b6e',
    marginBottom: 20,
  },
  modalScore: {
    fontSize: 18,
    color: '#4e5b6e',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#4b0d66',
    padding: 15,
    borderRadius: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
