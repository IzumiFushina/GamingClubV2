import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Animated, ImageBackground, Modal, Image } from 'react-native';
import { BlurView } from 'expo-blur'; // Importando BlurView
import Icon from 'react-native-vector-icons/Ionicons'; // Importando ícones
import { useNavigation } from '@react-navigation/native'; // Importando useNavigation

const generateEquation = (level) => {
  const num1 = Math.floor(Math.random() * 10 * level);
  const num2 = Math.floor(Math.random() * 10 * level);
  const num3 = level > 5 ? Math.floor(Math.random() * 10 * level) : null; 
  const operators = level > 3 ? ['+', '-', '*'] : ['+', '-', '*']; 
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
  const navigation = useNavigation();
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
      setModalVisible(true);
    }
  };

  const resetGame = () => {
    setLevel(1);
    setScore(0);
    setUserAnswer('');
    setEquation(generateEquation(1));
    setModalVisible(false);
  };

  return (
    <ImageBackground 
      source={require('../images/fundo3.png')} 
      style={styles.background}
    >
      <View style={styles.outerContainer}>
        <BlurView  intensity={25} style={styles.blurContainer}>
          <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
            Jogo de Matemática
          </Animated.Text>
          <Text style={styles.subtitle}>Responda com seus conhecimentos matemáticos</Text>
          <Text style={styles.level}>Nível: {level}</Text>

          {/* Quadro para a equação */}
          <View style={styles.equationBox}>
            <Animated.Text style={[styles.equation, { opacity: fadeAnim }]}>
              {equation.equation}
            </Animated.Text>
          </View>

          <Text style={styles.text}>Faça seus calculos!</Text>

          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={userAnswer}
            onChangeText={setUserAnswer}
            placeholder="Sua resposta"
            placeholderTextColor="white"
          />

          <TouchableOpacity onPress={checkAnswer} style={styles.button}>
            <Text style={styles.buttonText}>Enviar Resposta</Text>
          </TouchableOpacity>

        </BlurView>
        
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.navigate('Catalogo')}>
          <Icon name="close" size={30} color="#BA52AD" />
        </TouchableOpacity>

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
    width: '100%', // Para garantir que o contêiner ocupe toda a largura da tela
    height: '100%', // Para garantir que o contêiner ocupe toda a altura da tela
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurContainer: {
    position: 'absolute', // Garantir que ele fique posicionado sobre todo o conteúdo
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Fundo escuro cobrindo toda a tela
  },
  title: {
    fontSize: 35,
    color: "#BA52AD",
    fontFamily: 'Font5',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: "#BA52AD",
    fontFamily: 'Font5',
    textAlign: 'center',
    marginBottom: 5,
  },
  text: {
    fontSize: 20,
    color: "#c5c5c5",
    fontFamily: 'Font4',
    textAlign: 'center',
    marginBottom: 5,
    marginTop: 30,
  },
  level: {
    fontSize: 20,
    color: '#c5c3c5',
    marginBottom: 40,
    marginTop: 10,
  },
  equationBox: {
    backgroundColor: 'black',  // Fundo do quadro
    width: 250,
    height: 80,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'black',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  equation: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#c5c5c5',
    fontFamily: 'Font4',
  },
  input: {
    height: 50,
    borderColor: 'black',
    borderWidth: 2,
    width: 200,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 24,
    backgroundColor: 'black',
    color: 'white',
    borderRadius: 15,
    fontFamily: 'Font4',
    marginTop: 15,
  },
  button: {
backgroundColor: '#BA52AD',
padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 10,
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
    color: '#c5c3c5',
    marginBottom: 20,
    fontFamily: 'PressStart2P',
  },
  resetButton: {
    backgroundColor: '#BA52AD',
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
  closeButton: {
    position: 'absolute',
    top: 70,
    right: 20,
    zIndex: 1,
  },
  modalScore: {
    fontSize: 18,
    color: '#4e5b6e',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#BA52AD',
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
