import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';

const START_DEFAULT = { x: 0.5, y: 0 };
const END_DEFAULT = { x: 0.5, y: 1 };
const START_HORIZONTAL = { x: 0, y: 0.5 };
const END_HORIZONTAL = { x: 1, y: 0.5 };
const GRADIENT_COLORS = ["#1d335c", "#251d5c", "#16094f", "#411861", "#502569", "#502569", "#35094f"];
const GRADIENT_LOCATIONS = [0, 0.2, 0.4, 0.6, 0.8, 1, 1];
const MOVEMENT = GRADIENT_LOCATIONS[1] / 20;
const INTERVAL = 30;

let timeout = undefined;

const TestComponent = () => {
  const [gradientOptions, setGradientOptions] = React.useState({
    colors: GRADIENT_COLORS,
    locations: GRADIENT_LOCATIONS,
    start: START_DEFAULT,
    end: END_DEFAULT
  });
  const gradientOptionsRef = React.useRef(gradientOptions);
  gradientOptionsRef.current = gradientOptions;

  // Iniciar animação quando o componente for montado
  React.useEffect(() => {
    infiniteRainbow();
    return () => {
      // Limpar timeout ao desmontar
      clearTimeout(timeout);
    };
  }, []);

  const infiniteRainbow = () => {
    if (gradientOptionsRef.current.locations[1] - MOVEMENT <= 0) {
      // Mover cores e reiniciar localizações
      let gradientColors = [...gradientOptionsRef.current.colors];
      gradientColors.shift();
      gradientColors.push(gradientColors[1]);

      setGradientOptions({
        colors: gradientColors,
        locations: GRADIENT_LOCATIONS,
        start: START_DEFAULT,
        end: END_DEFAULT
      });
    } else {
      const updatedLocations = gradientOptionsRef.current.locations.map((item, index) => {
        if (index === gradientOptionsRef.current.locations.length - 1) {
          return 1;
        }

        return parseFloat(Math.max(0, item - MOVEMENT).toFixed(2));
      });

      setGradientOptions({
        colors: [...gradientOptionsRef.current.colors],
        locations: updatedLocations,
        start: START_DEFAULT,
        end: END_DEFAULT
      });
    }

    timeout = setTimeout(infiniteRainbow, INTERVAL);
  };

  return (
    <LinearGradient 
      style={styles.container}
      colors={gradientOptions.colors}
      locations={gradientOptions.locations}
      start={gradientOptions.start}
      end={gradientOptions.end}
    >
      <StatusBar style="auto" />
    </LinearGradient>
  );
};

// Não se esqueça de exportar o componente
export default TestComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
