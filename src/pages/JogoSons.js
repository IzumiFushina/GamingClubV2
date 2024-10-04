import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Alert } from 'react-native';
import { Audio } from 'expo-av'; // Instale expo-av com `expo install expo-av`

const sounds = [
  require('./assets/sound1.mp3'),
  require('./assets/sound2.mp3'),
  require('./assets/sound3.mp3'),
  require('./assets/sound4.mp3'),
];

const App = () => {
  const [sequence, setSequence] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [round, setRound] = useState(0);

  useEffect(() => {
    startNewRound();
  }, []);

  const startNewRound = () => {
    setUserInput([]);
    const nextSound = Math.floor(Math.random() * sounds.length);
    setSequence((prev) => [...prev, nextSound]);
    playSequence([...sequence, nextSound]);
    setRound((prev) => prev + 1);
  };

  const playSequence = async (seq) => {
    for (let soundIndex of seq) {
      const { sound } = await Audio.Sound.createAsync(sounds[soundIndex]);
      await sound.playAsync();
      await new Promise((resolve) => setTimeout(resolve, 1000)); // espera 1 segundo entre os sons
    }
  };

  const handleUserInput = (soundIndex) => {
    const newInput = [...userInput, soundIndex];
    setUserInput(newInput);

    if (newInput.length === sequence.length) {
      if (JSON.stringify(newInput) === JSON.stringify(sequence)) {
        Alert.alert('Correto!', 'Pronto para a próxima rodada?');
        startNewRound();
      } else {
        Alert.alert('Errado!', 'Tente novamente.');
        setSequence([]);
        setRound(0);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jogo de Memória de Sons</Text>
      <Text style={styles.round}>Rodada: {round}</Text>
      {sounds.map((_, index) => (
        <Button
          key={index}
          title={`Som ${index + 1}`}
          onPress={() => handleUserInput(index)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  round: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default App;
