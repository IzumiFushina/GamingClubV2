import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Alert, Text, TextInput, TouchableOpacity, Animated, ImageBackground } from 'react-native';
import { BlurView } from 'expo-blur'; // Importando BlurView
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient'; 
import AntDesign from '@expo/vector-icons/AntDesign';
import { auth } from '../config/firebaseConfig'; // Certifique-se de importar o auth corretamente
import { signInWithEmailAndPassword } from 'firebase/auth'; // Importa a função de login


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
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      Alert.alert('Login realizado', `Bem-vindo ${user.email}!`);
    } catch (error) {
      Alert.alert('Erro', error.message);
    };
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
                onChangeText={setEmail} // Atualiza o estado do email
              />
            </View>

            <View style={[styles.inputContainer, { marginBottom: 30 }]}>
              <TextInput
                style={styles.InputName}
                placeholder="Password"
                placeholderTextColor="white"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword} // Atualiza o estado da senha
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
    alignItems: 'center',
    justifyContent: 'center',
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
    borderBottomColor: 'white',
    marginBottom: 15,
  },
  InputName: {
    width: 290,
    height: 40,
    color: 'white',
    paddingHorizontal: 5,
    borderWidth: 0.5,
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
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  cdsButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  viewCds: {
    height: '80%',
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: 'white',
    borderRadius: 45,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  titleText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 20,
  },
  subtitleText: {
    color: 'white',
    fontSize: 14,
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginBottom: 20,
  },
  forgetPasswordText: {
    color: 'white',
    marginTop: 10,
    textDecorationLine: 'underline',
    alignSelf: 'center',
  },
  signUpText: {
    color: 'white',
    alignSelf: 'center',
    marginTop: '100%',
    position: 'absolute',
  },  
});
