import React, { useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, Animated } from 'react-native';
import PagerView from 'react-native-pager-view';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';

const image = require('../images/OnBoardingGif.gif');

export default function MyPager() {
  const navigation = useNavigation();
  const fadeAnim1 = useRef(new Animated.Value(0)).current;
  const fadeAnim2 = useRef(new Animated.Value(0)).current;
  const fadeAnim3 = useRef(new Animated.Value(0)).current;
  const fadeAnim4 = useRef(new Animated.Value(0)).current;
  const fadeAnim5 = useRef(new Animated.Value(0)).current;

  const handleStart = () => {
    navigation.navigate('Catalogo');
  };

  const fadeIn = (animatedValue) => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const onPageSelected = (e) => {
    const index = e.nativeEvent.position;
    if (index === 0) {
      fadeIn(fadeAnim1);
    } else if (index === 1) {
      fadeIn(fadeAnim2);
    } else if (index === 2) {
      fadeIn(fadeAnim3);
    } else if (index === 3) {
      fadeIn(fadeAnim4);
    } else if (index === 4) {
      fadeIn(fadeAnim5);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.imageBackground}>
        <PagerView style={styles.container} initialPage={0} onPageSelected={onPageSelected}>
          <View style={styles.page} key="1">
            <Animated.Text style={[styles.title, { opacity: fadeAnim1 }]}>
              Gaming Club
            </Animated.Text>
            <Text style={{ color: "white", fontSize: 20, fontFamily: "Font4", margin: 10, color: "#d99bdd" }}>
              Deslize
            </Text>
            <MaterialIcons name="swipe-left" size={24} color="white" />
          </View>
          <View style={styles.page} key="2">
            <Animated.Text style={[styles.title, { opacity: fadeAnim2 }]}>
              Explore novos universos
            </Animated.Text>
          </View>
          <View style={styles.page} key="3">
            <Animated.Text style={[styles.title, { opacity: fadeAnim3 }]}>
              Se divirta com os jogos
            </Animated.Text>
          </View>
          <View style={styles.page} key="4">
            <Animated.Text style={[styles.title, { opacity: fadeAnim4 }]}>
              Converse com amigos
            </Animated.Text>
          </View>
          <View style={styles.page} key="5">
            <Animated.Text style={[styles.title, { opacity: fadeAnim5 }]}>
              Comece já!
            </Animated.Text>
            <TouchableOpacity onPress={handleStart} style={styles.button}>
              <LinearGradient colors={['#9021bf', '#401652', '#9021bf']} style={styles.gradientButton}>
              <Entypo name="star-outlined" size={30} color="white" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </PagerView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
  },
  page: {
    flex: 1, // Adicionando flex: 1 para ocupar todo o espaço
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
  },
  title: {
    color: "white",
    fontSize: 35,
    fontFamily: "Font4",
    margin: 15,
    color: "#d99bdd",
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientButton: {
  borderRadius: 90,
  padding: 10,
  },
});
