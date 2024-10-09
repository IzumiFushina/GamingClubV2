import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Button } from 'react-native';

const ClickFrenzy = () => {
  const [clicks, setClicks] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

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
  };

  return (
    <View style={styles.container}>
      <View style={styles.gameContainer}>
        <Text style={styles.title}>Click Frenzy</Text>
        <Text>Click as many times as you can in 10 seconds!</Text>
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
        {remainingTime === 0 && (
          <Text style={styles.result}>
            {GG_ALL_GAME_CONFIG.resultText.replace('{clicks}', clicks)}
          </Text>
        )}
        <TouchableOpacity
          style={styles.resetButton}
          onPress={resetGame}
          disabled={isPlaying}
        >
          <Text style={styles.resetButtonText}>{GG_ALL_GAME_CONFIG.resetText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  gameContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  clickArea: {
    width: 200,
    height: 200,
    backgroundColor: '#4CAF50',
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
  },
  result: {
    fontSize: 24,
    marginTop: 20,
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
});

export default ClickFrenzy;
