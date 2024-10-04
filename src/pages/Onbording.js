import React from 'react';
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

const slides = [
  { image: require('../images/avatar.png'), text: 'Bem-vindo ao App!' },
  { image: require('../images/fundo.png'), text: 'Descubra novas funcionalidades!' },
  { image: require('../images/galaxy.jpg'), text: 'Comece sua jornada agora!' },
];

const OnboardingScreen = () => {
  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withSpring(translateX.value) }],
  }));

  const handleGesture = (event) => {
    translateX.value = -event.translationX;
  };

  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
      <Animated.View style={[styles.container, animatedStyle]}>
        {slides.map((slide, index) => (
          <View key={index} style={[styles.slide, { backgroundColor: index % 2 === 0 ? '#f1f1f1' : '#fff' }]}>
            <Image source={slide.image} style={styles.image} />
            <Text style={styles.text}>{slide.text}</Text>
          </View>
        ))}
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: width * slides.length,
  },
  slide: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '80%',
    height: '50%',
    resizeMode: 'contain',
  },
  text: {
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center',
  },
});

export default OnboardingScreen;
