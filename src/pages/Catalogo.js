import * as React from 'react';
import { Dimensions, Image, View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Icon from 'react-native-vector-icons/Ionicons';

const image1 = require('../images/anuncio1.png');
const image2 = require('../images/anuncio2.png');
const image3 = require('../images/anuncio3.png');
const gameImage1 = require('../images/minado.png'); 
const gameImage2 = require('../images/velha2.png'); 
const gameImage3 = require('../images/Xadrez.png'); 
const gameImage4 = require('../images/Memoria.png'); 
const gameImage5 = require('../images/oi.png'); 
const gameImage6 = require('../images/quiz.png'); 
const gameImage7 = require('../images/numeros.png'); 
const backgroundImage = require('../images/fundo5.png'); // Imagem de fundo

function Index({ navigation }) {
    const width = Dimensions.get('window').width;

    const images = [image1, image2, image3];
    const games = [
        { id: 1, name: 'Campo Minado', route: 'CampoMinado', image: gameImage1 },
        { id: 2, name: 'Jogo da Velha', route: 'JogodaVelha', image: gameImage2 },
        { id: 3, name: 'Xadrez', route: 'chess', image: gameImage3 },
        { id: 4, name: 'Jogo da Memória', route: 'JogoDaMemoria', image: gameImage4 },
        { id: 5, name: 'Quebra-cabeça', route: 'JogoPalavras', image: gameImage5 },
        { id: 6, name: 'Quiz', route: 'Quiz', image: gameImage6 },
        { id: 7, name: 'Jogo de Matemática', route: 'JogoMat', image: gameImage7 },
    ];

    const openGame = (route) => {
        navigation.navigate(route);
    };

    const handleSquarePress = (id) => {
        console.log(`Quadrado ${id} clicado!`);
    };

    const goToSettings = () => {
        navigation.navigate('Settings');
    };

    const goToChat = () => {
        navigation.navigate('Chat');
    };

    const goToProfile = () => {
        navigation.navigate('Profile');
    };

    return (
        <View style={styles.container}>
            <Image source={backgroundImage} style={styles.backgroundImage} />

            <ScrollView style={styles.scrollContainer}>
                <Text style={{ fontSize: 25, fontFamily: 'Font5', marginTop: "20%", marginBottom: 30, color: "#BA52AD" }}>
                    Bem vindo ao GamingClub!!
                </Text>

                <Carousel
                    loop
                    width={width}
                    height={width / 3}
                    autoPlay={true}
                    data={images}
                    scrollAnimationDuration={2000}
                    renderItem={({ index }) => (
                        <View style={styles.carouselItem}>
                            <Image
                                source={images[index]}
                                style={styles.carouselImage}
                            />
                        </View>
                    )}
                    style={{ marginVertical: 20 }} 
                />

                <Text style={{ fontSize: 20, fontFamily: 'Font5', marginTop: 15, marginBottom: 10, color: "#BA52AD" }}>Todos os jogos</Text>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
                    {games.map((game) => (
                        <View key={game.id} style={styles.gameContainer}>
                            <TouchableOpacity
                                style={styles.square}
                                onPress={() => openGame(game.route)}
                            >
                                <Image source={game.image} style={styles.squareImage} />
                            </TouchableOpacity>
                            <Text style={styles.captionText}>{game.name}</Text>
                        </View>
                    ))}
                </ScrollView>

                <Text style={{ fontSize: 15, fontFamily: 'Font5', marginTop: 20, marginBottom: 15, color: "#BA52AD" }}>Popular Games</Text>
                
                <View style={styles.squareGrid}>
                    {[...Array(4)].map((_, index) => (
                        <View key={index} style={styles.squareContainer}>
                            <TouchableOpacity
                                style={styles.clickableSquare}
                                onPress={() => handleSquarePress(index + 1)}
                            >
                                <Text style={styles.squareText}>{`Quadrado ${index + 1}`}</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity onPress={goToSettings}>
                    <Icon name="settings" size={30} color="#E07BDA" style={styles.footerIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={goToChat}>
                    <Icon name="chatbubble-ellipses" size={30} color="#E07BDA" style={styles.footerIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={goToProfile}>
                    <Icon name="person" size={30} color="#E07BDA" style={styles.footerIcon} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    scrollContainer: {
        flex: 1,
        zIndex: 1, // Para que o ScrollView fique sobre a imagem de fundo
    },
    carouselItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
    },
    carouselImage: {
        width: '90%',
        height: '100%',
        borderRadius: 20,
        resizeMode: 'cover',
    },
    square: {
        width: 90,
        height: 90,
        borderRadius: 15,
        overflow: 'hidden',
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    squareImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    captionText: {
        color: "#E07BDA",
        fontSize: 12,
        fontWeight: 'bold',
        fontFamily: 'Font5',
        textAlign: 'center',
        marginTop: 5,
    },
    gameContainer: {
        alignItems: 'center',
    },
    squareGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    squareContainer: {
        width: '45%', // Ajuste para dois quadrados por linha
        alignItems: 'center',
        marginBottom: 15, // Espaço entre linhas
    },
    clickableSquare: {
        width: '80%',
        height: 190,
        backgroundColor: '#fff',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    squareText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    footer: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    footerIcon: {
        marginHorizontal: 10,
    },
});

export default Index;
