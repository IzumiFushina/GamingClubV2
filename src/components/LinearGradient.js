import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';
import { Canvas, LinearGradient, Skia, useValue, useCode, runTiming, Easing } from '@shopify/react-native-skia';

const { width, height } = Dimensions.get('window');

const GradientOscillator = () => {
  // Valores que vão animar as cores
  const color1 = useValue(0);
  const color2 = useValue(1);
  
  useEffect(() => {
    // Função para animar as cores
    const animateColors = () => {
      runTiming(color1, color1.current === 0 ? 1 : 0, {
        duration: 3000,
        easing: Easing.linear,
      });
      runTiming(color2, color2.current === 1 ? 0 : 1, {
        duration: 3000,
        easing: Easing.linear,
      });
    };

    // Inicia a animação a cada 3 segundos
    const interval = setInterval(animateColors, 3000);
    
    // Limpa o intervalo ao desmontar o componente
    return () => clearInterval(interval);
  }, [color1, color2]);

  return (
    <Canvas style={{ width, height }}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={[
          Skia.Color(`rgba(255, 0, 0, ${color1})`), // Vermelho
          Skia.Color(`rgba(0, 0, 255, ${color2})`), // Azul
        ]}
        style={{ flex: 1 }}
      />
    </Canvas>
  );
};

export default GradientOscillator;
