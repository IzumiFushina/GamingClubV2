import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const palavras = ["REACT", "JAVASCRIPT", "MOBILE", "FORCA", "DESENVOLVEDOR"];

export default function JogoDaForca() {
  const [palavraSecreta, setPalavraSecreta] = useState("");
  const [letrasCorretas, setLetrasCorretas] = useState([]);
  const [letrasErradas, setLetrasErradas] = useState([]);
  const [tentativasRestantes, setTentativasRestantes] = useState(6); // Limite de 6 erros

  // Seleciona uma palavra aleatória ao iniciar o jogo
  useEffect(() => {
    iniciarJogo();
  }, []);

  const iniciarJogo = () => {
    const palavra = palavras[Math.floor(Math.random() * palavras.length)];
    setPalavraSecreta(palavra);
    setLetrasCorretas([]);
    setLetrasErradas([]);
    setTentativasRestantes(6);
  };

  const handleLetraPressionada = (letra) => {
    if (letrasCorretas.includes(letra) || letrasErradas.includes(letra)) {
      Alert.alert("Ops!", "Você já tentou essa letra.");
      return;
    }

    if (palavraSecreta.includes(letra)) {
      setLetrasCorretas([...letrasCorretas, letra]);
    } else {
      setLetrasErradas([...letrasErradas, letra]);
      setTentativasRestantes(tentativasRestantes - 1);
    }

    verificarVitoria();
  };

  const verificarVitoria = () => {
    const letrasUnicas = [...new Set(palavraSecreta)];
    if (letrasCorretas.length === letrasUnicas.length) {
      Alert.alert("Parabéns!", "Você venceu!");
      iniciarJogo();
    } else if (tentativasRestantes === 1) {
      Alert.alert("Game Over", `A palavra era: ${palavraSecreta}`);
      iniciarJogo();
    }
  };

  const renderizarPalavra = () => {
    return palavraSecreta.split("").map((letra, index) => (
      <Text key={index} style={styles.letra}>
        {letrasCorretas.includes(letra) ? letra : "_"}
      </Text>
    ));
  };

  const renderizarTeclado = () => {
    const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    return alfabeto.map((letra) => (
      <TouchableOpacity
        key={letra}
        onPress={() => handleLetraPressionada(letra)}
        style={[
          styles.botaoLetra,
          letrasCorretas.includes(letra) || letrasErradas.includes(letra)
            ? styles.botaoLetraDesativado
            : null,
        ]}
        disabled={letrasCorretas.includes(letra) || letrasErradas.includes(letra)}
      >
        <Text style={styles.textoLetra}>{letra}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Jogo da Forca</Text>
      <Text style={styles.textoTentativas}>Tentativas restantes: {tentativasRestantes}</Text>
      <View style={styles.palavraContainer}>{renderizarPalavra()}</View>
      <View style={styles.tecladoContainer}>{renderizarTeclado()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  titulo: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#BA52AD",
  },
  textoTentativas: {
    fontSize: 18,
    marginBottom: 10,
    color: "#333",
  },
  palavraContainer: {
    flexDirection: "row",
    marginVertical: 20,
  },
  letra: {
    fontSize: 28,
    marginHorizontal: 5,
    color: "#333",
  },
  tecladoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  botaoLetra: {
    width: 40,
    height: 40,
    margin: 5,
    backgroundColor: "#BA52AD",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  botaoLetraDesativado: {
    backgroundColor: "#D3D3D3",
  },
  textoLetra: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});



