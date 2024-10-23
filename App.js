import React from "react";
import { useFonts } from "expo-font";
import Index from "./src/routes/Index";
import { registerRootComponent } from 'expo';

registerRootComponent(Index);

export default function App() {
  const [fontsLoaded] = useFonts({
    Font1: require("./src/assets/Fonts/DMSerifDisplay-Regular.ttf"),
    Font2: require("./src/assets/Fonts/AlfaSlabOne-Regular.ttf"),
    Font3: require("./src/assets/Fonts/PressStart2P-Regular.ttf"),
    Font4: require("./src/assets/Fonts/GlacialIndifference-Regular.otf"),
  });

  if (!fontsLoaded) {
    return null; // Exibe nada até que as fontes estejam carregadas
  }

  return <Index />;
}
