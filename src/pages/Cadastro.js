import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Alert, Text, TextInput, TouchableOpacity, Animated, Image, ImageBackground } from 'react-native';
import { BlurView } from 'expo-blur';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';

export default function Cadastro() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState(null); // Estado para o avatar
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

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        setAvatar(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Erro', 'Houve um problema ao tentar acessar a galeria.');
    }
  };

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: username });
      Alert.alert('Sucesso', 'Conta criada com sucesso!');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('../images/BackgroundQuebraCabeça.png')} 
        style={styles.background} 
      >
        <BlurView intensity={50} style={styles.viewCds}>
          <TouchableOpacity style={styles.closeIcon} />

          <Text style={styles.titleText}>Cadastro</Text>

          <Animated.View style={{ transform: [{ translateY }] }}>
            <TouchableOpacity onPress={pickImage}>
              <Image 
                source={avatar ? { uri: avatar } : require('../images/AAAAA.png')}
                style={styles.avatar} 
              />
            </TouchableOpacity>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.InputName}
                placeholder="Username"
                placeholderTextColor="white"
                value={username}
                onChangeText={setUsername}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.InputMail}
                placeholder="E-mail"
                placeholderTextColor="white"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={[styles.inputContainer, { marginBottom: 30 }]}>
              <TextInput
                style={styles.InputName}
                placeholder="Password"
                placeholderTextColor="white"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <LinearGradient
              colors={['#573299', '#8547B0']}
              style={styles.BtnCadastro}
            >
              <TouchableOpacity onPress={handleSignUp}>
                <Text style={styles.cdsButtonText}>Cadastrar</Text>
              </TouchableOpacity>
            </LinearGradient>
          </Animated.View>
        </BlurView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'white',
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
  InputMail: {
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
    height: 40,
    width: 150,
    marginTop: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
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
    shadowOffset: { width: 0, height: 4 },
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
    marginBottom: 20,
  },
});
