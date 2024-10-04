import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

const App = () => {
  const [guess, setGuess] = useState('');
  const [numberToGuess, setNumberToGuess] = useState(generateRandomNumber());
  const [attempts, setAttempts] = useState(0);

  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  const handleGuess = () => {
    const parsedGuess = parseInt(guess);
    if (isNaN(parsedGuess) || parsedGuess < 1 || parsedGuess > 100) {
      Alert.alert('Erro', 'Por favor, insira um número válido entre 1 e 100.');
      return;
    }
    setAttempts(attempts + 1);
    if (parsedGuess === numberToGuess) {
      Alert.alert('Parabéns!', `Você acertou o número em ${attempts + 1} tentativas!`);
      resetGame();
    } else if (parsedGuess < numberToGuess) {
      Alert.alert('Dica', 'O número é maior!');
    } else {
      Alert.alert('Dica', 'O número é menor!');
    }
    setGuess('');
  };

  const resetGame = () => {
    setNumberToGuess(generateRandomNumber());
    setAttempts(0);
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Adivinhe o Número!</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Digite seu palpite (1-100)"
          value={guess}
          onChangeText={setGuess}
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity style={styles.button} onPress={handleGuess}>
          <Text style={styles.buttonText}>Adivinhar</Text>
        </TouchableOpacity>
        <Text style={styles.attempts}>Tentativas: {attempts}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  container: {
    width: '85%',
    padding: 25,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginBottom: 30,
  },
  input: {
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    width: '100%',
    marginBottom: 20,
    color: '#333',
    fontSize: 16,
  },
  button: {
    width: '100%',
    paddingVertical: 12,
    backgroundColor: '#6a1b9a',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  attempts: {
    marginTop: 25,
    fontSize: 18,
    color: '#4A4A4A',
  },
});

export default App;
