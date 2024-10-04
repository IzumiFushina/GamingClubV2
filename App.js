import React, { useState, useEffect } from "react";
import { Text, View, Animated, TouchableOpacity, ImageBackground } from "react-native";
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
        <ImageBackground
          source={require("./src/images/foto2.png")}
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          imageStyle={{ resizeMode: 'cover' }}
        >
          <Animated.View
            style={{
              width: "80%",
              height: heightValue,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity 
              style={{
                backgroundColor: "purple",
                paddingVertical: 15,
                paddingHorizontal: 30,
                borderRadius: 25,
                flexDirection: 'row', 
                alignItems: 'center',
                justifyContent: 'center', 
                marginTop: '10%',
              }}
              onPress={() => setStart(true)}
            >
              <Text style={{ fontFamily: 'Font2', fontSize: 18, color: "#FFF" }}>Get Started</Text>
            </TouchableOpacity>
          </Animated.View>
        </ImageBackground>
      )}
    </>
  );
}
