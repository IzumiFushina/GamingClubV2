import React, { useState, useEffect } from "react";
import { Text, View, Animated, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from "expo-font";
import Index from "./src/routes/Index";
import { registerRootComponent } from 'expo';

registerRootComponent(Index);

export default function App() {
  const [start, setStart] = useState(false);
  const [heightValue] = useState(new Animated.Value(1000));

  useEffect(() => {
    if (start) {
      setTimeout(() => {
        Animated.timing(heightValue, {
          toValue: 0,
          duration: 5000,
          useNativeDriver: false,
        }).start();
      }, 2000);
    }
  }, [start, heightValue]);

  const [fontsLoaded] = useFonts({
    Font1: require("./src/assets/Fonts/DMSerifDisplay-Regular.ttf"),
    Font2: require("./src/assets/Fonts/AlfaSlabOne-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      {start ? (
        <View style={{ flex: 1 }}>
          <Index />
        </View>
      ) : (
        <LinearGradient
          colors={['#121c69', '#0e1e2b']} // Degradê de roxo para preto
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Animated.View
            style={{
              width: "80%",
              height: heightValue,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Conteúdo central pode ir aqui */}
          </Animated.View>

          <TouchableOpacity 
            style={{
              position: 'absolute', // Posiciona o botão de forma absoluta
              bottom: 50, // Distância da parte inferior
              alignSelf: 'center', // Centraliza horizontalmente
              borderRadius: 25, // Para combinar com o botão arredondado
            }}
            onPress={() => setStart(true)}
          >
            <LinearGradient
              colors={['#b65fc8', '#e07bda']} // Gradiente de roxo para branco
              style={{
                paddingVertical: 15,
                paddingHorizontal: 30,
                borderRadius: 25,
                flexDirection: 'row', 
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ fontFamily: 'Font2', fontSize: 18, color: "#FFF" }}>Continue</Text>
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>
      )}
    </>
  );
}
