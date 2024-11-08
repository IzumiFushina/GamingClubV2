import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ImageBackground, Modal, Image } from 'react-native';
import * as Progress from 'react-native-progress'; // Importa a biblioteca de progresso
import { BlurView } from 'expo-blur';
import Icon from 'react-native-vector-icons/Ionicons'; // Importando ícones
import { useNavigation } from '@react-navigation/native'; // Importando useNavigation 


export default function App() {
  const navigation = useNavigation(); // Usando useNavigation para acessar a navegação

  const niveis = [
    {
      nivel: 1,
      perguntas: [
        {
          pergunta: 'Qual é a capital do Brasil?',
          respostas: ['Rio de Janeiro', 'Brasília', 'São Paulo', 'Salvador'],
          respostaCorreta: 'Brasília',
        },
        {
          pergunta: 'Qual é o maior planeta do sistema solar?',
          respostas: ['Terra', 'Marte', 'Júpiter', 'Saturno'],
          respostaCorreta: 'Júpiter',
        },
        {
          pergunta: 'Quem pintou a Mona Lisa?',
          respostas: ['Vincent van Gogh', 'Leonardo da Vinci', 'Pablo Picasso', 'Claude Monet'],
          respostaCorreta: 'Leonardo da Vinci',
        },
        {
          pergunta: 'Qual é o continente mais populoso?',
          respostas: ['África', 'Ásia', 'Europa', 'América'],
          respostaCorreta: 'Ásia',
        },
        {
          pergunta: 'Quantos estados tem o Brasil?',
          respostas: ['25', '26', '27', '30'],
          respostaCorreta: '26',
        },
      ],
    },
    {
      nivel: 2,
      perguntas: [
        {
          pergunta: 'O que é a unidade "Newton" usada para medir?',
          respostas: ['Massa', 'Força', 'Energia', 'Tempo'],
          respostaCorreta: 'Força',
        },
        {
          pergunta: 'Qual planeta é conhecido como o “Planeta Vermelho”?',
          respostas: ['Júpiter', 'Marte', 'Terra', 'Saturno'],
          respostaCorreta: 'Marte',
        },
        {
          pergunta: 'Qual fenômeno natural é medido pela escala Richter?',
          respostas: ['Tsunamis', 'Tornados', 'Terremotos', 'Furacões'],
          respostaCorreta: 'Terremotos',
        },
        {
          pergunta: 'Qual é a fórmula química da água?',
          respostas: ['H2O', 'CO2', 'O2', 'NaCl'],
          respostaCorreta: 'H2O',
        },
        {
          pergunta: 'Qual é a capital da França?',
          respostas: ['Paris', 'Londres', 'Berlim', 'Madrid'],
          respostaCorreta: 'Paris',
        },
      ],
    },
    {
      nivel: 3,
      perguntas: [
        {
          pergunta: 'Qual evento marcou o início da Segunda Guerra Mundial?',
          respostas: ['A invasão da Polônia pela Alemanha', 'O ataque a Pearl Harbor', 'O Tratado de Versalhes', 'A Revolução Russa'],
          respostaCorreta: 'A invasão da Polônia pela Alemanha',
        },
        {
          pergunta: 'Quem foi o primeiro imperador do Império Romano?',
          respostas: ['Júlio César', 'Augusto', 'Calígula', 'Nero'],
          respostaCorreta: 'Augusto',
        },
        {
          pergunta: 'Se A é maior que B e B é maior que C, qual das seguintes afirmações é verdadeira?',
          respostas: ['A é maior que C.', 'C é maior que A.', 'B é menor que A.', 'A é igual a C.'],
          respostaCorreta: 'A é maior que C.',
        },
        {
          pergunta: 'Qual é a capital do Japão?',
          respostas: ['Tóquio', 'Pequim', 'Seul', 'Bangkok'],
          respostaCorreta: 'Tóquio',
        },
        {
          pergunta: 'Qual foi o ano em que o homem pisou na Lua?',
          respostas: ['1969', '1972', '1980', '1990'],
          respostaCorreta: '1969',
        },
      ],
    },
    {
      nivel: 4,
      perguntas: [
        {
          pergunta: 'Qual é a principal função dos ribossomos nas células?',
          respostas: ['Produzir ATP.', 'Sintetizar proteínas.', 'Decompor lipídios.', 'Armazenar material genético.'],
          respostaCorreta: 'Sintetizar proteínas.',
        },
        {
          pergunta: 'Quem é considerado o pai da filosofia ocidental?',
          respostas: ['Platão', 'Aristóteles', 'Sócrates', 'Descartes'],
          respostaCorreta: 'Sócrates',
        },
        {
          pergunta: 'Qual foi a principal consequência da Revolução Industrial no século XIX?',
          respostas: ['Aumento da agricultura.', 'Desenvolvimento do capitalismo e urbanização.', 'Declínio da ciência.', 'Redução das trocas comerciais.'],
          respostaCorreta: 'Desenvolvimento do capitalismo e urbanização.',
        },
        {
          pergunta: 'Qual é a fórmula da energia cinética?',
          respostas: ['E = mc²', 'E = 1/2 mv²', 'E = Fd', 'E = mgh'],
          respostaCorreta: 'E = 1/2 mv²',
        },
        {
          pergunta: 'Qual é o elemento químico com símbolo "Fe"?',
          respostas: ['Ferro', 'Flúor', 'Fósforo', 'Prata'],
          respostaCorreta: 'Ferro',
        },
      ],
    },
    // Adicione mais níveis se desejar...
  ];

  
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [nivelAtual, setNivelAtual] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [pontuacao, setPontuacao] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const handleAnswer = (resposta) => {
    setRespostaSelecionada(resposta);
    const perguntaAtual = niveis[nivelAtual].perguntas[indiceAtual];

    if (resposta === perguntaAtual.respostaCorreta) {
      setPontuacao(pontuacao + 1);
    } else {
      Alert.alert('Resposta Incorreta', `A resposta correta era: ${perguntaAtual.respostaCorreta}`);
    }
  };

  const proximaPergunta = () => {
    setRespostaSelecionada(null);
    if (indiceAtual < niveis[nivelAtual].perguntas.length - 1) {
      setIndiceAtual(indiceAtual + 1);
    } else if (nivelAtual < niveis.length - 1) {
      setIndiceAtual(0);
      setNivelAtual(nivelAtual + 1);
    } else {
      setModalVisible(true);
    }
  };

  const progresso = (indiceAtual + 1) / niveis[nivelAtual].perguntas.length;

  const resetGame = () => {
    setIndiceAtual(0);
    setNivelAtual(0);
    setPontuacao(0);
    setModalVisible(false);
  };

  return (
    <ImageBackground
      source={require('../images/fundo1.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <BlurView intensity={10} style={styles.blurContainer}>
        <View style={styles.container}>
        <Text style={styles.title}>Quiz</Text>
        <Text style={styles.subtitle}>Responda se souber!</Text>
          <View style={styles.banner}>
            <Text style={styles.bannerText}>Nível {nivelAtual + 1}</Text>
          </View>

          <Progress.Bar
            progress={progresso}
            width={300}
            color="#903799"
            style={styles.progressBar}
          />

          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>
              {niveis[nivelAtual].perguntas[indiceAtual].pergunta}
            </Text>
          </View>

          <View style={styles.answersContainer}>
            {niveis[nivelAtual].perguntas[indiceAtual].respostas.map((resposta, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.answerButton,
                  respostaSelecionada === resposta && {
                    backgroundColor: resposta === niveis[nivelAtual].perguntas[indiceAtual].respostaCorreta ? '#4CAF50' : '#F44336',
                  },
                ]}
                onPress={() => handleAnswer(resposta)}
                disabled={respostaSelecionada !== null}
              >
                <Text style={styles.answerText}>{resposta}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {respostaSelecionada && (
            <TouchableOpacity style={styles.nextButton} onPress={proximaPergunta}>
              <Text style={styles.nextButtonText}>Próxima Pergunta</Text>
            </TouchableOpacity>
          )}

          <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={resetGame}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Image
                  source={require("../images/medalha.png")}
                  style={styles.medalImage}
                />
                <Text style={styles.modalText}>Parabéns!</Text>
                <Text style={styles.modalScore}>Você acertou {pontuacao} perguntas!</Text>
                <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
                  <Text style={styles.resetButtonText}>Reiniciar Jogo</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </BlurView>
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.navigate('Catalogo')}>
          <Icon name="close" size={30} color="#BA52AD" />
        </TouchableOpacity>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Fundo escuro cobrindo toda a tela
  },
  title: {
    fontSize: 40,
    marginBottom: 20,
    color: "#d99bdd",
    fontFamily: 'Font5',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
    color: "#d99bdd",
    fontFamily: 'Font5',
    textAlign: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  banner: {
    backgroundColor: '#903799',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  bannerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  progressBar: {
    marginBottom: 20,
  },
  questionContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  questionText: {
    fontSize: 28,
    color: '#333',
    fontWeight: 'bold',
  },
  answersContainer: {
    width: '100%',
    alignItems: 'center',
  },
  answerButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginVertical: 8,
    width: '90%',
    borderRadius: 12,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  answerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  nextButton: {    backgroundColor: '#903799',
    padding: 15,
    marginTop: 20,
    borderRadius: 12,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalScore: {
    fontSize: 20,
    color: '#333',
    marginBottom: 20,
  },
  medalImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  resetButton: {
    backgroundColor: '#903799',
    padding: 15,
    borderRadius: 12,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
