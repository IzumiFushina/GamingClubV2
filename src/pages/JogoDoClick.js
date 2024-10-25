import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, Button, ImageBackground, Image } from 'react-native';

const ClickFrenzy = () => {
  const [clicks, setClicks] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [showStartModal, setShowStartModal] = useState(true); // Novo estado para o modal de início
  const [scores, setScores] = useState([]); // Armazena as últimas pontuações

  const GG_ALL_GAME_CONFIG = {
    gameDuration: 10,
    startText: "Start",
    clickText: "Click!",
    resultText: "You clicked {clicks} times in 10 seconds!",
    resetText: "Reset"
  };

  useEffect(() => {
    let timer;
    if (isPlaying && remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (remainingTime === 0 && isPlaying) {
      clearInterval(timer);
      setIsPlaying(false);
      setIsDisabled(true);
      
      setScores((prevScores) => {
        const updatedScores = [...prevScores, clicks];
        return updatedScores.length > 5 ? updatedScores.slice(-5) : updatedScores;
      });
      
      setShowResultModal(true); // Abre o modal de resultado
    }
    return () => clearInterval(timer);
  }, [isPlaying, remainingTime]);

  const startGame = () => {
    setClicks(0);
    setRemainingTime(GG_ALL_GAME_CONFIG.gameDuration);
    setIsPlaying(true);
    setIsDisabled(false);
  };

  const handleClick = () => {
    if (!isPlaying) {
      startGame();
    } else {
      setClicks((prevClicks) => prevClicks + 1);
    }
  };

  const resetGame = () => {
    setClicks(0);
    setRemainingTime(GG_ALL_GAME_CONFIG.gameDuration);
    setIsPlaying(false);
    setIsDisabled(false);
    setShowResultModal(false);
  };

  const openScoreModal = () => {
    setShowScoreModal(true);
  };

  return (
    <ImageBackground source={require('../images/imagemfundo2.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>Click Frenzy</Text>
        <Text style={{color: 'white'}}>Click as many times as you can in 10 seconds!</Text>

        {/* Modal de início */}
        <Modal visible={showStartModal} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Get Ready!</Text>
              <Text style={styles.motivationalText}>Prepare-se para desafiar seus reflexos!</Text>
              <Text style={styles.motivationalText}>Clique o máximo que conseguir em 10 segundos!</Text>
              <Button title="Começar" onPress={() => setShowStartModal(false)} />
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          style={[
            styles.clickArea,
            remainingTime === 0 ? { backgroundColor: '#ccc' } : {}
          ]}
          onPress={handleClick}
          disabled={remainingTime === 0}
        >
          <Text style={styles.buttonText}>
            {isPlaying ? GG_ALL_GAME_CONFIG.clickText : GG_ALL_GAME_CONFIG.startText}
          </Text>
        </TouchableOpacity>

        {isPlaying && <Text style={styles.timer}>Time: {remainingTime}s</Text>}
        
        <TouchableOpacity style={styles.resetButton} onPress={resetGame} disabled={isPlaying}>
          <Text style={styles.resetButtonText}>{GG_ALL_GAME_CONFIG.resetText}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.scoreButton} onPress={openScoreModal}>
          <Text style={styles.scoreButtonText}>Show Scores</Text>
        </TouchableOpacity>

        <Modal visible={showResultModal} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image source={require('../images/medalha.png')} style={styles.medalImage} />
              <Text style={styles.result}>{GG_ALL_GAME_CONFIG.resultText.replace('{clicks}', clicks)}</Text>
              <Button title="Play Again" onPress={resetGame} />
            </View>
          </View>
        </Modal>

        <Modal visible={showScoreModal} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Last Scores</Text>
              {scores.map((score, index) => (
                <Text key={index} style={styles.scoreText}>{score} clicks</Text>
              ))}
              <Button title="Close" onPress={() => setShowScoreModal(false)} />
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  clickArea: {
    width: 200,
    height: 200,
    backgroundColor: '#971ac8',
    elevation: 20,
    shadowColor: 'white/',
    shadowOffset: { width: 100, height: 100 },
    shadowRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
  },
  timer: {
    fontSize: 24,
    marginTop: 20,
    color: 'white',
  },
  resetButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f44336',
    borderRadius: 5,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 18,
  },
  scoreButton: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#3b82f6',
    borderRadius: 5,
  },
  scoreButtonText: {
    color: 'white',
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  motivationalText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  scoreText: {
    fontSize: 18,
    marginVertical: 2,
  },
  result: {
    fontSize: 20,
    marginBottom: 20,
  },
  medalImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});

export default ClickFrenzy;
