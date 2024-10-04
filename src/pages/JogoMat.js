import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Animated } from 'react-native';

const generateEquation = (level) => {
  const num1 = Math.floor(Math.random() * 10 * level);
  const num2 = Math.floor(Math.random() * 10 * level);
  const num3 = level > 5 ? Math.floor(Math.random() * 10 * level) : null; // Adiciona um terceiro número para níveis maiores
  const operators = level > 3 ? ['+', '-', '*', '/'] : ['+', '-', '*']; // Adiciona divisão a partir do nível 4
  const operator1 = operators[Math.floor(Math.random() * operators.length)];
  const operator2 = num3 ? operators[Math.floor(Math.random() * operators.length)] : null;
  
  let result;
  
  // Calcula a equação dependendo se há um terceiro número ou não
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
      Alert.alert('Resposta Errada', `A resposta correta era: ${equation.answer}`);
      resetGame();
    }
  };

  const resetGame = () => {
    setLevel(1); 
    setScore(0); 
    setUserAnswer('');
    setEquation(generateEquation(1));
  };

  return (
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
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8f0f2',
    padding: 20,
  },
  container: {
    width: '90%',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4e5b6e',
    marginBottom: 20,
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
    fontFamily: 'PressStart2P',
  },
  input: {
    height: 50,
    borderColor: '#4e5b6e',
    borderWidth: 2,
    width: '80%',
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 24,
    backgroundColor: '#f9fbfc',
    color: '#4e5b6e',
    borderRadius: 10,
    fontFamily: 'PressStart2P',
  },
  button: {
    backgroundColor: '#4e5b6e',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
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
    color: '#4e5b6e',
    marginBottom: 20,
    fontFamily: 'PressStart2P',
  },
  resetButton: {
    backgroundColor: '#b0bec5',
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
});
