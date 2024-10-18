

import React, { useState } from 'react';
import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient'; 
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const { width, height } = Dimensions.get('window');

const slides = [
  { image: require('../images/avatar.png'), text: 'Bem-vindo ao Gaming Club!!' },
  { image: require('../images/Gaming Club.png'), text: 'Bem vindo ao Gaming Club!' },
  { image: require('../images/galaxy.jpg'), text: 'Comece sua jornada agora!' },
];

const OnboardingScreen = () => {
  const translateX = useSharedValue(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigation = useNavigation();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      const newSlide = currentSlide + 1;
      setCurrentSlide(newSlide);
      translateX.value = withTiming(-newSlide * width, { duration: 500 });
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      const newSlide = currentSlide - 1;
      setCurrentSlide(newSlide);
      translateX.value = withTiming(-newSlide * width, { duration: 500 });
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const handleStart = () => {
    navigation.navigate('Catalogo');
  };

  return (
    <LinearGradient
      colors={['#573299', '#121c69']}
      style={styles.container}
    >
     <Animated.View style={[styles.slidesContainer, animatedStyle]}>
  {slides.map((slide, index) => (
    <View key={index} style={styles.slide}>
      <Image source={slide.image} style={styles.image} />
      <Text style={styles.text}>{slide.text}</Text>
      {index === 1 && ( 
        <Text style={styles.welcomeText}>Descubra novos jogos do nosso app!</Text> 
      )}
    </View>
  ))}
</Animated.View>

      <View style={styles.bottomContainer}>
        {currentSlide === slides.length - 1 ? (
          <TouchableOpacity onPress={handleStart} style={styles.startButton}>
            <LinearGradient
              colors={['#000000', '#78145a']}
              style={styles.gradientButton}
            >
              <FontAwesome5 name="door-open" size={20} color="white" />
            </LinearGradient>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleNext} style={styles.navButtonRight}>
            <AntDesign name="caretright" size={30} color="black" />
          </TouchableOpacity>
        )}
                {currentSlide > 0 && (
          <TouchableOpacity onPress={handlePrevious} style={styles.navButton}>
            <AntDesign name="caretleft" size={30} color="black" />
          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slidesContainer: {
    flexDirection: 'row',
    width: width * slides.length,
    height,
    flex: 1,
  },
  slide: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
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
    color: '#ffffff',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row-reverse',
    alignItems: 'right',
    width: '80%',
    justifyContent: 'space-between',
  },
  navButton: {
    backgroundColor: '#78145a',
    padding: 10,
    borderRadius: 360,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonRight: {
    backgroundColor: '#78145a',
    padding: 10,
    borderRadius: 360,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  startButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
  },
  gradientButton: {
    borderRadius: 90,
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
    welcomeText: {
      fontSize: 18,
      color: '#fff',
      marginTop: 10,
      textAlign: 'center',
    },
    // ... seus outros estilos  
});

export default OnboardingScreen;
