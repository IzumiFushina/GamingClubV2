import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const fadeAnim = new Animated.Value(0);

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
        <Text style={styles.title}>FRUV</Text>
      </Animated.View>
      
      <View style={styles.menu}>
        <TouchableOpacity onPress={() => navigation.navigate('JogoDaVelha')}>
          <View style={styles.menuItem}>
            <Image source={require('../images/tic-tac-toe.png')} style={styles.menuIcon} />
            <Text style={styles.menuText}>Jogo da Velha</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Forca')}>
          <View style={styles.menuItem}>
            <Image source={require('../images/hangman.png')} style={styles.menuIcon} />
            <Text style={styles.menuText}>Jogo da Forca</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('RPS')}>
          <View style={styles.menuItem}>
            <Image source={require('../images/rock-paper-scissors.jpeg')} style={styles.menuIcon} />
            <Text style={styles.menuText}>Pedra, Papel, Tesoura</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Botão de Iniciar Jogo */}
      <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate('StartGame')}>
        <Animated.Text style={styles.startButtonText}>Iniciar Jogo</Animated.Text>
      </TouchableOpacity>

      {/* Animação de Fundo */}
      <Animated.View style={styles.backgroundAnimation}>
        <Image source={require('../images/game-background.jpeg')} style={styles.backgroundImage} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    color: '#fff',
    fontWeight: 'bold',
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 50,
  },
  menuItem: {
    alignItems: 'center',
  },
  menuIcon: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  menuText: {
    color: '#fff',
    fontSize: 16,
  },
  startButton: {
    backgroundColor: '#ff4747',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backgroundAnimation: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0.2,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
  },
});

export default HomeScreen;
