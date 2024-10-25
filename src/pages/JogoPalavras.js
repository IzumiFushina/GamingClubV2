import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, Modal, ImageBackground, Image } from 'react-native';

const App = () => {
  const [guess, setGuess] = useState('');
  const [numberToGuess, setNumberToGuess] = useState(generateRandomNumber());
  const [attempts, setAttempts] = useState(0);
  const [hintModalVisible, setHintModalVisible] = useState(false);
  const [victoryModalVisible, setVictoryModalVisible] = useState(false);
  const [hintMessage, setHintMessage] = useState('');

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
      setVictoryModalVisible(true);
    } else {
      setHintMessage(parsedGuess < numberToGuess ? 'O número é maior!' : 'O número é menor!');
      setHintModalVisible(true);
    }
    setGuess('');
  };

  const resetGame = () => {
    setNumberToGuess(generateRandomNumber());
    setAttempts(0);
    setGuess('');
    setVictoryModalVisible(false);
  };

  return (
    <ImageBackground source={require('../images/imagemfundo1.png')} style={styles.background}>
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
        </View>

        {/* Modal para Dica (maior ou menor) */}
        <Modal
          transparent={true}
          visible={hintModalVisible}
          animationType="fade"
          onRequestClose={() => setHintModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.hintText}>{hintMessage}</Text>
              <Text style={styles.encouragement}>Continue tentando, não desista!</Text>
              <TouchableOpacity
                style={styles.okButton}
                onPress={() => setHintModalVisible(false)}
              >
                <Text style={styles.okButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Modal para Vitória (com imagem de medalha) */}
        <Modal visible={victoryModalVisible} transparent animationType="slide">
   <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      {/* Imagem da medalha no topo */}
      <Image source={require('../images/medalha.png')} style={styles.medalImage} />

      {/* Textos abaixo da imagem */}
      <Text style={styles.modalTitle}>Parabéns!</Text>
      <Text style={styles.modalText}>Você acertou o número em {attempts} tentativas!</Text>

      {/* Botão "Jogar Novamente" com estilo */}
      <TouchableOpacity style={styles.playAgainButton} onPress={resetGame}>
        <Text style={styles.playAgainButtonText}>Jogar Novamente</Text>
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
    resizeMode: 'cover',
  },
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', 
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  hintText: {
    fontSize: 20,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  encouragement: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  congratulationsText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  attemptsText: {
    fontSize: 18,
    color: '#4A4A4A',
    marginBottom: 20,
    textAlign: 'center',
  },
  medalImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  okButton: {
    alignSelf: 'flex-end',
  },
  okButtonText: {
    color: '#6a1b9a',
    fontSize: 16,
    fontWeight: 'bold',
  },
  playAgainButton: {
    backgroundColor: '#6a1b9a',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  playAgainButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 18,
    color: '#4A4A4A',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default App;
