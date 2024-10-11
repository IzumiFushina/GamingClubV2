import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Alert, Text, TextInput, TouchableOpacity, Animated, ImageBackground } from 'react-native';
import { BlurView } from 'expo-blur'; // Importando BlurView
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient'; 
import AntDesign from '@expo/vector-icons/AntDesign';
import firebase from '../config/firebaseConfig'; // Ajuste o caminho conforme necessário
import { auth } from '../config/firebaseConfig'; // Ajuste o caminho conforme necessário

const signIn = async () => {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    // Lógica após login
  } catch (error) {
    console.error(error);
    Alert.alert('Erro', error.message);
  }
};



export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const translateY = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'Precisamos de permissão para acessar a galeria de fotos!');
      }
    })();
  }, []);

  const signIn = async () => {
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      // Lógica após login
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', error.message); // Adiciona um alerta para mostrar o erro
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('../images/fundoagain.png')} 
        style={styles.background} 
      >
        <BlurView intensity={50} style={styles.viewCds}>
          <TouchableOpacity style={styles.closeIcon} />

          <Text style={styles.titleText}>Login</Text>
          <Text style={styles.subtitleText}>Welcome back, please login to your account</Text>

          <Animated.View style={{ transform: [{ translateY }] }}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.InputName}
                placeholder="User name"
                placeholderTextColor="white"
                value={email}
                onChangeText={setEmail} // Atualiza o estado
              />
            </View>

            <View style={[styles.inputContainer, { marginBottom: 30 }]}>
              <TextInput
                style={styles.InputName}
                placeholder="Password"
                placeholderTextColor="white"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword} // Atualiza o estado
              />
            </View>

            <LinearGradient colors={['#2C2081', '#573299']} style={styles.BtnCadastro}>
              <TouchableOpacity onPress={signIn}>
                <Text style={styles.cdsButtonText}>Login</Text>
              </TouchableOpacity>
            </LinearGradient>
            <Text style={styles.forgetPasswordText}>Forgot password?</Text>
            <Text style={styles.signUpText}>Don't have an account? Sign up</Text>
          </Animated.View>
        </BlurView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: 'white',
    padding: 0,
    margin: 0,
    alignItems: 'center', // Centraliza o conteúdo horizontalmente
    justifyContent: 'center', // Centraliza o conteúdo verticalmente
  },
  closeIcon: {
    position: 'absolute',
    top: "1%",
    right: "5%",
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'white', // Borda branca nos inputs
    marginBottom: 15, // Reduzindo a margem inferior para os inputs
  },
  InputName: {
    width: 290,
    height: 40,
    color: 'white', // Texto branco nos inputs
    paddingHorizontal: 5,
    borderWidth: 0.5, // Borda branca nos inputs
    borderColor: 'white',
    borderRadius: 5,
  },
  BtnCadastro: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    width: 300,
    marginTop: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3, // Aumentando a sombra
    shadowRadius: 5, // Aumentando o raio da sombra
    elevation: 8, // Aumentando a elevação
  },
  cdsButtonText: {
    color: 'white', // Texto branco no botão
    fontSize: 15,
    fontWeight: 'bold',
  },
  viewCds: {
    height: '80%', // Aumentado o tamanho do card
    width: '80%', // Aumentando a largura do card
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Efeito de transparência no card
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5, // Borda branca mais fina
    borderColor: 'white', // Borda branca no card
    borderRadius: 45,
    overflow: 'hidden',
    shadowColor: "#000", // Sombra para profundidade
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3, // Sombra mais visível
    shadowRadius: 5, // Aumentando o raio da sombra
    elevation: 8, // Elevação para dar profundidade
  },
  titleText: {
    color: 'white', // Cor do texto branco
    fontSize: 24, // Tamanho da fonte do título
    fontWeight: 'bold', // Negrito para o título
    alignSelf: 'flex-start', // Alinha o texto à esquerda
    marginLeft: 20, // Margem para distanciar da borda esquerda
    marginTop: 20, // Margem superior para distanciar do topo
  },
  subtitleText: {
    color: 'white', // Texto branco
    fontSize: 14, // Tamanho do texto do subtítulo
    alignSelf: 'flex-start', // Alinha à esquerda
    marginLeft: 20, // Margem esquerda para alinhar com o título
    marginBottom: 20, // Margem inferior para dar espaço ao conteúdo
  },
  forgetPasswordText: {
    color: 'white', // Texto em branco para manter a consistência
    marginTop: 10, // Ajuste a margem superior para mais espaço se necessário
    textDecorationLine: 'underline', // Adiciona um efeito de sublinhado
    alignSelf: 'center',
   // Centraliza horizontalmente o texto
  },
  signUpText: {
    color: 'white', // Texto em branco para manter a consistência
    alignSelf: 'center', // Centraliza horizontalmente o texto
    marginTop: '100%',
    position: 'absolute',
  },  
});
