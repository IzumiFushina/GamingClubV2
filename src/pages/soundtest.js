import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Alert } from 'react-native';
import { Audio } from 'expo-av';

export default function App() {
  const [sound, setSound] = useState();

  async function playSound() {
    console.log('Loading Sound');
    
    // Tente usar um arquivo de áudio de teste da URL
    const { sound: newSound } = await Audio.Sound.createAsync(
      // Altere para o seu arquivo local se necessário
      require('../sounds/SoundTest.mp3') // Ou use uma URL para testar
    );

    setSound(newSound);
    console.log('Playing Sound');
    
    // Reproduza o som
    await newSound.playAsync();

    // Adiciona um listener para descarregar o som após a reprodução
    newSound.setOnPlaybackStatusUpdate(status => {
      if (status.didJustFinish) {
        console.log('Sound finished playing');
        newSound.unloadAsync();
        setSound(undefined);
      }
    });
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <Button title="Play Sound" onPress={playSound} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
});
