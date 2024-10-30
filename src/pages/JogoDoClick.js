import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, ImageBackground, Image, Animated } from 'react-native';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

const ClickFrenzy = () => {
  const [clicks, setClicks] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [showStartModal, setShowStartModal] = useState(true);
  const [scores, setScores] = useState([]);
  
  // Animação do ícone
  const animationValue = useState(new Animated.Value(0))[0];

  const GG_ALL_GAME_CONFIG = {
    gameDuration: 10,
    startText: "Começar",
    clickText: "Click!",
    resultText: "Você clicou {clicks} vezes em 10 segundos!",
    resetText: "Reiniciar"
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
      setShowResultModal(true);
    }
    return () => clearInterval(timer);
  }, [isPlaying, remainingTime]);

  useEffect(() => {
    // Função para animar o ícone
    const startAnimation = () => {
      animationValue.setValue(0);
      Animated.loop(
        Animated.sequence([
          Animated.timing(animationValue, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(animationValue, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    startAnimation();

    return () => animationValue.stop();
  }, []);

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

  // Animação do ícone
  const iconScale = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2], // Muda o tamanho do ícone
  });

  return (
    <ImageBackground source={require('../images/imagemfundo2.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        {/* Mensagem acima do ícone */}
        
        <TouchableOpacity style={styles.scoreButton} onPress={openScoreModal}>
          <Animated.View style={{ transform: [{ scale: iconScale }] }}>
            <SimpleLineIcons name="trophy" size={24} color="yellow" />
          </Animated.View>
        </TouchableOpacity>

        <Text style={styles.title}>Jogo Click</Text>
        <Text style={{ color: 'white' }}>Clique o máximo que conseguir em 10 segundos!</Text>

        {/* Modal de início */}
        <Modal visible={showStartModal} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Vamos Jogar!</Text>
              <Text style={styles.motivationalText}>Prepare-se para desafiar seus reflexos!</Text>
              <Text style={styles.motivationalText}>Clique o máximo que conseguir em 10 segundos!</Text>
              <TouchableOpacity onPress={() => setShowStartModal(false)} style={styles.startButton}>
                <Text style={styles.startButtonText}>Jogar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          style={[
            styles.clickArea,
            remainingTime === 0 ? { backgroundColor: 'purple' } : {}
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

        <Modal visible={showResultModal} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image source={require('../images/medalha.png')} style={styles.medalImage} />
              <Text style={styles.result}>{GG_ALL_GAME_CONFIG.resultText.replace('{clicks}', clicks)}</Text>
              <TouchableOpacity onPress={resetGame} style={styles.playAgainButton}>
                <Text style={styles.playAgainButtonText}>Jogar novamente</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal visible={showScoreModal} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Últimas pontuações</Text>
              {scores.map((score, index) => (
                <Text key={index} style={styles.scoreText}>{score} clicks</Text>
              ))}
              <TouchableOpacity onPress={() => setShowScoreModal(false)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Fechar</Text>
              </TouchableOpacity>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
    fontFamily: 'Font5',
    textAlign: 'center',
  },
  attentionText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  clickArea: {
    width: 200,
    height: 200,
    backgroundColor: 'purple',
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
    marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 18,
  },
  scoreButton: {
    padding: 12,
    borderRadius: 8,
    marginLeft: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    width: 320,
    padding: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  motivationalText: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 20,
  },
  startButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#BA52AD',
    borderRadius: 5,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
  },
  result: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  playAgainButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'purple',
    borderRadius: 5,
  },
  playAgainButtonText: {
    color: 'white',
    fontSize: 18,
  },
  medalImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  scoreText: {
    fontSize: 16,
    marginBottom: 5,
  },
  closeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#BA52AD',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default ClickFrenzy;
