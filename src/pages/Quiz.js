import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as Progress from 'react-native-progress'; // Importa a biblioteca de progresso

export default function App() {
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
        
      ],
    },
    // Níveis seguintes...
  ];

  const [indiceAtual, setIndiceAtual] = useState(0);
  const [nivelAtual, setNivelAtual] = useState(0); // Controla o nível
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [pontuacao, setPontuacao] = useState(0);

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
      alert(`Quiz finalizado! Você acertou ${pontuacao} perguntas.`);
      setIndiceAtual(0);
      setNivelAtual(0);
      setPontuacao(0);
    }
  };

  const progresso = (indiceAtual + 1) / niveis[nivelAtual].perguntas.length; // Progresso da barra

  return (
    <View style={styles.container}>
      {/* Banner do topo */}
      <View style={styles.banner}>
        <Text style={styles.bannerText}>Nível {nivelAtual + 1}</Text>
      </View>

      {/* Barra de Progresso */}
      <Progress.Bar 
        progress={progresso} 
        width={300} 
        color="#4fa3e3" 
        style={styles.progressBar}
      />

      {/* Pergunta */}
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>
          {niveis[nivelAtual].perguntas[indiceAtual].pergunta}
        </Text>
      </View>

      {/* Respostas */}
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

      {/* Botão Próxima */}
      {respostaSelecionada && (
        <TouchableOpacity style={styles.nextButton} onPress={proximaPergunta}>
          <Text style={styles.nextButtonText}>Próxima Pergunta</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  banner: {
    backgroundColor: '#4fa3e3',
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  answerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  nextButton: {
    backgroundColor: '#4fa3e3',
    padding: 15,
    marginTop: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});