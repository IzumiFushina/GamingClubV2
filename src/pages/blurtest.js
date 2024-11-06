import React, { Component } from "react";
import { View, Image, Text, StyleSheet } from "react-native";

export default function BLurTest() {
  return (
    <View style={styles.container}>

      <View style={styles.rodape}>

      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "black",
    flex: 1,
  },

  rodape: {
backgroundColor: "white",
width: "85%",
height: "7%",
borderRadius: 90,
  },
});

// import React from 'react';
// import { Dimensions, Image, View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
// import Carousel from 'react-native-reanimated-carousel';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { BlurView } from 'expo-blur';
// import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';

// const image1 = require('../images/anuncio1.png');
// const image2 = require('../images/anuncio2.png');
// const image3 = require('../images/anuncio3.png');
// const gameImage1 = require('../images/minado.png'); 
// const gameImage2 = require('../images/velha2.png'); 
// const gameImage3 = require('../images/Xadrez.png'); 
// const gameImage4 = require('../images/Memoria.png'); 
// const gameImage5 = require('../images/oi.png'); 
// const adivinheJogo = require('../images/adivinheJogo.png'); 
// const gameImage6 = require('../images/quiz.png'); 
// const gameImage7 = require('../images/numeros.png'); 
// const backgroundImage = require('../images/fundo5.png'); // Imagem de fundo

// function Index({ navigation }) {
//     const width = Dimensions.get('window').width;
//     const footerOpacity = useSharedValue(0);

//     React.useEffect(() => {
//         footerOpacity.value = withTiming(1, { duration: 1000 });
//     }, []);

//     const animatedFooterStyle = useAnimatedStyle(() => ({
//         opacity: footerOpacity.value,
//     }));

//     const handlePressIn = (iconScale) => {
//         iconScale.value = withSpring(0.8);
//     };

//     const handlePressOut = (iconScale) => {
//         iconScale.value = withSpring(1);
//     };

//     const images = [image1, image2, image3];
//     const games = [
//         { id: 1, name: 'Campo Minado', route: 'CampoMinado', image: gameImage1 },
//         { id: 2, name: 'Jogo da Velha', route: 'JogodaVelha', image: gameImage2 },
//         { id: 3, name: 'Xadrez', route: 'chess', image: gameImage3 },
//         { id: 4, name: 'Jogo da Memória', route: 'JogoDaMemoria', image: gameImage4 },
//         { id: 5, name: 'Jogo das Palavras', route: 'JogoPalavras', image: adivinheJogo },
//         { id: 6, name: 'Quebra-cabeça', route: 'QuebraCabeca', image: gameImage5 },
//         { id: 7, name: 'Quiz', route: 'Quiz', image: gameImage6 },
//         { id: 8, name: 'Jogo de Matemática', route: 'JogoMat', image: gameImage7 },
//     ];

//     const openGame = (route) => {
//         navigation.navigate(route);
//     };

//     const handleSquarePress = (id) => {
//         console.log(`Quadrado ${id} clicado!`);
//     };

//     return (
//         <View style={styles.container}>
//             <Image source={backgroundImage} style={styles.backgroundImage} />
            
//             <BlurView
//                 style={styles.absolute}
//                 blurType="dark"
//                 blurAmount={10}
//                 reducedTransparencyFallbackColor="rgba(0, 0, 0, 0.7)"
//             />

//             <ScrollView style={styles.scrollContainer}>
//                 <Text style={styles.welcomeText}>
//                     Bem vindo ao GamingClub!!
//                 </Text>

//                 <Carousel
//                     loop
//                     width={width}
//                     height={width / 3}
//                     autoPlay={true}
//                     data={images}
//                     scrollAnimationDuration={2000}
//                     renderItem={({ index }) => (
//                         <View style={styles.carouselItem}>
//                             <Image
//                                 source={images[index]}
//                                 style={styles.carouselImage}
//                             />
//                         </View>
//                     )}
//                     style={{ marginVertical: 20 }} 
//                 />

//                 <Text style={styles.allGamesText}>Todos os jogos</Text>

//                 <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
//                     {games.map((game) => (
//                         <View key={game.id} style={styles.gameContainer}>
//                             <TouchableOpacity
//                                 style={styles.square}
//                                 onPress={() => openGame(game.route)}
//                             >
//                                 <Image source={game.image} style={styles.squareImage} />
//                             </TouchableOpacity>
//                             <Text style={styles.captionText}>{game.name}</Text>
//                         </View>
//                     ))}
//                 </ScrollView>

//                 <Text style={styles.popularGamesText}>Popular Games</Text>
                
//                 <View style={styles.squareGrid}>
//                     {[...Array(4)].map((_, index) => (
//                         <View key={index} style={styles.squareContainer}>
//                             <TouchableOpacity
//                                 style={styles.clickableSquare}
//                                 onPress={() => handleSquarePress(index + 1)}
//                             >
//                                 <Text style={styles.squareText}>{`Quadrado ${index + 1}`}</Text>
//                             </TouchableOpacity>
//                         </View>
//                     ))}
//                 </View>
//             </ScrollView>

//             <Animated.View style={[styles.footer, animatedFooterStyle]}>
//                 {['home', 'chatbubbles', 'person'].map((icon, index) => {
//                     const iconScale = useSharedValue(1);
//                     const animatedIconStyle = useAnimatedStyle(() => ({
//                         transform: [{ scale: iconScale.value }],
//                     }));

//                     const navigationRoutes = ['Home', 'Chat', 'Profile'];

//                     return (
//                         <TouchableOpacity
//                             key={index}
//                             onPress={() => navigation.navigate(navigationRoutes[index])}
//                             onPressIn={() => handlePressIn(iconScale)}
//                             onPressOut={() => handlePressOut(iconScale)}
//                         >
//                             <Animated.View style={animatedIconStyle}>
//                                 <Icon name={icon} size={30} color="#E07BDA" />
//                             </Animated.View>
//                         </TouchableOpacity>
//                     );
//                 })}
//             </Animated.View>

//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     backgroundImage: {
//         position: 'absolute',
//         width: '100%',
//         height: '100%',
//         resizeMode: 'cover',
//     },
//     absolute: {
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         backgroundColor: 'rgba(0, 0, 0, 0.2)',
//         borderRadius: 15,
//     },
//     scrollContainer: {
//         flex: 1,
//         zIndex: 1,
//     },
//     welcomeText: {
//         fontSize: 25,
//         fontFamily: 'Font5',
//         marginTop: "20%",
//         marginBottom: 20,
//         color: "#8547B0", // Cor rosa vibrante
//         marginLeft: 15,
//         textShadowColor: '#8547B0', // Sombra rosa
//         textShadowOffset: { width: 0, height: 0 },
//         textShadowRadius: 5,
//     },

//     carouselItem: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 15,
//     },
//     carouselImage: {
//         width: '90%',
//         height: '100%',
//         borderRadius: 20,
//         resizeMode: 'cover',
//     },
//     allGamesText: {
//         fontSize: 20,
//         fontFamily: 'Font5',
//         marginTop: 15,
//         marginBottom: 10,
//         color: "#FF2D91", // Cor rosa vibrante
//         marginLeft: 15,
//         textShadowColor: '#FF2D91', // Sombra rosa
//         textShadowOffset: { width: 0, height: 0 },
//         textShadowRadius: 5,
//     },
//     square: {
//         width: 100,
//         height: 100,
//         borderRadius: 15,
//         overflow: 'hidden',
//         marginHorizontal: 10,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     squareImage: {
//         width: '100%',
//         height: '100%',
//         resizeMode: 'cover',
//     },
//     captionText: {
//         color: "#E07BDA",
//         fontSize: 12,
//         fontWeight: 'bold',
//         fontFamily: 'Font5',
//         textAlign: 'center',
//         marginTop: 5,
//     },
//     gameContainer: {
//         alignItems: 'center',
//     },
//     popularGamesText: {
//         fontSize: 15,
//         fontFamily: 'Font5',
//         marginTop: 20,
//         marginBottom: 15,
//         color: "#FF2D91", // Cor rosa vibrante
//         marginLeft: 15,
//         textShadowColor: '#FF2D91', // Sombra rosa
//         textShadowOffset: { width: 0, height: 0 },
//         textShadowRadius: 5,
//     },
//     squareGrid: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         justifyContent: 'space-between',
//     },
//     squareContainer: {
//         width: '45%',
//         alignItems: 'center',
//         marginBottom: 15,
//     },
//     clickableSquare: {
//         width: '80%',
//         height: 190,
//         backgroundColor: '#fff',
//         borderRadius: 20,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     squareText: {
//         fontSize: 18,
//         color: '#BA52AD',
//         fontFamily: 'Font5',
//     },
//     footer: {
//         position: 'absolute',
//         bottom: 20,
//         left: 20,
//         right: 20,
//         height: 65,
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         alignItems: 'center',
//         backgroundColor: 'black',
//         borderRadius: 15,
//         zIndex: 10, // Eleva o footer acima dos quadros
//         paddingHorizontal: 10,
//         elevation: 5, // Sombra do rodapé
//     },
// });

// export default Index;
